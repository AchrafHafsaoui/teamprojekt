import React from "react";
import FleetStatus from "./FleetStatus";
import ElectricityCost from "./ElectricityCost";
import EnergyConsumption from "./EnergyConsumption";
import DrivingSchedule from "./DrivingSchedule";
import { TypeAnimation } from "react-type-animation";
import ParkingStatus from "./ParkingStatus";
import ChargingSchedule from "./ChargingStationStatus";

const Overview: React.FC = () => {
  return (
    <div className="grid h-full w-full gap-10 pr-10 overflow-hidden bg-cover bg-center">
      {/* Define 3 rows: Upper, Middle, and Parking Status */}
      <div className="grid grid-rows-[minmax(300px,auto)_minmax(300px,auto)_1fr] h-full gap-5">
        {/* Upper Section with 3 columns */}
        <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 p-4">
          <div className="flex flex-col justify-center px-4 rounded-lg">
            <h2 className="text-6xl font-light tracking-wide ml-2">
              <TypeAnimation
                sequence={["Hello,"]}
                speed={20}
                cursor={false}
                wrapper="span"
              />
            </h2>
            <h2
              className="text-7xl font-semibold mb-5 ml-2"
              style={{ color: "rgb(7, 142, 205)" }}
            >
              <TypeAnimation
                sequence={["Belmonte!"]}
                speed={40}
                cursor={false}
                wrapper="span"
              />
            </h2>
            <ElectricityCost />
          </div>
          <div className="rounded-lg overflow-hidden">
            <DrivingSchedule />
          </div>
          <div className="rounded-lg overflow-hidden">
            <EnergyConsumption />
          </div>
        </div>

        {/* Middle Section with 2 columns */}
        <div className="grid gap-10 lg:grid-cols-2 sm:grid-cols-1 p-4">
          <div className="rounded-lg overflow-hidden">
            <FleetStatus showAllColumns={false} />
          </div>
          <div className="rounded-lg overflow-hidden">
            <ChargingSchedule fullHeight={false}/>
          </div>
        </div>

        {/* Parking Status Section occupying the remaining row */}
        <div className="rounded-lg overflow-hidden p-4">
          <ParkingStatus />
        </div>
      </div>
    </div>
  );
};

export default Overview;
