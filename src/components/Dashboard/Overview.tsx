import React from 'react';
import FleetStatus from './FleetStatus';
import ChargingStationsStatus from './ChargingStationsStatus';
import ElectricityCost from './ElectricityCost';

const OverviewSection: React.FC = () => {
    return (
        <div className="grid md:grid-cols-2 gap-4 mt-10 p-4 ml-20 w-full flex-1">
            {/* Each item will take up 1/2 of the parent width on medium screens and above */}
            <div className="bg-black border border-[#D3D3D3] shadow-md rounded-lg">
                <ElectricityCost />
            </div>
            <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
                <FleetStatus />
            </div>
            <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
                <FleetStatus />
            </div>
            <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
                <ChargingStationsStatus />
            </div>
        </div>
    );

};



export default OverviewSection;
