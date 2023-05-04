const TxSent = () => {
  return (
    <div
      id="addressgen"
      className="bg-slate-600 mx-auto text-white p-10 flex flex-col min-w-[350px]"
    >
      <div className="text-teal-300 text-4xl py-3 ml-auto">
        TRANSACTION OVERVIEW
      </div>
      <p className="text-white">
        Your transaction now has been submitted to the Kaspa network. Check the
        explorer for the transaction ID:
      </p>
      <div className="text-teal-300 m-5">
        <a href="https://explorer.kaspa.org/txs/9fd16e4364fee8498281272f1283a14298901c8eb7097346c6a8c22d5a4c43bf"
        target="_blank">
          9fd16e4364fee8498281272f1283a14298901c8eb7097346c6a8c22d5a4c43bf
        </a>
      </div>
      <p className="text-white">
        Thank you for testing the brand new Kaspa Ledger Integration!
      </p>
    </div>
  );
};

export default TxSent;
