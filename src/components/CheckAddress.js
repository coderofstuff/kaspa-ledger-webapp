const CheckAddress = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col p-8"
    id="checkAddress">
      <div className="text-4xl text-teal-300">ADDRESS OVERVIEW</div>

      <p className="mb-9">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque,
        molestias ratione minus assumenda et ex id inventore ad sequi
        perspiciatis, aliquam suscipit porro. Incidunt culpa dolor saepe, iusto
        nemo fuga dolorem tenetur iure? Numquam voluptatibus illo animi ad
        voluptas accusamus fugit eligendi sit repellendus quo dolore ex, fuga
        quidem ipsum molestiae consequatur autem architecto? Doloremque.
      </p>

      <div className="flex flex-row">
        <div className="w-32">Address:</div>
        <div>kaspa:Loremipsumjk1oi12oij3111232121</div>
      </div>
      <div className="flex flex-row">
        <div className="w-32">Balance:</div>
        <div>13.1238123 KAS</div>
      </div>
      <div className="flex flex-row">
        <div className="w-32">UTXO count:</div>
        <div>15</div>
      </div>
    </div>
  );
};

export default CheckAddress;
