import { generateLedgerAddress } from "../app-to-ledger";

const AddressGenerator = (props) => {
    return <div id="addressgen" className="bg-slate-800 mx-auto text-white p-10 flex flex-col min-w-[350px]">
        <div className="text-teal-300 text-4xl py-3">GET ADDRESS</div>
        <p className="text-white">This is an HDWallet working with the BIP39 standard. To generate an address you need a derivation path.</p>
        <p className="text-white">Example 44'/111111'/0'/0/0</p>
        <p className="text-white">
            44' = Lorem, ipsum.<br/>
        111111' = Lorem ipsum dolor sit.<br/>
        0' = Lorem ipsum dolor sit.<br/>
        0 = Receiving address<br/>
        0 = Index
        </p>
        <div className="flex flex-row items-start justify-start mt-6">
        <input type="text" name="address" id="address" className="w-48 h-8 border-teal-300 border-b-2 bg-slate-600 px-3 py-4 focus:outline-none"
            defaultValue="44'/111111'/0'/0/0"
        />
        <button className="border-2 border-teal-300 bg-slate-600 text-xs ml-4 p-2 hover:bg-slate-500"
        onClick={(e) => {
            // generateLedgerAddressAddress(); 
            props.onClick && props.onClick(e)
        }}
        >Get address</button>
        </div>

        </div>
}

export default AddressGenerator;