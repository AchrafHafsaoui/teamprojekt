import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OverviewIcon from "../assets/icons/overview.svg";
import ChargingStationIcon from "../assets/icons/chargingstation.svg";
import DrivingScheduleIcon from "../assets/icons/schedule.svg";
import ParkingIcon from "../assets/icons/parking.svg";
import FleetStatusIcon from "../assets/icons/Fleet.svg";
import Logo from "../assets/logo.png";
import PowerIcon from "../assets/icons/power.svg";
import ControlPanelIcon from "../assets/icons/ControlPanelIcon.svg";
import FenexityEneflex from "../assets/icons/Fenexity-eneflex.svg";
import AuthContext from "../context/AuthProvider";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("Overview");

  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  const { setAuth } = useAuth();

  const menuItems = [
    { label: "Overview", icon: OverviewIcon, path: "/overview" },
    { label: "Fleet Status", icon: FleetStatusIcon, path: "/fleet-status" },
    {
      label: "Charging Stations",
      icon: ChargingStationIcon,
      path: "/charging-schedule",
    },
    {
      label: "Driving Schedule",
      icon: DrivingScheduleIcon,
      path: "/driving-schedule",
    },
    { label: "Parking", icon: ParkingIcon, path: "/parking" },
  ];

  return (
    <div className="flex flex-col bg-opacity-80 w-20 hover:w-80 hover:shadow-[rgba(0,0,15,0.1)_4px_0px_4px_0px] duration-300 h-screen fixed justify-between bg-secondaryColor group z-10">
      {/* Top menu part */}
      <div className="flex flex-col space-y-5 mt-4 flex-grow">
        <div className="flex mb-8">
          <img src={Logo} className="w-10 ml-5" alt="Main Logo" />
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
            className="flex items-center p-1 rounded hover:pl-3 transition duration-300 relative"
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
              className={`whitespace-nowrap overflow-hidden ml-4  ${
                activeButton === item.label
                  ? "font-bold text-[rgb(7, 142, 205)]"
                  : "font-semibold text-gray-800"
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
      <div className="flex flex-col mb-5 space-y-5">
        {/* Control Panel button with a link */}
        <Link
          to="/control-panel"
          onClick={() => setActiveButton("Control Panel")}
          className="flex items-center p-1 rounded hover:pl-3 transition duration-300 relative"
          style={{ transition: "background-color 0.3s" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(7, 142, 205, 0.35)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <img
            src={ControlPanelIcon}
            alt="Control Panel"
            className="w-8 ml-4 mr-2"
          />
          <span
            className={`whitespace-nowrap overflow-hidden ml-4 ${
              activeButton === "Control Panel"
                ? "font-bold text-[rgb(7, 142, 205)]"
                : "font-semibold text-gray-800"
            } text-lg tracking-wide transition-all`}
          >
            Control Panel
          </span>
          {activeButton === "Control Panel" && (
            <div className="absolute right-0 top-0 h-full w-1 bg-black bg-opacity-50 rounded" />
          )}
        </Link>

        {/* Logout button without a link */}
        <button
          onClick={() => {
            localStorage.removeItem("refresh token");
            setAuth({ access: null });
            navigate("/login", { replace: true });
          }} // Handle logout
          className="flex items-center p-1 rounded hover:pl-3 transition duration-300 relative"
          style={{ transition: "background-color 0.3s" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(7, 142, 205, 0.35)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <img src={PowerIcon} alt="Logout" className="w-8 ml-4 mr-2" />
          <span className="whitespace-nowrap overflow-hidden ml-4 text-lg font-semibold text-gray-800">
            Logout
          </span>
        </button>
      </div>

      {/* Version */}
      <div className="text-xs text-center mb-5 text-black">v 0.0.2</div>
    </div>
  );
};

export default Sidebar;
