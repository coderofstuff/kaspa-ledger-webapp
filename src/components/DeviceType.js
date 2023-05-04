import { useState } from "react";

const DeviceType = (props) => {
  const [chosenType, setChosenType] = useState();

  return (
    <div className="bg-slate-600 mx-auto p-10 flex flex-col min-w-[350px] py-16">
      <div className="text-teal-200 text-[3rem] uppercase mx-auto mb-12">
        Choose your device
      </div>

      <div className="flex flex-col md:flex-row justify-around max-w-6xl self-center space-x-14">
        <div className="flex flex-col">
          <img
            src="./assets/ledger-device.png"
            alt=""
            className={`${
              chosenType == 1 ? "border-teal-300/80" : ""
            } h-48 mx-auto border-4 hover:border-teal-300 rounded-lg shadow-md shadow-slate-300/40`}
            onClick={() => {
              setChosenType(1);
              props.onDeviceTypeChanged && props.onDeviceTypeChanged(1);
            }}
          />
          <div
            className={`w-100 mx-auto mt-3 ${
              chosenType == 1 ? "text-teal-300" : "text-white"
            } `}
          >
            Ledger S or S+
          </div>
        </div>

        <div className="flex flex-col">
          <img
            src="./assets/emulator.png"
            alt=""
            className={`${
              chosenType == 2 ? "border-teal-300/60" : ""
            } h-48 mx-auto border-4 rounded-lg hover:border-teal-300 shadow-md shadow-slate-300/40`}
            onClick={() => {
              setChosenType(2);
              props.onDeviceTypeChanged && props.onDeviceTypeChanged(2);
            }}
          />
          <div
            className={`w-100 mx-auto mt-3 ${
              chosenType == 2 ? "text-teal-300" : "text-white"
            } `}
          >
            Speculos Emulator (localhost only)
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceType;
