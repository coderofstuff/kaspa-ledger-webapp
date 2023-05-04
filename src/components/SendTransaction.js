import JSONPretty from "react-json-pretty";
import { sendAmount } from "../app-to-ledger";

const data = JSON.stringify({
  inputs: [
    {
      previousOutpoint: {
        transactionId:
          "1f27bd427e40ad8cac88294441bb877ade3543537d4b1d9e6990d9c8bb24b987",
        index: 1,
      },
      signatureScript:
        "4160b05b43191f40a42b77e4331c4bd8086141a4a0c486dbb1bd121061a1ea9cacf19bb0143010943c3199b46a0b3302aaa7c3fa38a5176499a668042ac18f5f9401",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "91d3d97e96505b8016230b609007838431526bd0133d0fed50367ac77d846ea2",
        index: 1,
      },
      signatureScript:
        "41098681159c105f3378f52008e19fc23cec4a42d51cb3c42730ea734b6c7ef4ebe5c31ad7208544d805d7267969098fc944babe703db0da6283616663130d22d001",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "a3d645f896a31d8ae9f4c99e8c29f3c071e24deffeb709fbb176752cf4058f18",
        index: 1,
      },
      signatureScript:
        "414b9818a31e41f40f600d5dcb24436c45da23914f8f33f6df9e0bc5f4a7386f4be8257746ea62fc3d60c053a6531766c88f80f4a1bc7a8468cb268638b0240b1901",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "4039dd435153b7f9b26e4c47b97027bb858591e57f3695be49de9a60a1e43b1c",
        index: 1,
      },
      signatureScript:
        "41fc83e6d0255a206cb2e2496153d7e5e67fcb07971c921ea48c3c048931e3ea9b66ce22b3c4728af869d2f8e4eb1a41ed481cf5ba659daec5eb9b699320c141cd01",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "132c0103a79ef9d6ec93683d015d3f8b0cd1ba49f632ee7d423f0aa08eab8a60",
        index: 1,
      },
      signatureScript:
        "41bde22a76894ab57ca4269acfeee96344d0d9325af39546d1145fbe7c56885e449e3a11070e2297cf11900d92dfa00caa236651843364098867b4657502428a1801",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "f6cb155d71dfaccde11fa5ff5915b67a42a5cb57c36de13145671e31b57783f9",
        index: 1,
      },
      signatureScript:
        "4131e8aa07af05d23f04cb8e0a381da1e654277f2b61cfc4d81743baab0bcefdd1184c9c8a1b8b5cd3d0485a4572cd5cae79c317efadb756e69e6d99858cec2b6e01",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "97f6853074293522d5ba0294fbbab7c1d1e86b5ecf40cdf8caf6b501e552b63f",
        index: 1,
      },
      signatureScript:
        "415cf850a67b9dc3f237b66b6e04696014932d03182787bf4a26651542a72585475cc7f7f1a422df9d51eb718cb68b777c7a855720e2a67950035fe18881278e9901",
      sigOpCount: 1,
    },
    {
      previousOutpoint: {
        transactionId:
          "743f4e196150167522b670d9b0915b06b255f6f1284062fd44ff343535a2789c",
      },
      signatureScript:
        "41fce2fc064c1dcb20e7c88d64c51ba8e352e22b99f76b7c355e598a69e3780c9cf62826a90a9713cdad96895be3c55778ed74b323a7a0b0cd21bef592ab26876d01",
      sigOpCount: 1,
    },
  ],
  outputs: [
    {
      amount: "100026044885",
      scriptPublicKey: {
        scriptPublicKey:
          "2080b51db39db69e8a8f7767993b47f725b4aadf542a1f4eaf0b73e24177c9c925ac",
      },
      verboseData: {
        scriptPublicKeyType: "pubkey",
        scriptPublicKeyAddress:
          "kaspa:qzqt28dnnkmfaz50wanejw687ujmf2kl2s4p7n40pde7ysthe8yj26uy8lmt4",
      },
    },
    {
      amount: "4673011292",
      scriptPublicKey: {
        scriptPublicKey:
          "20e1d5835e09f3c3dad209debcb7b3bf3fb0e0d9642471f5db36c9ea58338b06beac",
      },
      verboseData: {
        scriptPublicKeyType: "pubkey",
        scriptPublicKeyAddress:
          "kaspa:qrsatq67p8eu8kkjp80tedanhulmpcxevsj8rawmxmy75kpn3vrtuqyg7447h",
      },
    },
  ],
  subnetworkId: "0000000000000000000000000000000000000000",
  verboseData: {
    transactionId:
      "4c5076bd4dce5b2e8bced5d8e66f8f50b70a785f843f147f0656a5c67a2d2d7b",
    hash: "a2d2e52e8cb15613fe4a76dd9e954541e0895b6299c50308a60503f0d285343e",
    mass: "9862",
    blockHash:
      "cf5e2d2f8a5ec5062f1526b89102b8d2c95ce9651703851ec432c5572ae29e1c",
    blockTime: "1683239890183",
  },
});

const SendTransaction = (props) => {
  return (
    <>
      <div
        id="sendTX"
        className="bg-slate-800 mx-auto text-white p-10 flex flex-col min-w-[350px]"
      >
        <div className="text-teal-300 text-4xl py-3 mr-auto">
          SIGN & SEND TRANSACTION
        </div>
        <p className="text-white">Here is your unsigned transaction:</p>

        <div className="bg-[#333] rounded-2xl m-5 p-5">

        <JSONPretty
          mainStyle="line-height:1.3;color:#fff;background:#333;overflow:auto;"
          errorStyle="line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;"
          keyStyle="color:rgb(94 234 212);"
          stringStyle="color:#fd971f;"
          valueStyle="color:#a6e22e;"
          booleanStyle="color:#ac81fe;"
          id="json-pretty"
          data={data}
        ></JSONPretty>
        </div>

        <button
          className="border-2 border-teal-300 rounded-md bg-slate-600 w-60 p-2 hover:bg-slate-500 active:bg-slate-500/80"
          onClick={() => {
            props.onTxSent && props.onTxSent()
            // sendAmount(); 
            
        }}
        >
          Sign & submit transaction
        </button>
      </div>
    </>
  );
};

export default SendTransaction;
