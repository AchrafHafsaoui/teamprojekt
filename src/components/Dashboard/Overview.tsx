import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import FleetStatus from './FleetStatus';
import ChargingStationsStatus from './ChargingStationsStatus';
import ElectricityCost from './ElectricityCost';
import EnergyConsumption from './EnergyConsumption';
import DrivingSchedule from './DrivingSchedule';

const Overview: React.FC = () => {
    return (
        <div className="grid mt-20 ml-20 w-full flex-1 gap-8">
            {/* Upper Section with 3 rectangles */}
            <div className="grid grid-cols-3 gap-20 h-1/2 mx-20">
                <div className="flex flex-col items-start justify-center col-span-1">
                    <h2 className="ml-5 text-6xl font-light tracking-wide">
                        <TypeAnimation
                            sequence={['Hello,']}
                            speed={20} // typing speed
                            cursor={false} // no blinking cursor
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

            {/* Lower Section with 2 rectangles */}
            <div className="grid grid-cols-2 gap-20 h-1/2 mt-4 mx-20">
                <FleetStatus />
                <DrivingSchedule />
            </div>
        </div>
    );
};

export default Overview;
