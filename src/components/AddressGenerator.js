import { generateLedgerAddress } from "../app-to-ledger";

const AddressGenerator = (props) => {
    return <div id="addressgen" className="bg-slate-800 mx-auto text-white p-10 flex flex-col min-h-[30rem] justify-center items-center  min-w-[350px]">
        <div className="text-teal-300 text-5xl py-3">GENERATE ADDRESS</div>
        <p className="text-white">This is an HDWallet working with the BIP39 standard. To generate an address you need a derivation path.</p>
        <div className="flex flex-row items-start justify-start mt-6">
        <input type="text" name="address" id="address" 
        className="font-mono w-64 h-14
        rounded rounded-md
        border-teal-300 border-b-2 bg-slate-600 px-3 py-4 focus:outline-none"
            defaultValue="44'/111111'/0'/0/0"
        />
        <button className="border-2 rounded rounded-md h-14 border-teal-300 bg-slate-600 text-xs ml-4 p-2 hover:bg-slate-500"
        onClick={(e) => {
            generateLedgerAddress(); 
            props.onClick && props.onClick(e)
        }}
        >Get address</button>
        </div>

        </div>
}

export default AddressGenerator;