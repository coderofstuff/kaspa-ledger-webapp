import { useState } from "react";
import { generateLedgerAddress, sendAmount } from "../app-to-ledger";
import DeviceType from "./DeviceType";
import AddressGenerator from "./AddressGenerator";
import AddressVerifier from "./AddressVerifier";
import CheckAddress from "./CheckAddress";
import CreateTransaction from "./CreateTransaction";
import SendTransaction from "./SendTransaction";
import TxSent from "./TxSent";
import Footer from "./Footer";

const Body = () => {
  const deviceTypeChanged = (deviceType) => {
    document
      .getElementById("addressgen")
      .scrollIntoView({ behavior: "smooth" });
  };

  const onUseAddressGenerator = (e) => {
   
  };

  const verifyAddress = (e) => {
    setTimeout(() => {
      document
        .getElementById("checkAddress")
        .scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  const txCreated = () => {
    console.log("Test")
    document
      .getElementById("sendTX")
      .scrollIntoView({ behavior: "smooth" });
  }

  const txSent = () => {
    document
    .getElementById("sentTX")
    .scrollIntoView({ behavior: "smooth" });
  }

  const isLocal = () => {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    );
  };

  const isDeviceTypeChecked = (value) => {
    return deviceType === value;
  };

  const newAddressReceived = (dervationPathGui, addr) => {
    setDerivationPath(dervationPathGui)
    setKaspaAddr(addr)
    document
    .getElementById("addressVerify")
    .scrollIntoView({ behavior: "smooth" });
  }

  const [deviceType, setDeviceType] = useState(isLocal() ? "emulator" : "real");
  const [kaspaAddr, setKaspaAddr] = useState();
  const [derivationPath, setDerivationPath] = useState();

  return (
    <div className="text-base">
      <DeviceType onDeviceTypeChanged={deviceTypeChanged} />
      <AddressGenerator onClick={onUseAddressGenerator} onNewAddressGenerated={newAddressReceived} />
      <AddressVerifier onVerify={verifyAddress}
      kaspaAddress={kaspaAddr}
      derivationPath={derivationPath}
      />
      <CheckAddress />
      <CreateTransaction onCreateTx={txCreated} />
      <SendTransaction onTxSent={txSent} />
      <TxSent />
      <Footer />
    </div>
  );
};

export default Body;
