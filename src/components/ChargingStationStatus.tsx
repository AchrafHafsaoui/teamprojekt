import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import API_ROUTES from "../apiRoutes";
import apiClient, { updateContextValues } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

type StationData = {
  id: number;
  station_id: string;
  availability: "OK" | "Down" | "Maintenance";
  charging_power: number;
  max_power: number;
};

type ChargingStationProps = {
  fullPage?: boolean; // Controls height
};

const ChargingStationStatus: React.FC<ChargingStationProps> = ({
  fullPage = true,
}) => {
  const [stations, setStations] = useState<StationData[]>([]);
  const [activeUser, setActiveUser] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStation, setNewStation] = useState({
    station_id: "",
    availability: "OK",
    charging_power: "",
    max_power: "",
    });

  const fetchStations = async () => {
    try {
      const response = await axios.get<StationData[]>(API_ROUTES.GET_STATIONS); // Fetch from API
      setStations(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };
  const confirmDelete = (stationId: number, stationName: string) => {
    if (window.confirm(`Are you sure you want to delete station: ${stationName}?`)) {
        deleteStation(String(stationId));
    }
};
  const deleteStation = async (stationId: string) => {
    try {
        const deleteUrl = API_ROUTES.DELETE_STATION(stationId);
        console.log("Attempting DELETE request to:", deleteUrl);

        const response = await axios.delete(deleteUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.access || ''}`, // ✅ Add if authentication is required
            },
        });

        console.log("Delete response:", response);
        alert("Charging Station Deleted Successfully!");

        fetchStations(); // Refresh the list
    } catch (error: any) {
        console.error("Error deleting station:", error.response || error.message);

        alert(`Failed to delete charging station. Error: ${error.response?.data?.message || error.message}`);
    }
};



const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
    setNewStation({ ...newStation, [name]: value });
  };
  const addNewStation = async () => {
    try {
        await axios.post(API_ROUTES.ADD_STATION, newStation, {
            headers: { "Content-Type": "application/json" },
        });
        alert("Charging Station Added Successfully!");
        setShowAddForm(false);
        fetchStations(); // Refresh the stations list
    } catch (error) {
        console.error("Error adding station:", error);
        alert("Failed to add charging station.");
    }
};



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

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchStations();

    // Optional: Polling to refresh data every 10 seconds
    const interval = setInterval(fetchStations, 60000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "In Depot" | "Maintenance" | "On Route"
  >("all");
  const [animatedSegments, setAnimatedSegments] = useState<number[]>(
    Array(stations.length).fill(0)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = fullPage ? 5 : 3;

  // sorting

  const segmentCount = 20; // Number of segments in the bar

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    stations.forEach((_, stationIndex) => {
      let currentSegment = 0;
      const interval = setInterval(() => {
        if (currentSegment <= segmentCount) {
          setAnimatedSegments((prev) => {
            const updatedSegments = [...prev];
            updatedSegments[stationIndex] = currentSegment;
            return updatedSegments;
          });
          currentSegment++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Animation speed
      intervals.push(interval);
    });
  }, [stations]);

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const filteredStations = stations.filter((station) => {
    const matchesStatus =
      filterStatus === "all" || station.availability === filterStatus;
    const matchesSearch = station.station_id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate total pages and current buses
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const currentStations = filteredStations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderGraduatedBar = (
    charging_power: number,
    max_power: number,
    stationIndex: number
  ) => {
    const segmentsToShow = Math.round(
      (charging_power / max_power) * segmentCount
    );
    <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold lg:text-3xl md:text-2xl sm:text-2xl text-primaryColor">
            Charging Station
        </h2>
    </div>
    return (      
      <div className="flex space-x-0.5 w-full justify-center items-center">
        {Array.from({ length: segmentCount }).map((_, index) => (
          <div
            key={index}
            className={`h-6 rounded transition-colors duration-500`}
            style={{
              width: "4%", // Each segment takes 4% of the column width
              backgroundColor:
                index < animatedSegments[stationIndex] && index < segmentsToShow
                  ? "#078ECD"
                  : "#D3D3D3",
            }}
          ></div>
        ))}
      </div>
    );
  };

  const [expandedRow, setExpandedRow] = useState<string | null>(null); // Track the expanded row

  const handleRowClick = (station_id: string) => {
    setExpandedRow((prev) => (prev === station_id ? null : station_id));
  };

  return (
    <div
      className={`bg-secondaryColor bg-opacity-80 flex-col border border-borderColor shadow-md rounded-3xl p-4 overflow-hidden ${
        fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
      }`}
    >
      <div className="flex items-center w-full h-[10%] justify-between">
        <h2 className="font-bold lg:text-3xl md:text-2xl sm:text-2xl text-primaryColor mb-2">
          Charging Station 
        </h2>
        {fullPage && (
          <input
            type="text"
            placeholder="Search by Station ID"
            className="max-w-[50%] px-3 py-2 w-2/3 ml-10 bg-componentsColor border border-borderColor rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent text-base md:text-sm sm:text-xs"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
        <div className="flex space-x-3">
          {["all", "OK", "Down", "Maintenance"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status as typeof filterStatus);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 text-xs rounded-lg border font-semibold border-borderColor ${
                filterStatus === status
                  ? "bg-primaryColor text-white"
                  : "bg-componentsColor border border-borderColor text-black hover:bg-primaryColor hover:text-white"
              } transition-colors 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {showAddForm && (
    <form onSubmit={addNewStation} className="bg-white shadow-lg p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Add New Charging Station</h3>
        <div className="grid grid-cols-2 gap-4">
            <input
                type="text"
                name="station_id"
                placeholder="Station ID"
                value={newStation.station_id}
                onChange={handleInputChange}
                required
                className="p-2 border rounded-lg"
            />
            <select
                name="availability"
                value={newStation.availability}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
            >
                <option value="OK">OK</option>
                <option value="Down">Down</option>
                <option value="Maintenance">Maintenance</option>
            </select>
            <input
                type="number"
                name="charging_power"
                placeholder="Charging Power (kW)"
                value={newStation.charging_power}
                onChange={handleInputChange}
                required
                className="p-2 border rounded-lg"
            />
            <input
                type="number"
                name="max_power"
                placeholder="Max Power (kW)"
                value={newStation.max_power}
                onChange={handleInputChange}
                required
                className="p-2 border rounded-lg"
            />
        </div>
        <div className="flex justify-end mt-4">
            <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="mr-2 px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Add
            </button>
        </div>
    </form>
)}

      <div className="w-full h-[80%]">
        {/* Header Row */}
        <div
          className={`grid gap-4 font-bold h-[10%] text-gray-600 text-center top-0 sticky grid-cols-4`}
        >
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Station ID
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Availability
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Max Capacity
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Charging Power
          </div>
        </div>
        {/* Data Rows */}
        <div className={`overflow-x-hidden custom-scrollbar h-[90%]`}>
          {currentStations.map((station, index) => (
            <div
              key={station.station_id}
              onClick={() => {
                if (fullPage) handleRowClick(station.station_id); // Only allow expansion if fullPage is true
              }}
              className={`grid grid-cols-4 gap-4 items-center rounded-2xl  text-gray-800 ${
                fullPage ? "cursor-pointer" : "h-[25%]"
              } min-h-14 py-3 shadow-sm font-semibold mr-5 ${
                expandedRow === station.station_id ? "bg-blue-100" : ""
              }`}
            >
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {station.station_id}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {station.availability}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {station.max_power} kW
              </span>
              <div className="w-full ">
                {renderGraduatedBar(
                  station.charging_power,
                  station.max_power,
                  index
                )}
                <div className="text-center font-semibold mt-1 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                  {station.charging_power} kW
                </div>
              </div>
              <button
                 onClick={(e) => {
                 e.stopPropagation(); // Prevent row click from triggering
                 confirmDelete(station.id, station.station_id);
                }}
              className="relative -top-12 p-2 rounded-full hover:bg-red-100 transition w-9"
              >
              <Trash2 className="w-5 h-5 text-red-600" />
              </button>

              {expandedRow === station.station_id && (
                <div className="col-span-full text-black pl-14 mb-4 rounded-lg">
                  <p>Additional Details for {station.station_id}</p>
                  <p>Maximum Charging Power: {station.max_power} KWh</p>
                  <p>Current Charging Power: {station.charging_power} KWh</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[10%] flex justify-end items-center">
        <div className="flex-1">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-primaryColor text-white font-semibold rounded-lg"
          >
             + Add Station
          </button>
        </div>
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

export default ChargingStationStatus;