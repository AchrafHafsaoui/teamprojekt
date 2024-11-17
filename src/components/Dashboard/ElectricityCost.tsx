import React from "react";

const ElectricityCost: React.FC = () => {
  return (
    <div className="w-full h-3/5 p-6 text-white bg-black bg-opacity-90 shadow-lg rounded-3xl flex flex-col">
      <p className="text-3xl leading-tight">Today’s electricity price</p>
      <p className="text-6xl mt-8 font-bold">0.958 €/KWh</p>
      <p className="text-lg mt-2 text-gray-300">100 kWh available</p>
    </div>
  );
};

export default ElectricityCost;
