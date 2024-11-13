import React from 'react';
import FleetStatus from './FleetStatus';
import ElectricityCost from './ElectricityCost';
import EnergyConsumption from './EnergyConsumption';
import DrivingSchedule from './DrivingSchedule';
import { TypeAnimation } from 'react-type-animation';
import ParkingStatus from './ParkingStatus';

const Overview: React.FC = () => {
    return (
        <div className="grid mt-20 ml-20 flex-1 gap-8 max-h-svh overflow-hidden">
            {/* Upper Section with 3 rectangles */}
            <div className="grid grid-cols-3 gap-20 mx-20 md:grid-cols-3 md:gap-20 md:mx-20 sm:grid-cols-1">
                <div className="flex flex-col items-start justify-center">
                    <h2 className="ml-5 text-6xl font-light tracking-wide">
                        <TypeAnimation
                            sequence={['Hello,']}
                            speed={20}
                            cursor={false}
                            wrapper="span"
                        />
                    </h2>
                    <h2 className="ml-5 text-7xl font-semibold mb-5" style={{ color: 'rgb(7, 142, 205)' }}>
                        <TypeAnimation
                            sequence={['Belmonte!']}
                            speed={40}
                            cursor={false}
                            wrapper="span"
                        />
                    </h2>
                    <ElectricityCost />
                </div>
                <DrivingSchedule />
                <EnergyConsumption />
            </div>

            {/* Middle Section with 2 rectangles */}
            <div className="grid grid-cols-6 gap-20 mt-4 mx-20 md:grid-cols-6 md:gap-20 md:mx-20 sm:grid-cols-1">
                <FleetStatus />
                <div className="col-span-3">
                    <DrivingSchedule />
                </div>
            </div>

            {/* Parking Status Section as a new row */}
            <div className="mx-20 my-8">
                <ParkingStatus />
            </div>
        </div>
    );
};

export default Overview;
