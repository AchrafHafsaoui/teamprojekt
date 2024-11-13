import React from 'react';

const ElectricityCost: React.FC = () => {
    return (
        <div className="w-full h-full p-4 text-white text-opacity-90 bg-black bg-opacity-85 shadow-md rounded-3xl">
            <p className="text-3xl ">Today’s electricity</p>
            <p className="text-3xl ">price</p>
            <p className="text-5xl font-bold pt-2">0.958 €/KWh</p>
            <p className="text-lg text-gray-400 pt-2">We have 100kWh available</p>
        </div>
    );
};

export default ElectricityCost