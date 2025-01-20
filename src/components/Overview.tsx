import React, { useEffect } from "react";
import FleetStatus from "./FleetStatus";
import ElectricityCost from "./ElectricityCost";
import EnergyConsumption from "./EnergyConsumption";
import DrivingSchedule from "./DrivingSchedule";
import ParkingStatus from "./ParkingStatus";
import ChargingSchedule from "./ChargingStationStatus";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";
import API_ROUTES from "../apiRoutes";

const Overview: React.FC = () => {
  const navigate = useNavigate();
  type AuthReq = {
    message: string;
  };
  const checkAuth = async () => {
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 20,
      });
      console.log(res.data);
      if (res.data.message != "Authorized access") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Is auth error :", error);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("access token") ||
      localStorage.getItem("refresh token")
    ) {
      checkAuth();
    } else navigate("/login", { replace: true });
  }, []);

  return (
    <div className="grid h-full w-full gap-10 overflow-hidden bg-cover bg-center pl-32 pt-12 pr-12">
      {/* Define 3 rows: Upper, Middle, and Parking Status */}
      <div className="grid grid-rows-[minmax(300px,auto)_minmax(300px,auto)_1fr] gap-5">
        {/* Upper Section with 3 columns */}
        <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 p-4 lg:h-[300px]">
          <div className="rounded-lg overflow-hidden">
            <ElectricityCost />
          </div>
          <div className="rounded-lg overflow-hidden">
            <DrivingSchedule fullPage={false} />
          </div>
          <div className="rounded-lg overflow-hidden">
            <EnergyConsumption />
          </div>
        </div>

        {/* Middle Section with 2 columns */}
        <div className="grid gap-10 lg:grid-cols-2 sm:grid-cols-1 p-4">
          <div className="rounded-lg overflow-hidden">
            <FleetStatus fullPage={false} />
          </div>
          <div className="rounded-lg overflow-hidden">
            <ChargingSchedule fullPage={false} />
          </div>
        </div>

        {/* Parking Status Section occupying the remaining row */}
        <div className="rounded-lg overflow-hidden p-4">
          <ParkingStatus fullPage={false} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
