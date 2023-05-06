import { useState } from "react";
import {createTransaction} from "../app-to-ledger";

const CreateTransaction = (props) => {
    const [amount, setAmount] = useState();
    const [sendTo, setSendTo] = useState();

    const onSendToChange = (event) => {
        console.info('onSendToChange', event.target.value);
        setSendTo(event.target.value);
    };

    const onAmountChange = (event) => {
        console.info('onAmountChange', event.target.value);
        setAmount(event.target.value);
    };

    const onCreateTransactionClick = () => {
        if (!amount || !sendTo) {
            return;
        }

        const sompi = Math.round(Number(amount) * 100000000);

        console.info('props', props);
        const tx = createTransaction(sompi, sendTo, props.utxos, props.derivationPath, props.kaspaAddress);
        if (tx && props.onCreateTx) {
            props.onCreateTx(tx);
        }
    };

    return <div id="addressgen" className="bg-slate-600 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center">
        <div className="text-teal-300 text-5xl py-3">CREATE TRANSACTION</div>
        <p className="text-white">Now you can send a transaction to a receiver. The unsigned TX will be created and signed with the Ledger device.</p>
        
        <div className="flex flex-col items-start justify-start mt-6 space-y-4">
        <input type="text" name="toAddress" id="toAddress" className="w-[50rem] h-8 border-teal-300 border-b-2 bg-slate-600 px-3 py-4 focus:outline-none"
            placeholder="To address"
            onChange={onSendToChange}
            value={sendTo}
        />
        <div className="flex flex-row justify-center items-center">
        <input type="text" name="amount" id="amount" className="w-44 h-8 border-teal-300 border-b-2 bg-slate-600 px-3 py-4 focus:outline-none"
            placeholder="Amount"
            onChange={onAmountChange}
            value={amount}
        />
        <div className="text-white ml-2">KAS</div>
        </div>
        <button className="border-2 border-teal-300 rounded-md bg-slate-600 text-xs p-4 hover:bg-slate-500 active:bg-slate-500/80"
        onClick={onCreateTransactionClick}
        >Create transaction</button>
        </div>

        </div>
}

export default CreateTransaction;