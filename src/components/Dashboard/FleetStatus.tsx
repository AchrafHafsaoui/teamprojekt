import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type VehicleData = {
  busId: string;
  battery: number;
  chargingStart: string | null; // Charging start time or null if not charging
  status: "In Depot" | "Maintenance" | "On Route";
  chargingLocation: string | null; // Combined charging station and point (e.g., A1, B23, A17) or null if not charging
  CAP: string;
  ENE: string;
};

type FleetStatusProps = {
  fullPage?: boolean; // Controls whether to show all columns
};
const FleetStatus: React.FC<FleetStatusProps> = ({ fullPage = true }) => {
  const vehicles: VehicleData[] = [
    {
      busId: "23001",
      battery: 80,
      chargingStart: "2024-11-18 08:00", // Example timestamp
      status: "Maintenance",
      chargingLocation: "A1", // Combined station and point
      CAP: "30MWh",
      ENE: "50MWh",
    },
    {
      busId: "19101",
      battery: 60,
      chargingStart: "2024-11-18 07:45",
      status: "In Depot",
      chargingLocation: "B2",
      CAP: "20MWh",
      ENE: "30MWh",
    },
    {
      busId: "15401",
      battery: 30,
      chargingStart: null, // Not charging
      status: "On Route",
      chargingLocation: null,
      CAP: "100MWh",
      ENE: "0MWh",
    },
    {
      busId: "18757",
      battery: 95,
      chargingStart: null,
      status: "On Route",
      chargingLocation: null,
      CAP: "15MWh",
      ENE: "70MWh",
    },
    {
      busId: "19289",
      battery: 65,
      chargingStart: "2024-11-18 08:15",
      status: "In Depot",
      chargingLocation: "C3",
      CAP: "30MWh",
      ENE: "10MWh",
    },
    {
      busId: "21001",
      battery: 50,
      chargingStart: "2024-11-18 08:10",
      status: "Maintenance",
      chargingLocation: "A4",
      CAP: "95MWh",
      ENE: "75MWh",
    },
    {
      busId: "22345",
      battery: 80,
      chargingStart: null,
      status: "On Route",
      chargingLocation: null,
      CAP: "15MWh",
      ENE: "50MWh",
    },
  ];

  const [filterStatus, setFilterStatus] = useState<
    "all" | "In Depot" | "Maintenance" | "On Route"
  >("all");
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    Array(vehicles.length).fill(0),
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = fullPage ? 6 : 3;

  // sorting
  const [fieldToSort, setFieldToSort] = useState<{
    field: "1" | "2" | "3" | "4" | "5" | "6" | "7" | null;
    direction: "ASC" | "DSC";
  }>({
    field: null,
    direction: "ASC",
  });

  const handleSort = (
    field: "1" | "2" | "3" | "4" | "5" | "6" | "7" | null,
  ) => {
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
    field: "1" | "2" | "3" | "4" | "5" | "6" | "7" | null,
    direction: "ASC" | "DSC",
  ) => {
    console.log(
      "fetching items of column " + field + " in " + direction + " order.",
    );
  };

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;
    const matchesSearch =
      !fullPage ||
      vehicle.busId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.chargingLocation &&
        vehicle.chargingLocation
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    // setCurrentPage(1);

    return matchesStatus && matchesSearch;
  });

  // Calculate total pages and current buses
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const currentBuses = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    vehicles.forEach((vehicle, index) => {
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
  }, []);

  return (
    <div
      className={`bg-[#FFFFFF] bg-opacity-80 flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ${
        fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
      }`}
    >
      <div className="flex items-center w-full h-[10%] justify-between">
        <h2 className="text-2xl font-semibold 2xl:text-xl md:text-lg sm:text-xs">
          Fleet Status
        </h2>
        {fullPage && (
          <input
            type="text"
            placeholder="Search by Plate Number or Charging Point"
            className="max-w-[50%] px-3 py-2 w-2/3 ml-10 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#078ECD] focus:border-transparent text-base md:text-sm sm:text-xs"
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
              className={`px-3 py-1 text-xs rounded-lg border font-semibold border-[#cccccc] ${
                filterStatus === status
                  ? "text-white"
                  : "bg-[#ededed] text-gray-800"
              } transition-colors 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none`}
              style={{
                backgroundColor:
                  filterStatus === status
                    ? "rgba(7, 142, 205, 0.8)"
                    : undefined,
              }}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[75%]">
        {/* Header Row */}
        <div
          className={`grid gap-4 font-bold h-[10%] text-gray-600 text-center top-0 sticky ${fullPage ? "grid-cols-7 text-base" : "grid-cols-5 text-sm"}`}
        >
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Plate Number
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
            Status
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
            Charging Point
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
            Session Start
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
          {fullPage && (
            <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
              CAP
              {fieldToSort.field !== "5" ? (
                <span
                  onClick={() => handleSort("5")}
                  className={`ml-1 text-gray-300 hover:cursor-pointer`}
                >
                  ▼
                </span>
              ) : fieldToSort.direction == "ASC" && fieldToSort.field == "5" ? (
                <span
                  onClick={() => handleSort("5")}
                  className={`ml-1 text-gray-600" hover:cursor-pointer`}
                >
                  ▼
                </span>
              ) : (
                <span
                  onClick={() => handleSort("5")}
                  className={`ml-1 text-gray-600 hover:cursor-pointer`}
                >
                  ▲
                </span>
              )}
            </div>
          )}
          {fullPage && (
            <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
              ENE
              {fieldToSort.field !== "6" ? (
                <span
                  onClick={() => handleSort("6")}
                  className={`ml-1 text-gray-300 hover:cursor-pointer`}
                >
                  ▼
                </span>
              ) : fieldToSort.direction == "ASC" && fieldToSort.field == "6" ? (
                <span
                  onClick={() => handleSort("6")}
                  className={`ml-1 text-gray-600" hover:cursor-pointer`}
                >
                  ▼
                </span>
              ) : (
                <span
                  onClick={() => handleSort("6")}
                  className={`ml-1 text-gray-600 hover:cursor-pointer`}
                >
                  ▲
                </span>
              )}
            </div>
          )}
          <div className="flex items-center justify-center text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
            Battery
            {fieldToSort.field !== "7" ? (
              <span
                onClick={() => handleSort("7")}
                className={`ml-1 text-gray-300 hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : fieldToSort.direction == "ASC" && fieldToSort.field == "7" ? (
              <span
                onClick={() => handleSort("7")}
                className={`ml-1 text-gray-600" hover:cursor-pointer`}
              >
                ▼
              </span>
            ) : (
              <span
                onClick={() => handleSort("7")}
                className={`ml-1 text-gray-600 hover:cursor-pointer`}
              >
                ▲
              </span>
            )}
          </div>
        </div>

        {/* Data Rows */}
        <div className={`overflow-x-hidden custom-scrollbar h-[90%]`}>
          {currentBuses.map((vehicle, index) => (
            <div
              key={vehicle.busId}
              className={`grid gap-4 items-center text-gray-800 pb-3 min-h-14  ${fullPage ? "h-[16%]" : "h-[33.3%]"}  shadow-sm font-semibold ${
                fullPage ? "grid-cols-7" : "grid-cols-5"
              }`}
            >
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.busId}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.status}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.chargingLocation || "N/A"}
              </span>
              <span className="text-center 2xl:text-[0.95rem] md:text-[0.7rem] sm:text-[0.6rem] leading-none">
                {vehicle.chargingStart || "N/A"}
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
              <div className={`relative my-2 mx-auto ${fullPage?"w-[30%]":"w-[50%]"}`}>
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
                {vehicle.chargingStart && (
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
                      className="2xl:w-[0.95rem] md:w-[0.7rem] sm:w-[0.6rem] "
                      fill="#000000"
                      viewBox="0 0 512 512"
                    >
                      <path d="M117.333333,48 C182.134744,48 234.666667,100.531923 234.666667,165.333333 C234.666667,177.516512 232.809822,189.266001 229.363697,200.314237 L346.710217,317.661885 C367.98629,338.937958 367.98629,373.433288 346.710217,394.709361 C325.434144,415.985434 290.938814,415.985434 269.662741,394.709361 L152.315234,277.363386 C141.266709,280.80971 129.516879,282.666667 117.333333,282.666667 C52.5319227,282.666667 7.10542736e-15,230.134744 7.10542736e-15,165.333333 C7.10542736e-15,152.827953 1.95635722,140.779505 5.57971243,129.477348 L61.0818825,184.888889 L111.319797,168.156815 C112.394454,166.856793 113.540203,165.595781 114.757044,164.37894 L116.379797,162.756188 C117.593198,161.542787 118.85052,160.400077 120.146646,159.328057 L136.888889,109.149054 L81.3212183,53.6298873 C92.6685218,49.9744211 104.770352,48 117.333333,48 Z M384,90.6666667 L384,218.666667 L341.333333,218.666667 L341.333333,90.6666667 L384,90.6666667 Z M362.666667,1.42108547e-14 C377.39426,1.42108547e-14 389.333333,11.9390733 389.333333,26.6666667 C389.333333,41.39426 377.39426,53.3333333 362.666667,53.3333333 C347.939073,53.3333333 336,41.39426 336,26.6666667 C336,11.9390733 347.939073,1.42108547e-14 362.666667,1.42108547e-14 Z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
          {Array.from(
            { length: itemsPerPage - currentBuses.length },
            (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="grid grid-cols-5 gap-4 items-center text-gray-600 h-16 shadow-sm text-xl"
              >
                <span className="text-center">-</span>
                <span className="text-center">-</span>
                <span className="text-center">-</span>
                <span className="text-center">-</span>
                <span className="text-center">-</span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="w-full h-[10%] flex justify-end items-center">
        {/* Pagination Controls */}
        <div
          className={` mt-3 mr-3 space-x-3 ${fullPage ? "text-base" : "text-xs"}`}
        >
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

export default FleetStatus;
