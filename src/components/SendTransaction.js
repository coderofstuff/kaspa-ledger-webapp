import JSONPretty from "react-json-pretty";
import { sendAmount } from "../app-to-ledger";

const SendTransaction = (props) => {
  const txData = JSON.stringify(props.transaction ? props.transaction.toApiJSON() : {});
  return (
    <>
      <div
        id="sendTX"
        className="bg-slate-800 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center"
      >
        <div className="text-teal-300 text-5xl py-3">
          SIGN & SEND TRANSACTION
        </div>
        <p className="text-white">Here is your prepared, unsigned transaction. In this step you are going to sign and submit the transaction to the Kaspa network.</p>

        <div className="bg-[#333] rounded-2xl m-5 p-5">

        <JSONPretty
          mainStyle="line-height:1.3;color:#fff;background:#333;overflow:auto;"
          errorStyle="line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;"
          keyStyle="color:rgb(94 234 212);"
          stringStyle="color:#fd971f;"
          valueStyle="color:#a6e22e;"
          booleanStyle="color:#ac81fe;"
          id="json-pretty"
          data={txData}
        ></JSONPretty>
        </div>

        <button
          className="border-2 border-teal-300 rounded-md bg-slate-600 w-60 p-2 hover:bg-slate-500 active:bg-slate-500/80"
          onClick={async () => {
            const txId = await sendAmount(props.transaction, props.deviceType);
            props.onTxSent && props.onTxSent(txId);
        }}
        >
          Sign & submit transaction
        </button>
      </div>
    </>
  );
};

export default SendTransaction;
