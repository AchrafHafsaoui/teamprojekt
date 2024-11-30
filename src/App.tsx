import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Dashboard/Overview";
import ChargingStations from "./components/Dashboard/ChargingStationStatus";
import DrivingSchedule from "./components/Dashboard/DrivingSchedule";
import Parking from "./components/Dashboard/ParkingStatus";
import ElectricityCost from "./components/Dashboard/ElectricityCost";
import FleetStatus from "./components/Dashboard/FleetStatus";
import ChargingSchedule from "./components/Dashboard/ChargingSchedule";
import ControlPanel from "./components/Dashboard/ControlPanel";
import Logo from "./assets/logo.png";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State for login status
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  const handleLogin = () => {
    // Simple validation for demonstration
    if (email === "hello" && password === "hello") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <Router>
      <div className="flex min-h-screen h-full w-full">
        {/* Black overlay with login inputs */}
        {!isLoggedIn && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center">
            {/* Login form container */}
            <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl w-96">
              <div className="flex justify-center mb-6">
                {/* Logo with zoom effect on load */}
                <img
                  src={Logo}
                  className="w-32 mb-4 transition-transform transform hover:scale-110"
                  alt="Main Logo"
                />
              </div>
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="w-full py-3 px-4 bg-primaryColor text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <a href="/forgot-password" className="text-primaryColor hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <Sidebar setIsLoggedIn={setIsLoggedIn} />

        {/* Background styling */}
        <div
          className="fixed min-h-screen min-w-full animated-bg"
          style={{
            background: `lurl('/src/assets/blue_background_abstract.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />

        {/* Content wrapper */}
        {isLoggedIn && (
          <div className="relative flex-grow h-full ">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route
                path="/charging-stations"
                element={<ChargingStations fullPage={true} />}
              />
              <Route
                path="/driving-schedule"
                element={<DrivingSchedule fullPage={true} />}
              />
              <Route path="/parking" element={<Parking fullPage={true} />} />
              <Route path="/electricity-schedule" element={<ElectricityCost />} />
              <Route
                path="/fleet-status"
                element={<FleetStatus fullPage={true} />}
              />
              <Route path="/charging-schedule" element={<ChargingSchedule />} />
              <Route path="/control-panel" element={<ControlPanel />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
