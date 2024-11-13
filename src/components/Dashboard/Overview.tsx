import React from 'react';
import FleetStatus from './FleetStatus';
import ElectricityCost from './ElectricityCost';
import EnergyConsumption from './EnergyConsumption';
import DrivingSchedule from './DrivingSchedule';
import { TypeAnimation } from 'react-type-animation';
import ParkingStatus from './ParkingStatus';

const Overview: React.FC = () => {
    return (
        <div
            className="flex flex-col h-screen w-screen gap-10 pl-40 pr-20 pt-20 pb-20 bg-cover bg-center"
            style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }} // Replace with your image path
        >
            {/* Upper Section */}
            <div className="flex flex-1 gap-10 h-3/5">
                <div className="flex flex-col justify-center flex-1 px-4 rounded-lg">
                    <h2 className="text-5xl font-light tracking-wide ml-2">
                        <TypeAnimation
                            sequence={['Hello,']}
                            speed={20}
                            cursor={false}
                            wrapper="span"
                        />
                    </h2>
                    <h2 className="text-6xl font-semibold mb-5 ml-2" style={{ color: 'rgb(7, 142, 205)' }}>
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

            {/* Middle Section */}
            <div className="flex flex-1 gap-10">
                <FleetStatus />
                <DrivingSchedule />
            </div>

            {/* Parking Status Section */}
            <ParkingStatus />
        </div>
    );
};

export default Overview;
