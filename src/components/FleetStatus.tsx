import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import API_ROUTES from "../apiRoutes";
import apiClient, { updateContextValues } from "../api/api";
import { useNavigate } from "react-router-dom";

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
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [newBus, setNewBus] = useState({
    bus_id: "",
    status: "In Depot",
    battery: 100,
    charging_point: null,
    session_start: null,
    CAP: 150,
    ENE: 100,
  });
  const handleAddBus = async () => {
    if (!newBus.bus_id) {
      alert("Bus ID is required!");
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.ADD_BUS, newBus);
      console.log("New bus added:", response.data);

      fetchBuses();  // Refresh the bus list
      setIsAddBusOpen(false); // Close modal
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };
  const handleDeleteBus = async (bus_id: string) => {
    if (!window.confirm(`Are you sure you want to delete Bus ${bus_id}?`)) return;
    try {
      await axios.delete(API_ROUTES.DELETE_BUS(bus_id));
      fetchBuses();
      console.log(`Bus ${bus_id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting bus:", error);
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
  const [activeUser, setActiveUser] = useState<boolean>(false);

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
      console.log(res.data);
      if (res.data.message != "Authorized access") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Is auth error :", error);
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

  }

  return (
    <div
      className={`bg-secondaryColor bg-opacity-80 flex-col border border-borderColor shadow-md rounded-3xl p-4 overflow-hidden ${fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
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
              className={`px-3 py-2 text-xs rounded-lg border font-semibold border-borderColor ${filterStatus === status
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
          className={`grid gap-4 font-bold h-[10%] text-gray-600 text-center top-0 sticky ${fullPage
              ? activeUser
                ? "grid-cols-8 text-base" : "grid-cols-7 text-sm"
              : "grid-cols-5 text-sm"
            }`}
        >
          {fullPage && activeUser && (
            <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
              {/* Empty Column for Delete Button */}
            </div>
          )}
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
              className={`grid gap-4 items-center pb-3 rounded-2xl ${fullPage
                  ? activeUser
                    ? "grid-cols-8 text-base" : "grid-cols-7 text-sm"
                  : "grid-cols-5 text-sm"
                } text-gray-800 shadow-sm font-semibold ${expandedRow === vehicle.bus_id ? "bg-blue-100" : ""
                }`}
            >
              {fullPage && activeUser && (
                <div className="flex items-center justify-center ">
                  <button
                    onClick={() => handleDeleteBus(vehicle.bus_id)}
                    className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                      <path d="M10 11L10 17"></path>
                      <path d="M14 11L14 17"></path>
                    </svg>
                  </button>
                </div>
              )}
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
                className={`relative my-2 mx-auto ${fullPage ? "w-[30%]" : "w-[50%]"
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
              <div className="text-center">
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
      {isAddBusOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Add New Bus</h2>

            <label className="block mb-2">Bus ID:</label>
            <input
              type="text"
              value={newBus.bus_id}
              onChange={(e) => setNewBus({ ...newBus, bus_id: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded"
            />

            <label className="block mt-4 mb-2">Status:</label>
            <select
              value={newBus.status}
              onChange={(e) => setNewBus({ ...newBus, status: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="In Depot">In Depot</option>
              <option value="Maintenance">Maintenance</option>
              <option value="On Route">On Route</option>
            </select>

            <label className="block mt-4 mb-2">Battery Level:</label>
            <input
              type="number"
              value={newBus.battery}
              onChange={(e) => setNewBus({ ...newBus, battery: Number(e.target.value) })}
              className="border border-gray-300 p-2 w-full rounded"
            />

            <label className="block mt-4 mb-2">CAP:</label>
            <input
              type="number"
              value={newBus.CAP}
              onChange={(e) => setNewBus({ ...newBus, CAP: Number(e.target.value) })}
              className="border border-gray-300 p-2 w-full rounded"
            />

            <label className="block mt-4 mb-2">ENE:</label>
            <input
              type="number"
              value={newBus.ENE}
              onChange={(e) => setNewBus({ ...newBus, ENE: Number(e.target.value) })}
              className="border border-gray-300 p-2 w-full rounded"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setIsAddBusOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleAddBus} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Save Bus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-[10%] flex justify-between items-center">
        {fullPage && activeUser ? (
          <button
            onClick={() => setIsAddBusOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add a Bus
          </button>
        ) : (
          <div className="w-[160px]"></div>)}
        {/* Pagination Controls */}
        <div className={`space-x-3 ${fullPage ? "text-base" : "text-xs"}`}>
          <button
            className={`px-4 py-2 bg-componentsColor border border-borderColor rounded-lg hover:bg-primaryColor hover:text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
            className={`px-4 py-2 bg-componentsColor border border-borderColor rounded-lg hover:bg-primaryColor hover:text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
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
