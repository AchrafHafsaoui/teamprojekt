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

const App: React.FC = () => {
  const [hideHello, setHideHello] = useState(false); // State for managing Hello visibility

  return (
    <Router>
      <div className="flex flex-col min-h-screen h-full w-full">
        {/* Background styling */}
        <div
          className="fixed min-h-screen min-w-full"
          style={{
            backgroundImage: `url('/src/assets/blue_background_abstract.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay
            backgroundBlendMode: "overlay", // Overlay to soften the image
          }}
        />
        {/* Content wrapper with higher z-index to sit above the background */}
        <div className="z-10 flex flex-grow h-full">
          <Sidebar />
          <div className="flex-grow ml-40 mt-10 mb-10 mr-10">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route
                path="/charging-stations"
                element={<ChargingStations fullHeight={true} />}
              />
              <Route path="/driving-schedule" element={<DrivingSchedule />} />
              <Route path="/parking" element={<Parking />} />
              <Route
                path="/electricity-schedule"
                element={<ElectricityCost setHideHello={setHideHello} />} // Pass setHideHello prop
              />
              <Route
                path="/fleet-status"
                element={<FleetStatus showAllColumns={true} />}
              />
              <Route path="/charging-schedule" element={<ChargingSchedule />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
