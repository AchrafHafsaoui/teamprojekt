import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ROUTES from "../apiRoutes";


type StationData = {
  station_id: string;
  availability: "OK" | "Down" | "Maintenance";
  charging_power: number;
  max_power: number;
};

const ChargingStationStatus: React.FC = () => {
  const [stations, setStations] = useState<StationData[]>([]);

  const fetchStations = async () => {
    try {
      const response = await axios.get<StationData[]>(API_ROUTES.GET_STATIONS); // Fetch from API
      setStations(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
        Charging Station Status
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
      className={`bg-secondaryColor bg-opacity-80 flex-col border border-borderColor shadow-md rounded-3xl p-4 overflow-hidden h-full`}
    >
      <div className="flex items-center w-full h-[10%] justify-between">
        <h2 className="font-bold lg:text-3xl md:text-2xl sm:text-2xl text-primaryColor mb-2">
          Charging Station Status
        </h2>
        <div className="flex space-x-3">
          {["all", "OK", "Down", "Maintenance"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status as typeof filterStatus);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 text-xs rounded-lg border font-semibold border-borderColor ${filterStatus === status
                  ? "bg-primaryColor text-white"
                  : "bg-componentsColor border border-borderColor text-black hover:bg-primaryColor hover:text-white"
                } transition-colors 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>


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
                handleRowClick(station.station_id); // Only allow expansion if fullPage is true
              }}
              className={`grid grid-cols-4 gap-4 items-center rounded-2xl  text-gray-800 h-[25%] min-h-14 py-3 shadow-sm font-semibold mr-5 ${expandedRow === station.station_id ? "bg-blue-100" : ""
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
        {/* Pagination Controls */}
        <div className={`space-x-3 text-xs`}>
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

export default ChargingStationStatus;
