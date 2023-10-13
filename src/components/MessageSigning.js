import { useState } from "react";
import { signMessage } from "../app-to-ledger";

const MessageSigning = (props) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState("");
    const [message, setMessage] = useState("");
    const [signature, setSignature] = useState("");
    const [messageHash, setMessageHash] = useState("");

    function processSignMessage() {
        setHasError("");
        setSignature("");
        setMessageHash("");
        setLoading(false);

        if (!message) {
            setHasError("Please type in a message to sign");
            return;
        }

        if (!props.derivationPath) {
            setHasError("Please set a derivation path first");
            return;
        }

        if (!props.deviceType) {
            setHasError("Please select a device type first");
            return;
        }

        signMessage(message, props.derivationPath, props.deviceType).then(({signature, messageHash}) => {
            setSignature(signature);
            setMessageHash(messageHash);
            setHasError("");
        }).catch((err) => {
            setHasError(`Failed to sign the message: ${err.message}`);
        }).finally(() => {
            setLoading(false);
        });

        setLoading(true);
    }

    return (
        <div
            id="messageSigning"
            className="bg-slate-800 mx-auto text-white p-10 flex flex-col min-w-[350px] min-h-[30rem] justify-center items-center"
        >
            <div className="flex flex-row justify-center items-center text-teal-300 text-5xl py-3">
                MESSAGE SIGNING
            </div>

            <textarea className="font-mono w-64 h-14
                rounded rounded-md
                border-teal-300 border-b-2 bg-slate-600 px-3 focus:outline-none"
                maxLength={100}
                rows="8"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}></textarea>
            
            <div className="flex flex-row items-start justify-start mt-6">
                <button
                    className="flex flex-row flex-nowrap border-2 border-teal-300 bg-slate-600 text-xl border-2 rounded-md ml-4 p-2 hover:bg-slate-500"
                    onClick={processSignMessage}
                >
                {loading && (
                    <img
                    className="w-8 h-8 mr-2 text-teal-300 animate-spin"
                    src="assets/spinner.svg"
                    />
                )}
                Sign Message
                </button>
            </div>

            {loading && (
                <p className="text-orange-400 text-2xl">
                Now please check your Ledger device, review and sign the message.
                </p>
            )}

            {hasError && (
                <p className="text-red-400 text-2xl">
                    {hasError}
                </p>
            )}

            {signature && (
                <p className="text-green-400 text-sm w-96 font-mono wrap flex-wrap break-words">
                Signature: {signature}
                </p>
            )}
        </div>
    );
}

export default MessageSigning;
