import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import API_ROUTES from "../apiRoutes";
import apiClient, { updateContextValues } from "../api/api";
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
  departure_location: string;
  departure_location_name: string;
  arrival_location: string;
  arrival_location_name: string;
  bus_details: Bus | null;
};

type DrivingScheduleProps = {
  fullPage?: boolean;
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({
  fullPage = false,
}) => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedDepartureDate, setSelectedDepartureDate] =
    useState<Date | null>(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState<Date | null>(
    null
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeUser, setActiveUser] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 8;

  const navigate = useNavigate();
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  const { setAuth, auth } = useAuth();

  type AuthReq = {
    message: string;
  };

  const checkAuth = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 20,
      });
      if (res.data.message !== "Authorized access") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Is auth error:", error);
    }
  };

  const checkActiveUser = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 50,
      });

      if (res.data.message === "Authorized access") {
        setActiveUser(true);
      } else setActiveUser(false);
    } catch (error) {
      console.error("Is auth error :", error);
    }
  };

  useEffect(() => {
    if (auth.access !== null || localStorage.getItem("refresh token")) {
      checkAuth();
      checkActiveUser();
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get<ScheduleEntry[]>(
        API_ROUTES.GET_DRIVING_SCHEDULES
      );
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

  const filterAndSortSchedules = () => {
    let filtered = [...schedules];

    // Filter schedules based on selected dates
    if (selectedDepartureDate) {
      filtered = filtered.filter(
        (entry) => new Date(entry.departure_time) >= selectedDepartureDate
      );
    }
    if (selectedArrivalDate) {
      filtered = filtered.filter(
        (entry) => new Date(entry.arrival_time) <= selectedArrivalDate
      );
    }

    // Sort schedules by departure time
    filtered.sort((a, b) => {
      const dateA = new Date(a.departure_time).getTime();
      const dateB = new Date(b.departure_time).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  };

  const sortedAndFilteredSchedules = filterAndSortSchedules();

  const paginatedSchedules = sortedAndFilteredSchedules.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(
    sortedAndFilteredSchedules.length / ITEMS_PER_PAGE
  );

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleReset = () => {
    setSelectedDepartureDate(null);
    setSelectedArrivalDate(null);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
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
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSortOrder}
              className="bg-componentsColor border border-borderColor text-black px-4 py-2 rounded-lg hover:bg-primaryColor hover:text-white transition-all font-semibold"
            >
              Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <button
              onClick={handlePanelToggle}
              className="bg-componentsColor border border-borderColor text-black px-4 py-2 rounded-lg hover:bg-primaryColor hover:text-white transition-all font-semibold"
            >
              Select Date & Time
            </button>
          </div>
        )}
      </div>

      {isPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 relative w-[24rem]">
            <button
              onClick={handlePanelToggle}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-primaryColor text-center mb-4">
              Select Date & Time
            </h2>
            <div className="space-y-4 mx-auto text-center">
              <div>
                <p className="font-semibold text-gray-700 mb-2">
                  Departure Time:
                </p>
                <DatePicker
                  selected={selectedDepartureDate}
                  onChange={(date) => setSelectedDepartureDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Select departure time"
                  className="custom-calendar-input border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">
                  Arrival Time:
                </p>
                <DatePicker
                  selected={selectedArrivalDate}
                  onChange={(date) => setSelectedArrivalDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Select arrival time"
                  className="custom-calendar-input border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 mx-6 gap-2">
              <button
                onClick={handleReset}
                className="w-28 py-3 rounded-lg font-semibold border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Reset
              </button>
              <button
                onClick={handlePanelToggle}
                className="w-28 py-3 rounded-lg font-semibold border border-primaryColor bg-primaryColor text-white hover:bg-blue-600 transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
        style={{ minHeight: "500px" }}
      >
        {paginatedSchedules.map((entry) => (
          <div
            key={entry.id}
            className="schedule-card bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-all"
            style={{ minHeight: "240px", height: "240px" }}
          >
            <div className="mb-4">
              <p className="text-lg font-bold text-primaryColor mb-1">
                Departure
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {entry.departure_location_name}
              </p>
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
            <div className="mb-4">
              <p className="text-lg font-bold text-primaryColor mb-1">
                Arrival
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {entry.arrival_location_name}
              </p>
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
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                <strong>Bus ID:</strong> {entry.bus_details?.bus_id || "N/A"}
              </p>
              <p
                className={`font-semibold ${
                  entry.bus_details &&
                  parseFloat(entry.bus_details.battery) >= 50
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {entry.bus_details
                  ? `Battery: ${entry.bus_details.battery}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

{/* Pagination Buttons */}
<div className="w-full h-[10%] flex justify-end items-center mt-auto">
        <div className={`space-x-3 ${fullPage ? "text-base" : "text-xs"}`}>
          <button
            className={`px-4 py-2 bg-componentsColor border border-borderColor rounded-lg hover:bg-primaryColor hover:text-white ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            {currentPage} / {totalPages}
          </span>
          <button
            className={`px-4 py-2 bg-componentsColor border border-borderColor rounded-lg hover:bg-primaryColor hover:text-white ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchedule;