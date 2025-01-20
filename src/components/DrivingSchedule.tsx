import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import API_ROUTES from "../apiRoutes";
import apiClient from "../api/api";
import { useNavigate } from "react-router-dom";

type Bus = {
  id: string;
  bus_id: string;
  battery: string;
};

type ScheduleEntry = {
  id: string;
  departure_time: string;
  arrival_time: string;
  departure_location: string; // Still accepts IDs for input
  departure_location_name: string; // Display location name
  arrival_location: string; // Still accepts IDs for input
  arrival_location_name: string; // Display location name
  bus: Bus | null;
};

type DrivingScheduleProps = {
  fullPage?: boolean;
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({
  fullPage = false,
}) => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("Departure");

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

  const fetchSchedules = async () => {
    try {
      const response = await axios.get<ScheduleEntry[]>(
        API_ROUTES.GET_DRIVING_SCHEDULES
      );
      console.log(response.data[3].id);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();

    // Optional: Polling every 60 seconds
    const interval = setInterval(fetchSchedules, 60000);
    return () => clearInterval(interval);
  }, []);

  const filterSchedule = () => {
    if (!time) return schedules;
    const startHours = time.getHours();
    const startMinutes = time.getMinutes();

    return schedules.filter((entry) => {
      const [entryHours, entryMinutes] = entry.departure_time
        .split(":")
        .map(Number);
      return (
        entryHours > startHours ||
        (entryHours === startHours && entryMinutes >= startMinutes)
      );
    });
  };

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div
      className={`bg-secondaryColor bg-opacity-80 flex flex-col border border-borderColor shadow-md rounded-3xl p-4 overflow-hidden ${
        fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-2 text-primaryColor">
          Driving Schedule
        </h2>
        {fullPage && (
          <button
            onClick={handlePanelToggle}
            className="bg-componentsColor border border-borderColor text-black px-4 py-2 rounded-lg hover:bg-primaryColor hover:text-white transition-all font-semibold"
          >
            Select Date & Time
          </button>
        )}
      </div>

      {/* Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 relative">
            <button
              onClick={handlePanelToggle}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-primaryColor text-center">
              Select Date & Time
            </h2>
            <div className="flex space-x-2 my-4 justify-center">
              <button
                onClick={() => setActiveButton("Departure")}
                className={`py-1 px-3 rounded-lg text-sm font-semibold transition ${
                  activeButton === "Departure"
                    ? "bg-primaryColor text-white"
                    : "bg-componentsColor border border-borderColor text-black hover:bg-primaryColor hover:text-white"
                }`}
              >
                Departure
              </button>
              <button
                onClick={() => setActiveButton("Arrival")}
                className={`py-1 px-3 rounded-lg text-sm font-semibold transition ${
                  activeButton === "Arrival"
                    ? "bg-primaryColor text-white"
                    : "bg-componentsColor border border-borderColor text-black hover:bg-primaryColor hover:text-white"
                }`}
              >
                Arrival
              </button>
            </div>
            <div className="mb-4 mx-6">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                className="custom-calendar"
              />
            </div>
            <button
              onClick={handlePanelToggle}
              className="w-60 py-3 mx-6 rounded-lg font-semibold border border-borderColor bg-primaryColor text-white text-lg"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Schedule */}
      <div
        className={`flex flex-col overflow-y-auto ${
          fullPage ? "h-4/5" : "h-60"
        } custom-scrollbar`}
      >
        {schedules.map(
          (
            entry //schedules need to be changed with filterschedule once fixed
          ) => (
            <div key={entry.id} className="border-b py-2">
              <p>
                <strong>ID:</strong> {entry.id}
              </p>
              <p>
                <strong>Departure:</strong> {entry.departure_location_name} at{" "}
                {new Date(entry.departure_time).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              <p>
                <strong>Arrival:</strong> {entry.arrival_location_name} at{" "}
                {new Date(entry.arrival_time).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              <p>
                <strong>Bus:</strong>{" "}
                {entry.bus
                  ? `ID: ${entry.bus.id}, Battery: ${entry.bus.battery}`
                  : "N/A"}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DrivingSchedule;
