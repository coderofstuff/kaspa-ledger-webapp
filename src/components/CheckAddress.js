import { useEffect, useState } from "react";
import { getAddressBalance, getAddressUtxos } from "../kaspa-api-client";
import CopyButton from "./CopyButton";

const CheckAddress = (props) => {
  const [balance, setBalance] = useState(0);
  const [utxoCount, setUtxoCount] = useState(0);

  useEffect(() => {
    // address kaspa changed, request balance and utxos
    const updateData = async () => {
      // set balance
      getAddressBalance(props.kaspaAddress)
        .then((v) => setBalance(v / 1_0000_0000))
        .catch((err) => console.log("error", err));

      // set utxo count
      getAddressUtxos(props.kaspaAddress)
        .then((utxos) => {
          setUtxoCount(utxos.length);
          props.setUtxos &&
            props.setUtxos(
              (utxos || []).map((utxo) => {
                console.info("utxo", utxo);
                return {
                  amount: Number(utxo.utxoEntry.amount),
                  prevTxId: utxo.outpoint.transactionId,
                  outpointIndex: utxo.outpoint.index,
                };
              })
            );
        })
        .catch((err) => console.log("error", err));
    };

    if (!!props.kaspaAddress) {
      updateData();
    }
  }, [props.kaspaAddress]);

  return (
    <div
      className="bg-slate-800 text-white flex flex-col p-8 min-h-[30rem] justify-center items-center"
      id="checkAddress"
    >
      <div className="text-5xl text-teal-300">ADDRESS OVERVIEW</div>
      {!!props.kaspaAddress ? (
        <>
          <p className="mb-9">
            You now have a kaspa address with the following values:
          </p>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="w-32">Address:</div>
              <div className="text-teal-400 text-sm font-mono flex flex-row justify-center items-center">
                <a
                  href={`https://explorer.kaspa.org/addresses/${props.kaspaAddress}`}
                  target="_blank"
                >
                  {props.kaspaAddress}
                </a>
                <CopyButton text={props.kaspaAddress} />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-32">Balance:</div>
              <div className="text-green-600">{balance} KAS</div>
            </div>
            <div className="flex flex-row">
              <div className="w-32">UTXO count:</div>
              <div className="text-green-600">{utxoCount}</div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white text-xl">No address generated yet.</p>
      )}
    </div>
  );
};

export default CheckAddress;
