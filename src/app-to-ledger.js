import 'core-js/actual';
import { listen } from "@ledgerhq/logs";
import { Kaspa, TransactionInput, TransactionOutput, Transaction } from "hw-app-kaspa";
import axios from "axios";
import { PublicKey, Address, Script } from "@kaspa/core-lib";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import HttpTransport from "@ledgerhq/hw-transport-http";

const isLocal = () => {
    return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
};

const transportProps = {
    transport: null,
    logListener: null
}


/**
 * Initializes the transport to use with Kaspa if it doesn't exist yet.
 * Returns it otherwise.
 * 
 * @returns {TransportWebHID}
 */
export const getTransport = async (emulator=True) => {
        if (emulator) {
            transportProps.transport = await HttpTransport(`http://${window.location.host}:${window.location.port}`).open(`/api/apdu`);
        } else {
            transportProps.transport = await TransportWebHID.create();
        }
        transportProps.logListener = listen(log => console.log(log));
    
    return transportProps.transport;
};

export const fetchAddressDetails = async (address, derivationPath) => {
    const {data: balanceData} = await axios.get(`https://api.kaspa.org/addresses/${address}/balance`);
    document.state.balance = balanceData.balance;
    document.getElementById("BALANCE").textContent = `${balanceData.balance / 100000000} KAS`;

    const {data: utxoData} = await axios.get(`https://api.kaspa.org/addresses/${address}/utxos`);

    // UTXOs sorted by decreasing amount. Using the biggest UTXOs first minimizes number of utxos needed
    // in a transaction
    document.state.utxos = utxoData.map((utxo) => {
        return {
            prevTxId: utxo.outpoint.transactionId,
            outpointIndex: utxo.outpoint.index,
            amount: Number(utxo.utxoEntry.amount),
        };
    }).sort((a, b) => b.amount - a.amount);

    const path = derivationPath.split("/");
    document.state.addressType = Number(path[3]);
    document.state.addressIndex = Number(path[4]);
    document.state.address = address;

    console.info(document.state);
}

export const generateLedgerAddress = async (derivationPath) => {
    try {
        console.log("here")
        //When the Ledger device connected it is trying to display the bitcoin address
        const kaspa = new Kaspa(await getTransport());
        console.log("here2")
        const { address } = await kaspa.getAddress(derivationPath, false);
        console.log("here3")
        const subAdd = address.subarray(1, 66);
        console.log("SubAdd", subAdd)
        const pubkey = PublicKey.fromDER(Buffer.from(subAdd));
        const addr = pubkey.toAddress("kaspa");

        return addr
    } catch (e) {
        // setError(e.message || e)
    }
}

export const verifyAddress = async (derivationPath) => {
    // Display the address on the Ledger device and ask to verify the address
    console.log(await kaspa.getAddress(derivationPath, true));

    // User approved the address in the device, now we can fetch
    // await fetchAddressDetails(addr, derivationPath);
}

export const sendTransaction = async (signedTx) => {
    const txJson = signedTx.toApiJSON();

    const {data} = await axios.post(`https://api.kaspa.org/transactions`, txJson);

    // Refetch balance, after 2 seconds when the transaction "should" be confirmed:
    setTimeout(() => {
        const derivationPath = document.getElementById('DERIVATION_PATH').value;
        const address = document.state.address;
        fetchAddressDetails(address, derivationPath);
    }, 2000);

    // Clear fields:
    document.getElementById("SEND_TO").value = "";
    document.getElementById("AMOUNT").value = "";

    // Success message:
    document.getElementById("SEND_RESULT").textContent = data.transactionId || data.error;
};

export const sendAmount = async () => {
    const $errContainer = document.getElementById("CONTAINER_SIGN_ERROR");
    $errContainer.style.display = 'none';

    /**
     * 
     * @param {JSON[]} utxos to use 
     */
    function selectUtxos(amount) {
        let fee = 0;
        let total = 0;

        const selected = [];

        // UTXOs is sorted descending:
        for (const utxo of document.state.utxos) {
            fee += 10000; // Simple assumption
            total += utxo.amount;

            selected.push(utxo);

            if (total >= amount + fee) {
                // We have enough
                break;
            }
        }

        // [has_enough, utxos, fee, total]
        return [total >= amount + fee, selected, fee, total];
    }

    function toScriptPublicKey(address) {
        return Script.fromAddress(new Address(address, "kaspa")).toBuffer().toString("hex");
    }

    try {
        const amount = Number(document.getElementById("AMOUNT").value) * 100000000;
        const sendTo = document.getElementById("SEND_TO").value;
        console.info("Amount:", amount);
        console.info("Send to:", sendTo);

        const [hasEnough, utxos, fee, totalUtxoAmount] = selectUtxos(amount);

        console.info("hasEnough", hasEnough);
        console.info(utxos);

        if (!hasEnough) {
            // Show error we don't have enough KAS
            return;
        }

        const inputs = utxos.map((utxo) => new TransactionInput({
            value: utxo.amount,
            prevTxId: utxo.prevTxId,
            outpointIndex: utxo.outpointIndex,
            addressType: document.state.addressType,
            addressIndex: document.state.addressIndex,
        }));

        const outputs = [];

        const sendToOutput = new TransactionOutput({
            value: amount,
            scriptPublicKey: toScriptPublicKey(sendTo),
        });

        outputs.push(sendToOutput);

        const changeAmount = totalUtxoAmount - amount - fee;

        if (changeAmount > 0) {
            // Send remainder back to self:
            outputs.push(new TransactionOutput({
                value: changeAmount,
                scriptPublicKey: toScriptPublicKey(document.state.address),
            }));
        }

        const tx = new Transaction({
            version: 0,
            inputs,
            outputs,
        });

        const kaspa = new Kaspa(await getTransport());
        await kaspa.signTransaction(tx);

        // For now, just log it:
        console.info(JSON.stringify(tx.toApiJSON(), null, 4));

        await sendTransaction(tx);
    } catch (e) {
        $errContainer.style.display = 'block';
        document.getElementById("TEXT_SIGN_ERROR").textContent = String(e.message || e);
    }
};
