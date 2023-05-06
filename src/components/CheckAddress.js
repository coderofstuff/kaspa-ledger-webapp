import { useEffect, useState } from "react";
import { getAddressBalance, getAddressUtxos } from "../kaspa-api-client";

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
        .then((v) => {setUtxoCount(v.length)})
        .catch((err) => console.log("error", err));
    };


    updateData();

  }, [props.kaspaAddress]);

  return (
    <div
      className="bg-slate-800 text-white flex flex-col p-8 min-h-[30rem] justify-center items-center"
      id="checkAddress"
    >
      <div className="text-5xl text-teal-300">ADDRESS OVERVIEW</div>

      <p className="mb-9">
        You now have a kaspa address with the following values:
      </p>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-32">Address:</div>
          <div className="text-teal-400 text-sm font-mono">
            <a href={`https://explorer.kaspa.org/addresses/${props.kaspaAddress}`} target="_blank">
            {props.kaspaAddress}
            </a>
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
    </div>
  );
};

export default CheckAddress;
