import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import FleetStatus from "./FleetStatus";
import ElectricityCost from "./ElectricityCost";
import EnergyConsumption from "./EnergyConsumption";
import ParkingStatus from "./ParkingStatus";
import ChargingSchedule from "./ChargingStationStatus";
import { useNavigate } from "react-router-dom";
import apiClient, { updateContextValues } from "../api/api";
import API_ROUTES from "../apiRoutes";
import axios from "axios";

type ScheduleEntry = {
  id: string;
  departure_time: string;
  arrival_time: string;
  departure_location_name: string;
  arrival_location_name: string;
  bus_details: {
    bus_id: string;
  } | null;
};

const Overview: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const navigate = useNavigate();

  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  const { setAuth, auth } = useAuth();

  const fetchSchedules = async () => {
    try {
      const response = await axios.get<ScheduleEntry[]>(
        API_ROUTES.GET_DRIVING_SCHEDULES
      );
      setSchedules(response.data.slice(0, 3)); // Show top 3 schedules
    } catch (error) {
      console.error("Error fetching driving schedules:", error);
    }
  };

  const checkAuth = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<{ message: string }>(
        API_ROUTES.IS_AUTH,
        { role: 20 }
      );
      if (res.data.message !== "Authorized access") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Is auth error:", error);
    }
  };

  useEffect(() => {
    if (auth.access !== null || localStorage.getItem("refresh token")) {
      checkAuth();
      fetchSchedules();
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="grid h-full w-full gap-10 overflow-hidden bg-cover bg-center pl-32 pt-12 pr-12">
      <div className="grid grid-rows-[minmax(300px,auto)_minmax(300px,auto)_1fr] gap-5">
        {/* Upper Section */}
        <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 p-4 lg:h-[300px]">
          <div className="rounded-lg overflow-hidden">
            <ElectricityCost />
          </div>
          <div className="rounded-lg overflow-hidden bg-secondaryColor shadow-md p-4">
            <h3 className="text-lg font-bold text-primaryColor mb-2">
              Driving Schedule
            </h3>
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-primaryColor text-white">
                  <th className="px-4 py-2">Bus ID</th>
                  <th className="px-4 py-2">Departure</th>
                  <th className="px-4 py-2">Arrival</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length > 0 ? (
                  schedules.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 font-semibold">
                        {entry.bus_details?.bus_id || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <p className="font-semibold">
                            {entry.departure_location_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(entry.departure_time).toLocaleString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <p className="font-semibold">
                            {entry.arrival_location_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(entry.arrival_time).toLocaleString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-2 text-center" colSpan={3}>
                      No schedules available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg overflow-hidden">
            <EnergyConsumption />
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid gap-10 lg:grid-cols-2 sm:grid-cols-1 p-4">
          <div className="rounded-lg overflow-hidden">
            <FleetStatus fullPage={false} />
          </div>
          <div className="rounded-lg overflow-hidden">
            <ChargingSchedule fullPage={false} />
          </div>
        </div>

        {/* Parking Status */}
        <div className="rounded-lg overflow-hidden p-4">
          <ParkingStatus fullPage={false} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
