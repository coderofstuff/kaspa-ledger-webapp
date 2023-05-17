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
    logListener: null,
    isEmulator: true,
};

/**
 * 
 * @param {JSON[]} utxos to use 
 */
function selectUtxos(amount, utxosInput) {
    let fee = 0;
    let total = 0;

    const selected = [];

    // UTXOs is sorted descending:
    for (const utxo of utxosInput) {
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

/**
 * Initializes the transport to use with Kaspa if it doesn't exist yet.
 * Returns it otherwise.
 * 
 * @returns {TransportWebHID}
 */
export const getTransport = async (emulator=true) => {
    // If not initialized or we're changing from emulator to non-emulator:
    if (!transportProps.transport || transportProps.isEmulator != emulator) {
        if (emulator) {
            transportProps.transport = await HttpTransport(`http://${window.location.host}:${window.location.port}`).open(`/api/apdu`);
        } else {
            transportProps.transport = await TransportWebHID.create();
        }
        transportProps.logListener = listen(log => console.log(log));
        transportProps.isEmulator = emulator;
    }
    
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

export const generateLedgerAddress = async (derivationPath, deviceType) => {
    //When the Ledger device connected it is trying to display the bitcoin address
    const isEmulator = deviceType === 2;
    const transport = await getTransport(isEmulator);
    const kaspa = new Kaspa(transport);
    const { address } = await kaspa.getAddress(derivationPath, false);
    const subAdd = address.subarray(1, 66);
    console.log("SubAdd", subAdd)
    const pubkey = PublicKey.fromDER(Buffer.from(subAdd));
    const addr = pubkey.toAddress("kaspa");
    return addr.toString();
}

export const verifyAddress = async (derivationPath, deviceType) => {
    const isEmulator = deviceType === 2;
    const transport = await getTransport(isEmulator);
    const kaspa = new Kaspa(transport);
    // Display the address on the Ledger device and ask to verify the address
    console.log("Verifying address for", derivationPath)

    return await kaspa.getAddress(derivationPath, true).then(
        (address) => {
            console.log("Received address from Ledger device")
            return true
        }
    ).catch(
        (err) => {
            // Error received (e.g. "TransportStatusError")
            // Verification failed.
            console.log("Error received.")
            return false
        }
    )
}

export const sendTransaction = async (signedTx) => {
    const txJson = signedTx.toApiJSON();

    const {data} = await axios.post(`https://api.kaspa.org/transactions`, txJson);

    return data.transactionId;
};

export const createTransaction = (amount, sendTo, utxosInput, derivationPath, address) => {
    console.info("Amount:", amount);
    console.info("Send to:", sendTo);
    console.info("UTXOs:", utxosInput);
    console.info("Derivation Path:", derivationPath);

    const [hasEnough, utxos, fee, totalUtxoAmount] = selectUtxos(amount, utxosInput);

    console.info("hasEnough", hasEnough);
    console.info(utxos);

    if (!hasEnough) {
        // Show error we don't have enough KAS
        throw new Error('Amount too high.')
    }

    const path = derivationPath.split('/');
    console.info('Split Path:', path);

    const inputs = utxos.map((utxo) => new TransactionInput({
        value: utxo.amount,
        prevTxId: utxo.prevTxId,
        outpointIndex: utxo.outpointIndex,
        addressType: Number(path[3]),
        addressIndex: Number(path[4]),
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
            scriptPublicKey: toScriptPublicKey(address),
        }));
    }

    const tx = new Transaction({
        version: 0,
        inputs,
        outputs,
        // Make sure to send it back to myself
        // Path here must match the script public key passed
        changeAddressType: Number(path[3]),
        changeAddressIndex: Number(path[4]),
    });

    return tx;
};

export const sendAmount = async (tx, deviceType) => {
    const isEmulator = deviceType === 2;
    const transport = await getTransport(isEmulator)
    const kaspa = new Kaspa(transport);
    await kaspa.signTransaction(tx);

    // For now, just log it:
    console.info(JSON.stringify(tx.toApiJSON(), null, 4));

    return await sendTransaction(tx);
};
