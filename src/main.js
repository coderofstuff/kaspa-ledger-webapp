import 'core-js/actual';
import { listen } from "@ledgerhq/logs";
import { Kaspa, TransactionInput, TransactionOutput, Transaction } from "hw-app-kaspa";
import { PublicKey, Address, Script } from "@kaspa/core-lib";
import axios from "axios";

import TransportWebHID from "@ledgerhq/hw-transport-webhid";

document.state = {
    balance: 0,
    utxos: [],
    address: null,
    addressType: 0,
    addressIndex: 0,
};

/**
 * Initializes the transport to use with Kaspa if it doesn't exist yet.
 * Returns it otherwise.
 * 
 * @returns {TransportWebHID}
 */
document.getTransport = async function() {
    if (!document.transport) {
        document.transport = await TransportWebHID.create();
    }
    
    return document.transport;
};

document.fetchAddressDetails = async function(address, derivationPath) {
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
};

document.generateLedgerAddress = async function() {
    document.getElementById("BALANCE").textContent = "-";
    const $errContainer = document.getElementById("CONTAINER_ADDRESS_ERROR");
    $errContainer.style.display = 'none';
    const derivationPath = document.getElementById('DERIVATION_PATH').value;

    try {
        //listen to the events which are sent by the Ledger packages in order to debug the app
        listen(log => console.log(log));

        //When the Ledger device connected it is trying to display the bitcoin address
        const kaspa = new Kaspa(await document.getTransport());
        const { address } = await kaspa.getAddress(derivationPath, false);

        const subAdd = address.subarray(1, 66);
        const pubkey = PublicKey.fromDER(Buffer.from(subAdd));
        const addr = pubkey.toAddress("kaspa");

        document.getElementById("KASPA_ADDRESS").value = addr;
        document.getElementById("BALANCE").textContent = "Please confirm the address on the device to fetch balance";

        // Display the address on the Ledger device and ask to verify the address
        await kaspa.getAddress(derivationPath, true);

        // User approved the address in the device, now we can fetch
        await document.fetchAddressDetails(addr, derivationPath);
    } catch (e) {
        // Catch any error thrown and displays it on the screen
        $errContainer.style.display = 'block';
        document.getElementById("TEXT_ADDRESS_ERROR").textContent = String(e.message || e);
        document.getElementById("BALANCE").textContent = "-";
    }
};

document.sendAmount = async function() {
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

        console.info("---- TXIN");
        inputs.forEach((i) => console.info())

        const kaspa = new Kaspa(await document.getTransport());
        await kaspa.signTransaction(tx);

        // For now, just log it:
        console.info(JSON.stringify(tx.toApiJSON(), null, 4));
    } catch (e) {
        $errContainer.style.display = 'block';
        document.getElementById("TEXT_SIGN_ERROR").textContent = String(e.message || e);
    }
};
