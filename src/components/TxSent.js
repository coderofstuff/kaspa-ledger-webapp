import { BsCheckCircleFill } from 'react-icons/bs'

const TxSent = (props) => {
  return (
    <div
      id="sentTX"
      className="bg-slate-600 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center"
    >
      <div className="flex flex-row justify-center items-center text-teal-300 text-5xl py-3">
        TRANSACTION OVERVIEW {!!props.txId && <BsCheckCircleFill className="ml-5 text-lime-400" />}
      </div>
      {!!props.txId ? <>
      <p className="text-white">
        Your transaction now has been submitted to the Kaspa network. Check the
        explorer for the transaction ID:
      </p>
      <div className="text-teal-300 m-5 font-mono">
        <a href={`https://explorer.kaspa.org/txs/${props.txId}`}
        target="_blank">
          {props.txId}
        </a>
      </div>
      <p className="text-white">
        Thank you for testing the brand new Kaspa Ledger Integration!
      </p>
      </> : <p>There is no transaction submitted yet. Please create, sign and submit a TX to see a result here.</p>}
      
    </div>
  );
};

export default TxSent;
