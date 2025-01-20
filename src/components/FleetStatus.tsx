import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import API_ROUTES from "../apiRoutes";
import apiClient from "../api/api";
import { useNavigate } from "react-router-dom";

// Add a new bus
const addBus = async () => {
  const newBus = {
    vehicle_type: "Electric",
    bus_id: "BUS124",
    battery: 90,
    charging_start: null,
    status: "In Depot",
    charging_location: null,
    CAP: "150 kWh",
    ENE: "Medium",
    vehicle_age: 3,
  };
  const response = await axios.post(API_ROUTES.ADD_BUS, newBus);
  console.log(response.data);
};

// Get a specific bus
const getBusById = async (id: string) => {
  const response = await axios.get(API_ROUTES.GET_BUS(id));
  console.log(response.data);
};

// Update a specific bus
const updateBus = async (id: string, updatedBusData: object) => {
  const response = await axios.put(API_ROUTES.UPDATE_BUS(id), updatedBusData);
  console.log(response.data);
};

// Delete a specific bus
const deleteBus = async (id: string) => {
  const response = await axios.delete(API_ROUTES.DELETE_BUS(id));
  console.log(response.data);
};

type BusData = {
  bus_id: string;
  status: "In Depot" | "Maintenance" | "On Route";
  battery: number;
  charging_point: string | null; // Combined charging station and point (e.g., A1, B23, A17) or null if not charging
  session_start: string | null; // Charging start time or null if not charging
  CAP: number;
  ENE: number;
};

type FleetStatusProps = {
  fullPage?: boolean; // Controls whether to show all columns
};
const FleetStatus: React.FC<FleetStatusProps> = ({ fullPage = true }) => {
  const [buses, setBuses] = useState<BusData[]>([]);
  const fetchBuses = async () => {
    try {
      const response = await axios.get<BusData[]>(API_ROUTES.GET_BUSES); // Fetch from API
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchBuses();

    // Optional: Polling to refresh data every 10 seconds
    const interval = setInterval(fetchBuses, 60000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "In Depot" | "Maintenance" | "On Route"
  >("all");
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    Array(buses.length).fill(0)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = fullPage ? 6 : 3;

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

  // sorting

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const filteredVehicles = buses.filter((vehicle) => {
    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;
    const matchesSearch =
      !fullPage || vehicle.bus_id.includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate total pages and current buses
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const currentBuses = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    buses.forEach((vehicle, index) => {
      let currentBattery = 0;
      const interval = setInterval(() => {
        if (currentBattery < vehicle.battery) {
          currentBattery += 1;
          setAnimatedValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = currentBattery;
            return newValues;
          });
        } else {
          clearInterval(interval);
        }
      }, 15);
    });
  }, [buses]);

  const [expandedRow, setExpandedRow] = useState<string | null>(null); // Track the expanded row

  const handleRowClick = (bus_id: string) => {
    // Toggle expanded state
    setExpandedRow((prev) => (prev === bus_id ? null : bus_id));
  };

  return (
    <div
      className={`bg-secondaryColor bg-opacity-80 flex-col border border-borderColor shadow-md rounded-3xl p-4 overflow-hidden ${
        fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
      }`}
    >
      <div className="flex items-center w-full h-[10%] justify-between">
        <h2 className="font-bold lg:text-3xl md:text-2xl sm:text-2xl text-primaryColor mb-2">
          Fleet Status
        </h2>
        {fullPage && (
          <input
            type="text"
            placeholder="Search by Bus ID"
            className="max-w-[50%] px-3 py-2 w-2/3 ml-10 bg-componentsColor border border-borderColor rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent text-base md:text-sm sm:text-xs"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
        <div className="flex space-x-3">
          {["all", "In Depot", "Maintenance", "On Route"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status as typeof filterStatus);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 text-xs rounded-lg border font-semibold border-borderColor ${
                filterStatus === status
                  ? "bg-primaryColor text-white"
                  : "border border-borderColor text-black bg-componentsColor hover:bg-primaryColor hover:text-white"
              } transition-colors 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none`}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[80%]">
        {/* Header Row */}
        <div
          className={`grid gap-4 font-bold h-[10%] text-gray-600 text-center top-0 sticky ${
            fullPage ? "grid-cols-7 text-base" : "grid-cols-5 text-sm"
          }`}
        >
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Plate Number
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Status
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Charging Point
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Session Start
          </div>
          {fullPage && (
            <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
              CAP
            </div>
          )}
          {fullPage && (
            <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
              ENE
            </div>
          )}
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Battery
          </div>
        </div>

        {/* Data Rows */}
        <div className={`overflow-y-auto custom-scrollbar h-[90%]`}>
          {currentBuses.map((vehicle, index) => (
            <div
              key={vehicle.bus_id}
              onClick={() => {
                if (fullPage) handleRowClick(vehicle.bus_id); // Only allow expansion if fullPage is true
              }}
              className={`grid gap-4 items-center pb-3 rounded-2xl ${
                fullPage
                  ? "grid-cols-7 cursor-pointer"
                  : "grid-cols-5 h-[33.3%]"
              } text-gray-800 shadow-sm font-semibold ${
                expandedRow === vehicle.bus_id ? "bg-blue-100" : ""
              }`}
            >
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.bus_id}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.status}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.charging_point || "N/A"}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.session_start || "N/A"}
              </span>
              {fullPage && (
                <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                  {vehicle.CAP}
                </span>
              )}
              {fullPage && (
                <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                  {vehicle.ENE}
                </span>
              )}
              <div
                className={`relative my-2 mx-auto ${
                  fullPage ? "w-[30%]" : "w-[50%]"
                }`}
              >
                <CircularProgressbar
                  value={animatedValues[index]}
                  maxValue={100}
                  text={`${animatedValues[index]}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    pathColor: "rgba(7, 142, 205, 0.8)",
                    textColor: "#000",
                    trailColor: "#d6d6d6",
                    textSize:
                      "2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none",
                    strokeLinecap: "round",
                  })}
                />
                {vehicle.session_start && (
                  <div
                    className="absolute inset-0 flex items-center justify-center animate-ping"
                    style={{ animationDuration: "1.5s" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full opacity-50"
                      style={{ backgroundColor: "rgb(7, 142, 205)" }}
                    ></div>
                  </div>
                )}
                {vehicle.status == "Maintenance" && (
                  <div className="absolute bottom-1 text-center font-bold w-5 ">
                    <svg
                      className="w-[1.5rem]"
                      fill="#000000"
                      viewBox="0 0 512 512"
                    >
                      <path d="M117.333333,48 C182.134744,48 234.666667,100.531923 234.666667,165.333333 C234.666667,177.516512 232.809822,189.266001 229.363697,200.314237 L346.710217,317.661885 C367.98629,338.937958 367.98629,373.433288 346.710217,394.709361 C325.434144,415.985434 290.938814,415.985434 269.662741,394.709361 L152.315234,277.363386 C141.266709,280.80971 129.516879,282.666667 117.333333,282.666667 C52.5319227,282.666667 7.10542736e-15,230.134744 7.10542736e-15,165.333333 C7.10542736e-15,152.827953 1.95635722,140.779505 5.57971243,129.477348 L61.0818825,184.888889 L111.319797,168.156815 C112.394454,166.856793 113.540203,165.595781 114.757044,164.37894 L116.379797,162.756188 C117.593198,161.542787 118.85052,160.400077 120.146646,159.328057 L136.888889,109.149054 L81.3212183,53.6298873 C92.6685218,49.9744211 104.770352,48 117.333333,48 Z M384,90.6666667 L384,218.666667 L341.333333,218.666667 L341.333333,90.6666667 L384,90.6666667 Z M362.666667,1.42108547e-14 C377.39426,1.42108547e-14 389.333333,11.9390733 389.333333,26.6666667 C389.333333,41.39426 377.39426,53.3333333 362.666667,53.3333333 C347.939073,53.3333333 336,41.39426 336,26.6666667 C336,11.9390733 347.939073,1.42108547e-14 362.666667,1.42108547e-14 Z" />
                    </svg>
                  </div>
                )}
              </div>
              {expandedRow === vehicle.bus_id && (
                <div className="col-span-full text-black pl-14 mb-4 rounded-lg">
                  <p>Additional Details for {vehicle.bus_id}</p>
                  <p>Battery: {vehicle.battery}%</p>
                  <p>Charging Start: {vehicle.session_start || "N/A"}</p>
                  <p>Charging Location: {vehicle.charging_point || "N/A"}</p>
                  <p>CAP: {vehicle.CAP}</p>
                  <p>ENE: {vehicle.ENE}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[10%] flex justify-end items-center">
        {/* Pagination Controls */}
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

export default FleetStatus;