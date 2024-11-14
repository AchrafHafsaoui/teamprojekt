import React from 'react';

const ElectricityCost: React.FC = () => {
    return (
        <div className="w-full h-3/5 p-6 text-white bg-black bg-opacity-90 shadow-lg rounded-3xl flex flex-col">
            <div>
                <p className="text-3xl leading-tight">Today’s electricity price</p>
            </div>
            <p className="text-7xl font-bold">0.958 €/KWh</p>
            <p className="text-lg text-gray-300">100 kWh available</p>
        </div>
    );
};

export default ElectricityCost;
