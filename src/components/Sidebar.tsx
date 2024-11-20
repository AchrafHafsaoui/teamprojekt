import React, { useState } from "react";
import { Link } from "react-router-dom";
import OverviewIcon from "../assets/icons/overview.svg";
import ChargingStationIcon from "../assets/icons/charging stations.svg";
import ChargingScheduleIcon from "../assets/icons/charging schedule.svg";
import DrivingScheduleIcon from "../assets/icons/driving schedule.svg";
import ParkingIcon from "../assets/icons/parking.svg";
import FleetStatusIcon from "../assets/icons/Fleet status.svg";
import logo from "../assets/logo.png";
import Icon from "../assets/icons/Icon.svg";
import FenexityEneflex from "../assets/icons/Fenexity-eneflex.svg";

const Sidebar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("Overview");

  const menuItems = [
    { label: "Overview", icon: OverviewIcon, path: "/" },
    { label: "Fleet Status", icon: FleetStatusIcon, path: "/fleet-status" },
    {
      label: "Charging Stations",
      icon: ChargingStationIcon,
      path: "/charging-stations",
    },
    {
      label: "Driving Schedule",
      icon: DrivingScheduleIcon,
      path: "/driving-schedule",
    },
    {
      label: "Charging Schedule",
      icon: ChargingScheduleIcon,
      path: "/charging-schedule",
    },
    { label: "Parking", icon: ParkingIcon, path: "/parking" },
  ];

  const bottomMenuItems = [{ label: "Account", icon: Icon, path: "/Icon" }];

  return (
    <div className="flex flex-col bg-opacity-80 w-20 hover:w-80 hover:shadow-[rgba(0,0,15,0.1)_4px_0px_4px_0px] duration-300 h-screen fixed justify-between bg-[#FFFFFF] group z-50">
      {/* Top menu part */}
      <div className="flex flex-col space-y-5 mt-4 flex-grow">
        <div className="flex mb-8">
          <img src={logo} className="w-10 ml-5" alt="Main Logo" />
          <img
            src={FenexityEneflex}
            className="ml-4 opacity-0 max-w-[8rem] group-hover:opacity-100 group-hover:visible transition-opacity duration-200"
            alt="Fenexity Eneflex"
          />
        </div>
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            onClick={() => setActiveButton(item.label)}
            className="flex items-center p-1 rounded hover:ml-3 transition duration-300 relative"
            style={{ transition: "background-color 0.3s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(7, 142, 205, 0.35)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={item.icon} alt={item.label} className="w-12 ml-2" />
            <span
              className={`whitespace-nowrap overflow-hidden ml-4 ${
                activeButton === item.label
                  ? "font-semibold text-[rgb(7, 142, 205)]"
                  : "text-gray-800"
              } text-lg tracking-wide transition-all`}
            >
              {item.label}
            </span>
            {activeButton === item.label && (
              <div className="absolute right-0 top-0 h-full w-1 bg-black bg-opacity-50 rounded"></div>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom menu part */}
      <div className="flex flex-col mb-5">
        {bottomMenuItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            onClick={() => setActiveButton(item.label)}
            className="flex items-center p-1 rounded hover:ml-2 transition duration-300 relative"
            style={{ transition: "background-color 0.3s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(7, 142, 205, 0.35)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img src={item.icon} alt={item.label} className="w-8 ml-4 mr-2" />
            <span
              className={`whitespace-nowrap overflow-hidden ml-4 ${
                activeButton === item.label
                  ? "font-semibold text-[rgb(7, 142, 205)]"
                  : "text-gray-800"
              } text-lg tracking-wide transition-all`}
            >
              {item.label}
            </span>
            {activeButton === item.label && (
              <div className="absolute right-0 top-0 h-full w-1 bg-black bg-opacity-50 rounded"></div>
            )}
          </Link>
        ))}
      </div>

      {/* Version */}
      <div className="text-xs text-center mb-5 text-black">v 0.0.1</div>
    </div>
  );
};

export default Sidebar;
