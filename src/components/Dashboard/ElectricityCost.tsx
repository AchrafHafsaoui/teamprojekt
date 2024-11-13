import React from 'react';

const ElectricityCost: React.FC = () => {
    return (
        <div className="w-full h-full text-white text-opacity-90 p-8 bg-black bg-opacity-70 shadow-md rounded-3xl">
            <p className="text-3xl ">Today’s electricity </p>
            <p className="text-3xl ">price</p>
            <p className="text-6xl font-bold pt-5">0.958 €/KWh</p>
            <p className="text-lg text-gray-400 pt-3">We have 100kWh available</p>
        </div>
    );
};

export default ElectricityCost