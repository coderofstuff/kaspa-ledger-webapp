const CheckAddress = () => {
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
          <div className="text-teal-400">
            <a href="https://explorer.kaspa.org/addresses/" target="_blank">kaspa:.....</a>
            </div>
        </div>
        <div className="flex flex-row">
          <div className="w-32">Balance:</div>
          <div className="text-green-600">13.1238123 KAS</div>
        </div>
        <div className="flex flex-row">
          <div className="w-32">UTXO count:</div>
          <div className="text-green-600">15</div>
        </div>
      </div>
    </div>
  );
};

export default CheckAddress;
