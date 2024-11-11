import React from 'react';

const ElectricityCost: React.FC = () => {
    return (
        <div className="w-full h-full text-white p-8">
            <p className="text-3xl ">Today’s electricity price</p>
            <p className="text-6xl font-bold">0.958 €/kWh</p>
            <p className="text-lg text-gray-400">We have 100kWh available</p>
        </div>
    );
};

export default ElectricityCost;