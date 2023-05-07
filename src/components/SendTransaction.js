import JSONPretty from "react-json-pretty";
import { sendAmount } from "../app-to-ledger";
import { useState } from "react";
import CopyButton from "./CopyButton"

const SendTransaction = (props) => {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState();

  const txData = JSON.stringify(
    props.transaction ? props.transaction.toApiJSON() : {}
  );

  return (
    <>
      <div
        id="sendTX"
        className="bg-slate-800 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center"
      >
        <div className="text-teal-300 text-5xl py-3">
          SIGN & SEND TRANSACTION
        </div>
        <p className="text-white">
          Here is your prepared, unsigned transaction. In this step you are
          going to sign and submit the transaction to the Kaspa network.
        </p>

        <div className="flex flex-col bg-[#333] rounded-2xl m-5 p-5 overflow-hidden w-11/12">
          <div className="ml-auto mr-10"><CopyButton text={txData} /></div>
          <JSONPretty
            mainStyle="line-height:1.3;color:#fff;background:#333;overflow:auto;"
            errorStyle="line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;"
            keyStyle="color:rgb(94 234 212);"
            stringStyle="color:#fd971f;"
            valueStyle="color:#a6e22e;"
            booleanStyle="color:#ac81fe;"
            id="json-pretty"
            className="overflow-y-auto"
            data={txData}
          ></JSONPretty>
        </div>

        <button
          className="border-2 border-teal-300 rounded-md bg-slate-600 flex flex-row justify-center items-center p-2 hover:bg-slate-500 active:bg-slate-500/80"
          onClick={async () => {
            setLoading(true);
            sendAmount(props.transaction, props.deviceType)
              .then((txId) => {
                setLoading(false);
                props.onTxSent && props.onTxSent(txId);
                setShowMessage(<span className="text-green-300">Transaction sent succesfully.</span>);
              })
              .catch((err) => {
                setLoading(false);
                console.log("Error submitting TX", err);
                setShowMessage(<span className="text-red-400">Transaction declined. Review not accepted or the TX got already sent to the network.</span>);
              });
          }}
        >
          {!!loading && (
            <img
              className="w-12 h-12 m-2 text-teal-300 animate-spin"
              src="assets/spinner.svg"
            />
          )}
          Sign & submit transaction
        </button>
        {loading && (
          <p className="text-orange-400 text-2xl">
            Now please check your Ledger device and verify the address.
          </p>
        )}
        {!!showMessage && (
          <div className="mt-4">{showMessage}</div>
        )}
      </div>
    </>
  );
};

export default SendTransaction;
