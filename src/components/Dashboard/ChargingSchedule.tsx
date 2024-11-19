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
    Math.round((value / totalGridCapacity) * 100);

  return (
    <div className="bg-[#FFFFFF] bg-opacity-80 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Charging Schedule</h2>
        <div>
          <div className="grid grid-cols-5 gap-4 font-bold text-lg mb-2 px-2 text-gray-600 top-0 sticky">
            <div className="text-center">Bus ID</div>
            <div className="text-center">Max Capacity (kW)</div>
            <div className="text-center">Current Charging (kW)</div>
            <div className="text-center">Remaining Upward Flex (kW)</div>
            <div className="text-center">Possible Downward Flex (kW)</div>
          </div>
          <div className="overflow-y-auto custom-scrollbar h-95">
            <div className="space-y-3">
              {currentBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="grid grid-cols-5 gap-4 items-center text-gray-800 pb-3 shadow-sm font-semibold mr-5"
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
              {Array.from(
                { length: itemsPerPage - currentBuses.length },
                (_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="grid grid-cols-5 gap-4 items-center text-gray-300 pb-3"
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
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-4 py-2 bg-gray-300 rounded-md ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 bg-gray-300 rounded-md ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <hr className="my-6  border-gray-300" />
        {/* Metrics Section */}
        <div className="space-y-4 mx-10">
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
                className="bg-blue-600 h-4 rounded-full"
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
                className="bg-green-600 h-4 rounded-full"
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
                className="bg-red-600 h-4 rounded-full"
                style={{
                  width: `${calculatePercentage(downwardFlexibility)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingSchedule;