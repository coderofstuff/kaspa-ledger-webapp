import { useEffect, useState } from "react";
import { verifyAddress } from "../app-to-ledger";

const AddressVerifier = (props) => {
  const [verificationState, setVerificationState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // kaspa address changed - reset state
    setVerificationState(false)
  }, [props.kaspaAddress])

  const verifyNow = async () => {
    setVerificationState(false)
    props.onVerifyStart && props.onVerifyStart()

    verifyAddress(props.derivationPath).then(
      result => {
        setVerificationState(result)
      }
    )
    props.onVerifyDone && props.onVerifyDone(result)
  }

  return (
    <div
      id="addressVerify"
      className="bg-slate-600 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center"
    >
      <div className="text-teal-300 text-5xl py-3">
        VERIFY YOUR ADDRESS
      </div>
      <p className="text-white">
        Your address for
        <span className="text-teal-300 font-mono"> {props.derivationPath}</span> is:
      </p>
      <div className="text-teal-300 font-mono p-4">
        <a href={`https://explorer.kaspa.org/addresses/${props.kaspaAddress}`} target="_blank">{props.kaspaAddress}</a>
        </div>
      <p className="text-white">
        Your address needs to be verified with the Ledger now.
      </p>
      <div className="flex flex-row items-start justify-start mt-6">
        <button
          className="flex flex-row flex-nowrap border-2 border-teal-300 bg-slate-600 text-xl border-2 rounded-md ml-4 p-2 hover:bg-slate-500"
          onClick={verifyNow}
        >
          {loading && <img className="w-8 h-8 mr-2 text-teal-300 animate-spin" src="assets/spinner.svg" / >}
          Verify address now!
        </button>
      </div>
      <div className="text-white text-xl mt-6 flex flex-row items-center">
        Address verification status:
        {!verificationState ? (
          <span className="text-red-600 text-5xl ml-5">✗</span>
        ) : (
          <span className="text-green-500 text-5xl ml-5 animate-spin-fast">
            ✔
          </span>
        )}
      </div>
    </div>
  );
};

export default AddressVerifier;
