import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import API_ROUTES from "../apiRoutes";

type Bus = {
  id: string;
  bus_id: string;
  battery: string;
};

type ScheduleEntry = {
  id: string;
  departure_time: string;
  arrival_time: string;
  departure_location: string;
  departure_location_name: string;
  arrival_location: string;
  arrival_location_name: string;
  bus: Bus | null;
};

type DrivingScheduleProps = {
  fullPage?: boolean;
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({ fullPage = false }) => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date | null>(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState<Date | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get<ScheduleEntry[]>(API_ROUTES.GET_DRIVING_SCHEDULES);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
    const interval = setInterval(fetchSchedules, 60000);
    return () => clearInterval(interval);
  }, []);

  const filterSchedule = () => {
    if (!selectedDepartureDate && !selectedArrivalDate) {
      return schedules; // If no filters are applied, return all schedules
    }

    return schedules.filter((entry) => {
      const departureDate = new Date(entry.departure_time);
      const arrivalDate = new Date(entry.arrival_time);

      const matchesDepartureFilter =
        !selectedDepartureDate || departureDate >= selectedDepartureDate;
      const matchesArrivalFilter =
        !selectedArrivalDate || arrivalDate <= selectedArrivalDate;

      return matchesDepartureFilter && matchesArrivalFilter;
    });
  };

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div
      className={`bg-secondaryColor bg-opacity-80 flex flex-col border border-borderColor shadow-md rounded-3xl p-4 ${
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
            <div className="mb-4 mx-6">
              <p className="font-semibold mb-2">Departure Time:</p>
              <DatePicker
                selected={selectedDepartureDate}
                onChange={(date) => setSelectedDepartureDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select departure time"
                className="custom-calendar-input border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4 mx-6">
              <p className="font-semibold mb-2">Arrival Time:</p>
              <DatePicker
                selected={selectedArrivalDate}
                onChange={(date) => setSelectedArrivalDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select arrival time"
                className="custom-calendar-input border border-gray-300 rounded-lg px-3 py-2 w-full"
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
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto ${fullPage ? "h-[calc(100vh-8rem)]" : "h-72"} custom-scrollbar`}>
        {filterSchedule().map((entry) => (
          <div
            key={entry.id}
            className="schedule-card bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            {/* Departure Section */}
            <div>
              <p className="text-lg font-bold text-primaryColor">Departure</p>
              <p className="text-md font-semibold">{entry.departure_location_name}</p>
              <p className="text-sm text-gray-600">
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
            </div>

            {/* Arrival Section */}
            <div className="mt-auto">
              <p className="text-lg font-bold text-primaryColor">Arrival</p>
              <p className="text-md font-semibold">{entry.arrival_location_name}</p>
              <p className="text-sm text-gray-600">
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
            </div>

            {/* Bus Details */}
            <hr className="my-2" />
            <p className="text-sm text-gray-500">
              <strong>Bus:</strong>{" "}
              {entry.bus ? (
                <>
                  ID: {entry.bus.bus_id},{" "}
                  <span
                    className={`font-bold ${
                      parseFloat(entry.bus.battery) >= 50 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Battery: {entry.bus.battery}%
                  </span>
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrivingSchedule;
