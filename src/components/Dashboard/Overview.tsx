import React from 'react';
import FleetStatus from './FleetStatus';
import ChargingStationsStatus from './ChargingStationsStatus';

const OverviewSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Each item will take up 1/2 of the parent width on medium screens and above */}
        <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
            <ChargingStationsStatus />
        </div>
        <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
            <FleetStatus />
        </div>
        <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
            <FleetStatus /> {/* Replace with driving schedule */}
        </div>
        <div className="bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-lg p-4">
            <FleetStatus /> {/* Replace with charging schedule */}
        </div>
    </div>
);

};



export default OverviewSection;
