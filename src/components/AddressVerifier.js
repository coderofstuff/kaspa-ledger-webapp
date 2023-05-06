import { useState } from "react";

const AddressVerifier = (props) => {
  const [verificationState, setVerificationState] = useState(false);

  return (
    <div
      id="addressVerify"
      className="bg-slate-600 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center"
    >
      <div className="text-teal-300 text-5xl py-3">
        VERIFY YOUR ADDRESS
      </div>
      <p className="text-white">
        Your address for{" "}
        <span className="text-teal-300">44'/111111'/0'/0/0</span> is:
      </p>
      <div className="text-teal-300 font-bold p-4">kaspa:q123123123123</div>
      <p className="text-white">
        Your address needs to be verified with the Ledger now.
      </p>
      <div className="flex flex-row items-start justify-start mt-6">
        <button
          className="border-2 border-teal-300 bg-slate-600 text-xl border-2 rounded-md ml-4 p-2 hover:bg-slate-500"
          onClick={() => {
            setVerificationState(true);
            props.onVerify && props.onVerify()
          }}
        >
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
