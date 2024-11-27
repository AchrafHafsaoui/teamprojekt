import React, { useState, useEffect } from "react";

type ChargingStationData = {
  stationId: string;
  availability: "OK" | "Down" | "Maintenance";
  chargingPower: number;
  maxPower: number;
};

type ChargingStationProps = {
  fullPage?: boolean; // Controls height
};

const ChargingStationStatus: React.FC<ChargingStationProps> = ({
  fullPage = false,
}) => {
  const stations: ChargingStationData[] = [
    {
      stationId: "ST01",
      availability: "OK",
      chargingPower: 100,
      maxPower: 300,
    },
    {
      stationId: "ST02",
      availability: "Down",
      chargingPower: 70,
      maxPower: 200,
    },
    {
      stationId: "ST03",
      availability: "Maintenance",
      chargingPower: 160,
      maxPower: 400,
    },
    {
      stationId: "ST04",
      availability: "OK",
      chargingPower: 200,
      maxPower: 200,
    },
    {
      stationId: "ST05",
      availability: "OK",
      chargingPower: 100,
      maxPower: 150,
    },
    {
      stationId: "ST06",
      availability: "Maintenance",
      chargingPower: 180,
      maxPower: 200,
    },
    {
      stationId: "ST07",
      availability: "Down",
      chargingPower: 40,
      maxPower: 100,
    },
    {
      stationId: "ST08",
      availability: "OK",
      chargingPower: 180,
      maxPower: 500,
    },
    {
      stationId: "ST09",
      availability: "OK",
      chargingPower: 150,
      maxPower: 300,
    },
    {
      stationId: "ST10",
      availability: "Down",
      chargingPower: 60,
      maxPower: 200,
    },
    {
      stationId: "ST11",
      availability: "Maintenance",
      chargingPower: 90,
      maxPower: 150,
    },
    {
      stationId: "ST12",
      availability: "OK",
      chargingPower: 120,
      maxPower: 250,
    },
    {
      stationId: "ST13",
      availability: "OK",
      chargingPower: 200,
      maxPower: 400,
    },
    {
      stationId: "ST14",
      availability: "Down",
      chargingPower: 50,
      maxPower: 100,
    },
    {
      stationId: "ST15",
      availability: "Maintenance",
      chargingPower: 100,
      maxPower: 300,
    },
    {
      stationId: "ST16",
      availability: "OK",
      chargingPower: 180,
      maxPower: 500,
    },
    {
      stationId: "ST17",
      availability: "OK",
      chargingPower: 140,
      maxPower: 250,
    },
    {
      stationId: "ST18",
      availability: "Down",
      chargingPower: 30,
      maxPower: 80,
    },
    {
      stationId: "ST19",
      availability: "Maintenance",
      chargingPower: 170,
      maxPower: 350,
    },
    {
      stationId: "ST20",
      availability: "OK",
      chargingPower: 190,
      maxPower: 400,
    },
    {
      stationId: "ST21",
      availability: "OK",
      chargingPower: 150,
      maxPower: 300,
    },
    {
      stationId: "ST22",
      availability: "Down",
      chargingPower: 40,
      maxPower: 90,
    },
    {
      stationId: "ST23",
      availability: "Maintenance",
      chargingPower: 130,
      maxPower: 400,
    },
    {
      stationId: "ST24",
      availability: "OK",
      chargingPower: 200,
      maxPower: 500,
    },
    {
      stationId: "ST25",
      availability: "OK",
      chargingPower: 120,
      maxPower: 250,
    },
    {
      stationId: "ST26",
      availability: "Down",
      chargingPower: 35,
      maxPower: 100,
    },
    {
      stationId: "ST27",
      availability: "Maintenance",
      chargingPower: 160,
      maxPower: 300,
    },
    {
      stationId: "ST28",
      availability: "OK",
      chargingPower: 180,
      maxPower: 400,
    },
    {
      stationId: "ST29",
      availability: "OK",
      chargingPower: 190,
      maxPower: 500,
    },
    {
      stationId: "ST30",
      availability: "Down",
      chargingPower: 70,
      maxPower: 200,
    },
    {
      stationId: "ST31",
      availability: "Maintenance",
      chargingPower: 120,
      maxPower: 350,
    },
    {
      stationId: "ST32",
      availability: "OK",
      chargingPower: 150,
      maxPower: 300,
    },
    {
      stationId: "ST33",
      availability: "OK",
      chargingPower: 170,
      maxPower: 250,
    },
    {
      stationId: "ST34",
      availability: "Down",
      chargingPower: 50,
      maxPower: 150,
    },
    {
      stationId: "ST35",
      availability: "Maintenance",
      chargingPower: 100,
      maxPower: 400,
    },
    {
      stationId: "ST36",
      availability: "OK",
      chargingPower: 200,
      maxPower: 400,
    },
    {
      stationId: "ST37",
      availability: "OK",
      chargingPower: 140,
      maxPower: 250,
    },
    {
      stationId: "ST38",
      availability: "Down",
      chargingPower: 30,
      maxPower: 80,
    },
    {
      stationId: "ST39",
      availability: "Maintenance",
      chargingPower: 170,
      maxPower: 300,
    },
    {
      stationId: "ST40",
      availability: "OK",
      chargingPower: 190,
      maxPower: 400,
    },
    {
      stationId: "ST41",
      availability: "OK",
      chargingPower: 160,
      maxPower: 300,
    },
    {
      stationId: "ST42",
      availability: "Down",
      chargingPower: 20,
      maxPower: 50,
    },
    {
      stationId: "ST43",
      availability: "Maintenance",
      chargingPower: 110,
      maxPower: 250,
    },
    {
      stationId: "ST44",
      availability: "OK",
      chargingPower: 200,
      maxPower: 500,
    },
    {
      stationId: "ST45",
      availability: "OK",
      chargingPower: 120,
      maxPower: 350,
    },
    {
      stationId: "ST46",
      availability: "Down",
      chargingPower: 60,
      maxPower: 200,
    },
    {
      stationId: "ST47",
      availability: "Maintenance",
      chargingPower: 140,
      maxPower: 400,
    },
    {
      stationId: "ST48",
      availability: "OK",
      chargingPower: 180,
      maxPower: 500,
    },
    {
      stationId: "ST49",
      availability: "OK",
      chargingPower: 150,
      maxPower: 300,
    },
    {
      stationId: "ST50",
      availability: "Down",
      chargingPower: 40,
      maxPower: 100,
    },
  ];
  const [filterStatus, setFilterStatus] = useState<
    "all" | "OK" | "Down" | "Maintenance"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [animatedSegments, setAnimatedSegments] = useState<number[]>(
    Array(stations.length).fill(0),
  );
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = fullPage ? 6 : 4;

  // sorting
  const [fieldToSort, setFieldToSort] = useState<{
    field: "1" | "2" | "3" | "4" | null;
    direction: "ASC" | "DSC";
  }>({
    field: null,
    direction: "ASC",
  });

  const handleSort = (field: "1" | "2" | "3" | "4" | null) => {
    if (fieldToSort.field !== field) {
      setFieldToSort({ field: field, direction: "ASC" });
      fetchSortedItems(field, "ASC");
    } else if (fieldToSort.direction === "ASC") {
      setFieldToSort({ field: field, direction: "DSC" });
      fetchSortedItems(field, "DSC");
    } else {
      setFieldToSort({ field: field, direction: "ASC" });
      fetchSortedItems(field, "ASC");
    }
  };

  const fetchSortedItems = (
    field: "1" | "2" | "3" | "4" | null,
    direction: "ASC" | "DSC",
  ) => {
    console.log(
      "fetching items of column " + field + " in " + direction + " order.",
    );
  };

  const segmentCount = 20; // Number of segments in the bar

  useEffect(() => {
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
    });
  }, []);

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
    const matchesSearch = station.stationId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate total pages and current buses
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const currentStations = filteredStations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderGraduatedBar = (
    chargingPower: number,
    maxPower: number,
    stationIndex: number,
  ) => {
    const segmentsToShow = Math.round(
      (chargingPower / maxPower) * segmentCount,
    );

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

  const handleRowClick = (stationId: string) => {
    // Toggle expanded state
    setExpandedRow((prev) => (prev === stationId ? null : stationId));
  };

  return (
    <div
      className={`bg-[#FFFFFF] bg-opacity-80 flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ${
        fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
      }`}
    >
      <div className="flex items-center w-full h-[10%] justify-between">
        <h2 className="text-2xl font-semibold 2xl:text-xl md:text-lg sm:text-xs">
          Charging Station Status
        </h2>
        {fullPage && (
          <input
            type="text"
            placeholder="Search by Station ID"
            className="max-w-[50%] px-3 py-2 w-2/3 ml-10 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
              className={`2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none px-3 py-2 text-xs rounded-lg border font-semibold border-[#cccccc] ${
                filterStatus === status
                  ? "text-white"
                  : "bg-[#ededed] text-gray-800"
              } transition-colors`}
              style={{
                backgroundColor:
                  filterStatus === status
                    ? "rgba(7, 142, 205, 0.8)"
                    : undefined,
              }}
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
            {fieldToSort.field !== "1" ? (
              <span
                onClick={() => handleSort("1")}
                className={`ml-1 text-gray-300 hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : fieldToSort.direction == "ASC" && fieldToSort.field == "1" ? (
              <span
                onClick={() => handleSort("1")}
                className={`ml-1 text-gray-600" hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : (
              <span
                onClick={() => handleSort("1")}
                className={`ml-1 text-gray-600 hover:cursor-pointer`}
              >
                ▲
              </span>
            )}
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Availability
            {fieldToSort.field !== "2" ? (
              <span
                onClick={() => handleSort("2")}
                className={`ml-1 text-gray-300 hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : fieldToSort.direction == "ASC" && fieldToSort.field == "2" ? (
              <span
                onClick={() => handleSort("2")}
                className={`ml-1 text-gray-600" hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : (
              <span
                onClick={() => handleSort("2")}
                className={`ml-1 text-gray-600 hover:cursor-pointer`}
              >
                ▲
              </span>
            )}
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Max Capacity
            {fieldToSort.field !== "3" ? (
              <span
                onClick={() => handleSort("3")}
                className={`ml-1 text-gray-300 hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : fieldToSort.direction == "ASC" && fieldToSort.field == "3" ? (
              <span
                onClick={() => handleSort("3")}
                className={`ml-1 text-gray-600" hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : (
              <span
                onClick={() => handleSort("3")}
                className={`ml-1 text-gray-600 hover:cursor-pointer`}
              >
                ▲
              </span>
            )}
          </div>
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Charging Power
            {fieldToSort.field !== "4" ? (
              <span
                onClick={() => handleSort("4")}
                className={`ml-1 text-gray-300 hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : fieldToSort.direction == "ASC" && fieldToSort.field == "4" ? (
              <span
                onClick={() => handleSort("4")}
                className={`ml-1 text-gray-600" hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : (
              <span
                onClick={() => handleSort("4")}
                className={`ml-1 text-gray-600 hover:cursor-pointer`}
              >
                ▲
              </span>
            )}
          </div>
        </div>
        {/* Data Rows */}
        <div className={`overflow-x-hidden custom-scrollbar h-[90%]`}>
          {currentStations.map((station, index) => (
            <div
              key={station.stationId}
              onClick={() => {
                if (fullPage) handleRowClick(station.stationId); // Only allow expansion if fullPage is true
              }}
              className={`grid grid-cols-4 gap-4 items-center rounded-2xl  text-gray-800 ${fullPage ? "cursor-pointer" : "h-[25%]"} min-h-14 py-3 shadow-sm font-semibold mr-5 ${expandedRow === station.stationId ? "bg-blue-100" : ""
              }`}
           >
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {station.stationId}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {station.availability}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {station.maxPower} kW
              </span>
              <div className="w-full ">
                {renderGraduatedBar(
                  station.chargingPower,
                  station.maxPower,
                  index,
                )}
                <div className="text-center font-semibold mt-1 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                  {station.chargingPower} kW
                </div>
              </div>
              {expandedRow === station.stationId && (
                <div className="col-span-full text-black pl-14 mb-4 rounded-lg">
                  <p>Additional Details for {station.stationId}</p>
                  <p>Maximum Charging Power: {station.maxPower} KWh</p>
                  <p>Current Charging Power: {station.chargingPower} KWh</p>
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
            className={`px-4 py-2 bg-gray-300 rounded-md hover:bg-[#078ECD] hover:text-white ${
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
            className={`px-4 py-2 bg-gray-300 rounded-md hover:bg-[#078ECD] hover:text-white ${
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
