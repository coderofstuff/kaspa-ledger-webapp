import { useState } from "react";
import DeviceType from "./DeviceType";
import AddressGenerator from "./AddressGenerator";
import AddressVerifier from "./AddressVerifier";
import CheckAddress from "./CheckAddress";
import CreateTransaction from "./CreateTransaction";
import SendTransaction from "./SendTransaction";
import TxSent from "./TxSent";
import Footer from "./Footer";

const Body = () => {
  const [transaction, setTransaction] = useState();
  const [utxos, setUtxos] = useState([]);
  const [txId, setTxId] = useState("");

  const deviceTypeChanged = (deviceType) => {
    setDeviceType(deviceType);
    document
      .getElementById("addressgen")
      .scrollIntoView({ behavior: "smooth" });
  };

  const onUseAddressGenerator = (e) => {};

  const txCreated = (tx) => {
    console.info('transaction', tx.toApiJSON());
    setTransaction(tx);
    document.getElementById("sendTX").scrollIntoView({ behavior: "smooth" });
  };

  const txSent = (txId) => {
    setTxId(txId);
    document.getElementById("sentTX").scrollIntoView({ behavior: "smooth" });
  };

  const isLocal = () => {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    );
  };

  const newAddressReceived = (dervationPathGui, addr) => {
    setDerivationPath(dervationPathGui);
    setKaspaAddr(addr);
    document
      .getElementById("addressVerify")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleVerifyDone = (result) => {
    if (result) {
      console.log("here")
      setTimeout(() => {
        document
          .getElementById("checkAddress")
          .scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  };

  const [deviceType, setDeviceType] = useState(isLocal() ? "emulator" : "real");
  const [kaspaAddr, setKaspaAddr] = useState();
  const [derivationPath, setDerivationPath] = useState();

  return (
    <div className="text-base">
      <DeviceType onDeviceTypeChanged={deviceTypeChanged} />
      <AddressGenerator
        deviceType={deviceType}
        onClick={onUseAddressGenerator}
        onNewAddressGenerated={newAddressReceived}
      />
      <AddressVerifier
        deviceType={deviceType}
        kaspaAddress={kaspaAddr}
        derivationPath={derivationPath}
        onVerifyDone={handleVerifyDone}
      />
      <CheckAddress
        kaspaAddress={kaspaAddr}
        setUtxos={setUtxos}
      />
      <CreateTransaction
        kaspaAddress={kaspaAddr}
        derivationPath={derivationPath}
        utxos={utxos}
        onCreateTx={txCreated}
      />
      <SendTransaction
        transaction={transaction}
        deviceType={deviceType}
        onTxSent={txSent}
      />
      <TxSent txId={txId}/>
      <Footer />
    </div>
  );
};

export default Body;
