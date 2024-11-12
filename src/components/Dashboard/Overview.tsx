import React from 'react';
import FleetStatus from './FleetStatus';
import ChargingStationsStatus from './ChargingStationsStatus';
import ElectricityCost from './ElectricityCost';
import EnergyConsumption from './EnergyConsumption';

const Overview: React.FC = () => {
    return (
        <div className="grid mt-20 ml-20 w-full flex-1 bg-white gap-8">
            {/* Upper Section with 3 rectangles */}
            <div className="grid grid-cols-3 gap-20 h-1/2 mx-20">
                <div className="grid grid-rows-2 col-span-1">
                    <h2 className="ml-10 text-7xl font-semibold">Hello</h2>
                    <h2 className="ml-10 text-7xl font-semibold">Belmonte!</h2>
                    <ElectricityCost />
                </div>
                <EnergyConsumption />
            </div>

            {/* Lower Section with 2 rectangles */}
            <div className="grid grid-cols-2 gap-20 h-1/2 mt-4 mx-20">
                <FleetStatus />
            </div>
        </div>
    );
};

export default Overview;
