import React, { useState } from "react";
import OverviewIcon from "../assets/icons/overview.svg";
import ChargingStationIcon from "../assets/icons/charging stations.svg";
import ChargingScheduleIcon from "../assets/icons/charging schedule.svg";
import DrivingScheduleIcon from "../assets/icons/driving schedule.svg";
import ParkingIcon from "../assets/icons/parking.svg";
import ElectricityScheduleIcon from "../assets/icons/electricity schedule.svg";
import ElectricityStatusIcon from "../assets/icons/electricity status.svg";
import FleetStatusIcon from "../assets/icons/Fleet status.svg";
import logo from "../assets/logo.png";
import FenexityEneflex from "../assets/icons/Fenexity-eneflex.svg"

const Sidebar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("Overview");

  const menuItems = [
    /*{ label: FenexityEneflex, icon: logo},*/
    { label: "Overview", icon: OverviewIcon },
    { label: "Charging Stations", icon: ChargingStationIcon },
    { label: "Charging Schedule", icon: ChargingScheduleIcon },
    { label: "Driving Schedule", icon: DrivingScheduleIcon },
    { label: "Parking", icon: ParkingIcon },
    { label: "Electricity Schedule", icon: ElectricityScheduleIcon },
    { label: "Electricity Status", icon: ElectricityStatusIcon },
    { label: "Fleet Status", icon: FleetStatusIcon },
  ];

  return (
    <div className="flex flex-col bg-white bg-opacity-80 w-20 hover:w-80 hover:shadow-[rgba(0,0,15,0.1)_4px_0px_4px_0px] duration-300 h-screen fixed justify-between">
      <div className="flex flex-col space-y-2 mt-4">
        <div className="flex   mb-8 ">
          <img src={logo} className="w-10 ml-5" alt="Main Logo" />
          <img
            src={FenexityEneflex}
            className="ml-6 text-black font-semibold overflow-hidden max-w-[8rem]"
            alt="Fenexity Eneflex"
          />
        </div>
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveButton(item.label)}
            className="flex items-center p-1 rounded hover:ml-3 transition duration-300 relative"
            style={{ transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(7, 142, 205, 0.35)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <img src={item.icon} alt={item.label} className="w-10 mx-4" />
            <span
              className={`whitespace-nowrap overflow-hidden text-black ${activeButton === item.label ? "font-semibold" : ""}`}
            >
              {item.label}
            </span>
            {/* Right side black line for active button */}
            {activeButton === item.label && (
              <div className="absolute right-0 top-0 h-full w-1 bg-black bg-opacity-50 rounded"></div>
            )}
          </button>

        ))}
      </div>
      <div className="text-xs text-center mb-5 text-black">v 0.0.1</div>
    </div>
  );
};

export default Sidebar;
