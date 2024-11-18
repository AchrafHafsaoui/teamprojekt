import React from "react";

// Define a type to encapsulate all vehicle details
type ScheduleEntry = {
  id: string;
  departureTime: string;
  arrivalTime: string;
  vehicleCode: string; // Encodes vehicle type, battery capacity, and length
};

const DrivingSchedule: React.FC = () => {
  const scheduleData: ScheduleEntry[] = [
    {
      id: "10190",
      departureTime: "15:30",
      arrivalTime: "15:23",
      vehicleCode: "TB300L18",
    },
    {
      id: "10290",
      departureTime: "15:33",
      arrivalTime: "15:25",
      vehicleCode: "BB250L12",
    },
    {
      id: "10331",
      departureTime: "15:40",
      arrivalTime: "15:31",
      vehicleCode: "TB400L18",
    },
    {
      id: "19373",
      departureTime: "15:43",
      arrivalTime: "15:36",
      vehicleCode: "BB300L12",
    },
    {
      id: "19830",
      departureTime: "15:47",
      arrivalTime: "15:46",
      vehicleCode: "TB200L18",
    },
    {
      id: "20145",
      departureTime: "16:00",
      arrivalTime: "15:55",
      vehicleCode: "BB350L12",
    },
    {
      id: "20987",
      departureTime: "16:10",
      arrivalTime: "16:05",
      vehicleCode: "TB500L18",
    },
    {
      id: "21345",
      departureTime: "16:20",
      arrivalTime: "16:15",
      vehicleCode: "BB400L12",
    },
    {
      id: "21976",
      departureTime: "16:30",
      arrivalTime: "16:25",
      vehicleCode: "TB450L18",
    },
    {
      id: "22345",
      departureTime: "16:40",
      arrivalTime: "16:35",
      vehicleCode: "BB300L12",
    },
    {
      id: "22900",
      departureTime: "16:50",
      arrivalTime: "16:45",
      vehicleCode: "TB400L18",
    },
  ];

  // Helper function to parse vehicle code
  const parseVehicleCode = (code: string) => {
    const type = code[0] === "T" ? "Truck" : "Bus";
    const batteryCapacity = `${code.slice(2, -3)} kWh`;
    const length = `${code.slice(-2)}m`;
    return { type, batteryCapacity, length };
  };

  return (
    <div className="bg-[#FFFFFF] bg-opacity-80 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Driving Schedule</h2>
      <div className="flex justify-between mb-4 px-2 text-lg font-semibold">
        <div className="text-center w-1/2">Departure</div>
        <div className="text-center w-1/2">Arrival</div>
      </div>
      <div className="flex overflow-y-auto h-60 custom-scrollbar">
        {/* Departure Column */}
        <div className="w-1/2 pr-4">
          <div className="flex flex-col items-start space-y-3">
            {scheduleData.map((entry) => {
              const { type, batteryCapacity, length } = parseVehicleCode(
                entry.vehicleCode,
              );
              return (
                <div key={entry.id} className="flex justify-between w-full">
                  <div>
                    <span className="font-semibold text-gray-700">
                      {entry.id}
                    </span>
                    <span className="block text-sm text-gray-500">{type}</span>
                    <span className="block text-sm text-gray-500">
                      {batteryCapacity}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {length}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {entry.departureTime}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-l-2 border-gray-300 sticky top-0 h-full"></div>{" "}
        {/* Arrival Column */}
        <div className="w-1/2 pl-4 mr-5">
          <div className="flex flex-col items-start space-y-3">
            {scheduleData.map((entry) => {
              const { type, batteryCapacity, length } = parseVehicleCode(
                entry.vehicleCode,
              );
              return (
                <div key={entry.id} className="flex justify-between w-full">
                  <div>
                    <span className="font-semibold text-gray-700">
                      {entry.id}
                    </span>
                    <span className="block text-sm text-gray-500">{type}</span>
                    <span className="block text-sm text-gray-500">
                      {batteryCapacity}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {length}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {entry.arrivalTime}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchedule;
