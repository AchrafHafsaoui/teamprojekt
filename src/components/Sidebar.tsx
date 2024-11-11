import React from "react";
import OverviewIcon from "../assets/icons/overview.svg";
import ChargingStationIcon from "../assets/icons/charging stations.svg";
import ChargingScheduleIcon from "../assets/icons/charging schedule.svg";
import DrivingScheduleIcon from "../assets/icons/driving schedule.svg";
import ParkingIcon from "../assets/icons/parking.svg";
import ElectricityScheduleIcon from "../assets/icons/electricity schedule.svg";
import ElectricityStatusIcon from "../assets/icons/electricity status.svg";
import FleetStatusIcon from "../assets/icons/Fleet status.svg";

const Sidebar: React.FC = () => (
  <div className="flex flex-col bg-[#F1F1F1]  text-white w-20 hover:w-60 duration-300 h-screen fixed justify-between">
    <div className="flex flex-col space-y-2">
      {[
        { label: "Overview", icon: OverviewIcon },
        { label: "Charging Stations", icon: ChargingStationIcon },
        { label: "Charging Schedule", icon: ChargingScheduleIcon },
        { label: "Driving Schedule", icon: DrivingScheduleIcon },
        { label: "Parking", icon: ParkingIcon },
        { label: "Electricity Schedule", icon: ElectricityScheduleIcon },
        { label: "Electricity Status", icon: ElectricityStatusIcon },
        { label: "Fleet Status", icon: FleetStatusIcon },
      ].map((item) => (
        <button
          key={item.label}
          className="flex items-center p-2 rounded hover:bg-gray-700"
        >
          <img src={item.icon} alt={item.label} className="w-10 mx-4"/>
          <span
            className="whitespace-nowrap overflow-hidden text-black"
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
    <div className="text-xs text-center mb-10 text-black">v 0.0.1</div>{" "}
    {/* Positioned at the bottom */}
  </div>
);

export default Sidebar;
