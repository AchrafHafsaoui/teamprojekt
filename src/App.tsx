import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import ChargingStations from "./components/ChargingStationStatus";
import DrivingSchedule from "./components/DrivingSchedule";
import Parking from "./components/ParkingStatus";
import ElectricityCost from "./components/ElectricityCost";
import FleetStatus from "./components/FleetStatus";
import ChargingSchedule from "./components/ChargingSchedule";
import ControlPanel from "./components/ControlPanel";
import LoginPage from "./components/LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen h-full w-full">
        <Sidebar />

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

        <div className="relative flex-grow h-full ">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/overview" element={<Overview />} />
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
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
