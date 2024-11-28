import React, { useState } from "react";

interface Bus {
  id: number;
  maxCapacity: number;
  currentCharging: number;
}

const ChargingSchedule: React.FC = () => {
  const minChargePerBus = 0;
  const buses: Bus[] = [
    { id: 1, maxCapacity: 100, currentCharging: 50 },
    { id: 2, maxCapacity: 100, currentCharging: 70 },
    { id: 3, maxCapacity: 100, currentCharging: 60 },
    { id: 4, maxCapacity: 100, currentCharging: 80 },
    { id: 5, maxCapacity: 100, currentCharging: 90 },
    { id: 6, maxCapacity: 100, currentCharging: 40 },
    { id: 7, maxCapacity: 100, currentCharging: 0 },
    { id: 8, maxCapacity: 100, currentCharging: 0 },
    { id: 9, maxCapacity: 100, currentCharging: 70 },
    { id: 10, maxCapacity: 100, currentCharging: 60 },
    { id: 11, maxCapacity: 100, currentCharging: 80 },
    { id: 12, maxCapacity: 100, currentCharging: 90 },
    { id: 13, maxCapacity: 100, currentCharging: 40 },
    { id: 14, maxCapacity: 100, currentCharging: 0 },
    { id: 15, maxCapacity: 100, currentCharging: 0 },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [seeStats, setSeeStats] = useState<boolean>(false);

  // sorting
  const [fieldToSort, setFieldToSort] = useState<{
    field: "1" | "2" | "3" | "4" | "5" | null;
    direction: "ASC" | "DSC";
  }>({
    field: null,
    direction: "ASC",
  });

  // Calculate total pages and current buses
  const totalPages = Math.ceil(buses.length / itemsPerPage);
  const currentBuses = buses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers for pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Metrics calculations
  const totalGridCapacity = buses.reduce(
    (sum, bus) => sum + bus.maxCapacity,
    0,
  );
  const currentChargingLoad = buses.reduce(
    (sum, bus) => sum + bus.currentCharging,
    0,
  );
  const upwardFlexibility = buses.reduce(
    (sum, bus) => sum + (bus.maxCapacity - bus.currentCharging),
    0,
  );
  const downwardFlexibility = buses.reduce(
    (sum, bus) => sum + (bus.currentCharging - minChargePerBus),
    0,
  );

  const calculatePercentage = (value: number) =>
    Math.round((value / totalGridCapacity) * 90);

  const handleSort = (field: "1" | "2" | "3" | "4" | "5" | null) => {
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
    field: "1" | "2" | "3" | "4" | "5" | null,
    direction: "ASC" | "DSC",
  ) => {
    console.log(
      "fetching items of column " + field + " in " + direction + " order.",
    );
  };

  return (
    <div
      className={`bg-[#e8f4ff] bg-opacity-80 flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]`}
    >
      <div className="flex items-center w-full h-[10%] justify-between">
        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold text-[#078ECD] mb-2">Charging Schedule</h2>
        {!seeStats && (
          <input
            type="text"
            placeholder="Search by Station ID"
            className="px-3 py-2 w-2/3 ml-10 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#078ECD] focus:border-transparent"
            onChange={(e) => console.log(e.target.value)}
          />
        )}
        <button
          className={`px-4 py-2 bg-gray-300 rounded-md hover:bg-[#078ECD] hover:text-white`}
          onClick={() => setSeeStats(!seeStats)}
        >
          {seeStats ? "Return" : "See Stats"}
        </button>
      </div>
      <div className="w-full h-[80%]">
        {!seeStats ? (
          <div className="h-[100%]">
            <div className="grid grid-cols-5 gap-4 font-bold text-base h-[10%] px-2 text-gray-600 top-0 sticky ">
              <div className="flex items-center justify-center text-center">
                Bus ID
                {fieldToSort.field !== "1" ? (
                  <span
                    onClick={() => handleSort("1")}
                    className={`ml-1 text-gray-300 hover:cursor-pointer`}
                  >
                    ▼
                  </span>
                ) : fieldToSort.direction == "ASC" &&
                  fieldToSort.field == "1" ? (
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
              <div className="flex items-center justify-center text-center">
                Max Capacity
                {fieldToSort.field !== "2" ? (
                  <span
                    onClick={() => handleSort("2")}
                    className={`ml-1 text-gray-300 hover:cursor-pointer`}
                  >
                    ▼
                  </span>
                ) : fieldToSort.direction == "ASC" &&
                  fieldToSort.field == "2" ? (
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
              <div className="flex items-center justify-center text-center">
                Current Charging
                {fieldToSort.field !== "3" ? (
                  <span
                    onClick={() => handleSort("3")}
                    className={`ml-1 text-gray-300 hover:cursor-pointer`}
                  >
                    ▼
                  </span>
                ) : fieldToSort.direction == "ASC" &&
                  fieldToSort.field == "3" ? (
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
              <div className="flex items-center justify-center text-center">
                Remaining Upward Flex
                {fieldToSort.field !== "4" ? (
                  <span
                    onClick={() => handleSort("4")}
                    className={`ml-1 text-gray-300 hover:cursor-pointer`}
                  >
                    ▼
                  </span>
                ) : fieldToSort.direction == "ASC" &&
                  fieldToSort.field == "4" ? (
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
              <div className="flex items-center justify-center text-center">
                Possible Downward Flex
                {fieldToSort.field !== "5" ? (
                  <span
                    onClick={() => handleSort("5")}
                    className={`ml-1 text-gray-300 hover:cursor-pointer`}
                  >
                    ▼
                  </span>
                ) : fieldToSort.direction == "ASC" &&
                  fieldToSort.field == "5" ? (
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
            </div>
            {/* table body */}
            <div className="overflow-x-hidden custom-scrollbar h-[90%] p-0 ">
              {currentBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="grid grid-cols-5 gap-4 items-center h-[12.5%] text-gray-800 p-0 shadow-sm font-semibold"
                >
                  <span className="text-center">{bus.id}</span>
                  <span className="text-center">{bus.maxCapacity}</span>
                  <span className="text-center">{bus.currentCharging} kW</span>
                  <span className="text-center">
                    {bus.maxCapacity - bus.currentCharging} kW
                  </span>
                  <span className="text-center">
                    {bus.currentCharging - minChargePerBus} kW
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 mx-10 h-[100%]">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Depot Capacity:</span>
              <span>{totalGridCapacity} kW</span>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  Current Charging Load: {currentChargingLoad} KW
                </span>
                <span>{calculatePercentage(currentChargingLoad)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-[#078ECD] h-4 rounded-full"
                  style={{
                    width: `${calculatePercentage(currentChargingLoad)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  Upward Flexibility: {upwardFlexibility} KW
                </span>
                <span>{calculatePercentage(upwardFlexibility)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-[#078ECD] h-4 rounded-full"
                  style={{
                    width: `${calculatePercentage(upwardFlexibility)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  Downward Flexibility: {downwardFlexibility} KW
                </span>
                <span>{calculatePercentage(downwardFlexibility)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-[#078ECD] h-4 rounded-full"
                  style={{
                    width: `${calculatePercentage(downwardFlexibility)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-[10%] flex justify-end items-center">
        {/* Pagination Controls */}
        <div className="space-x-2 text-base">
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

export default ChargingSchedule;
