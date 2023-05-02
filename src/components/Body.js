import { generateLedgerAddress, sendAmount } from "../app-to-ledger";


const Body = () => (
  <div class="max-w-4xl mx-auto p-6 space-y-6 text-gray-800">
            <form
                id="link-form"
                class="relative flex flex-col w-full p-10 -mt-20 space-y-10 rounded-lg"
                action="#"
                onSubmit={(e) => {e.preventDefault()}}
            >
                <div
                    class="border-2 border-yellow-300 text-yellow-300 rounded-xl p-7 flex flex-col"
                >
                    <div
                        class="text-yellow-300 bg-slate-800 absolute -translate-x-2 -translate-y-10 px-2 font-bold"
                    >
                        Device Type
                    </div>
                    <label for="DEVICE_TYPE_REAL">
                        <input type="radio" id="DEVICE_TYPE_REAL" name="deviceType" value="real" />
                        Nano S/S+
                    </label>
                    <label for="DEVICE_TYPE_EMULATOR">
                        <input type="radio" id="DEVICE_TYPE_EMULATOR" name="deviceType" value="emulator" checked />
                        Speculos Emulator
                    </label>
                </div>

                <div
                    class="border-2 border-yellow-300 rounded-xl p-7 flex flex-col"
                >
                    <div
                        class="text-yellow-300 bg-slate-800 absolute -translate-x-2 -translate-y-10 px-2 font-bold"
                    >
                        Get Address
                    </div>

                    <div class="text-cyan-500 text-lg font-semibold">
                        Derivation path
                    </div>
                    <div>
                        <input
                            type="text"
                            class="flex-1 p-3 bg-slate-200 border-2 rounded-lg placeholder-slate-900 focus:outline-none"
                            placeholder="Derivation path"
                            id="DERIVATION_PATH"
                            value="44'/111111'/0'/0/0"
                        />

                        <button
                            class="ml-2 bg-slate-500 text-yellow-200 font-bold border-2 rounded-lg p-3 mr-auto hover:bg-slate-600"
                            onClick={() => {generateLedgerAddress(); return false;}}
                        >
                            Generate address from Ledger
                        </button>
                    </div>

                    <div class="text-cyan-500 text-lg font-semibold pt-6">
                        Address
                    </div>

                    <input
                        type="text"
                        class="p-3 bg-slate-200 border-2 rounded-lg placeholder-slate-900 focus:outline-none"
                        placeholder="Please use the generate button."
                        id="KASPA_ADDRESS"
                        value=""
                        readonly
                    />
                    <div class="flex flex-row text-yellow-400">
                        <span>Balance: </span>
                        <span class="text-green-400 pl-5" id="BALANCE">-</span>
                    </div>

                    <div class="flex flex-row text-yellow-400" id="CONTAINER_ADDRESS_ERROR" style={{display: "none"}}>
                        <span>Error: </span>
                        <span class="text-red-400 pl-5" id="TEXT_ADDRESS_ERROR"></span>
                    </div>
                </div>

                <div
                    class="border-2 border-yellow-300 rounded-xl p-7 flex flex-col"
                >
                    <div
                        class="text-yellow-300 bg-slate-800 absolute -translate-x-2 -translate-y-10 px-2 font-bold"
                    >
                        Send Transaction
                    </div>

                    <div class="text-cyan-500 text-lg font-semibold">
                      Amount
                  </div>

                  <input
                      type="text"
                      class="p-3 w-72 bg-slate-200 border-2 rounded-lg placeholder-slate-900 focus:outline-none"
                      placeholder="Please input amount"
                      id="AMOUNT"
                  />

                    <div class="text-cyan-500 text-lg font-semibold pt-6">
                    Send to address
                    </div>

                    <input
                        type="text"
                        class="p-3 bg-slate-200 border-2 rounded-lg placeholder-slate-900 focus:outline-none"
                        placeholder="Enter a kaspa: address"
                        id="SEND_TO"
                    />
                    
                    <button
                        class="bg-slate-500 text-yellow-300 font-bold border-2 rounded-lg p-3 mr-auto hover:bg-slate-600 mt-6"
                        onClick={() => {sendAmount(); return false;}}
                    >
                        Send Transaction via Ledger
                    </button>

                    <div class="flex flex-row text-yellow-400">
                        <span>Result: </span>
                        <span class="text-green-400 pl-5" id="SEND_RESULT">-</span>
                    </div>

                    <div class="flex flex-row text-yellow-400" id="CONTAINER_SIGN_ERROR" style={{display: "none"}}>
                        <span>Error: </span>
                        <span class="text-red-400 pl-5" id="TEXT_SIGN_ERROR"></span>
                    </div>
                </div>
            </form>
        </div>
);

export default Body;
