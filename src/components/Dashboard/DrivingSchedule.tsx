import React from "react";

type ScheduleEntry = {
  id: string;
  departureTime: string;
  arrivalTime: string;
  vehicleCode: string;
};

type DrivingScheduleProps = {
  fullPage?: boolean; // Controls height
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({ fullPage = false }) => {
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
    // Add more entries as needed
  ];

  const parseVehicleCode = (code: string) => {
    const type = code[0] === "T" ? "Truck" : "Bus";
    const batteryCapacity = `${code.slice(2, -3)} kWh`;
    const length = `${code.slice(-2)}m`;
    return { type, batteryCapacity, length };
  };

  return (
    <div
      className={`bg-[#FFFFFF] bg-opacity-80 flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ${fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
        }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Driving Schedule</h2>
      <div className="flex justify-between mb-4 px-2 text-lg font-semibold">
        <div className="text-center w-1/2">Departure</div>
        <div className="text-center w-1/2">Arrival</div>
      </div>
      <div className={`flex overflow-y-auto ${fullPage ? "h-4/5" : "h-60"} custom-scrollbar`}>
        <div className="w-1/2 pr-4">
          <div className="flex flex-col items-start space-y-3">
            {scheduleData.map((entry) => {
              const { type, batteryCapacity, length } = parseVehicleCode(entry.vehicleCode);
              return (
                <div key={entry.id} className="flex justify-between w-full">
                  <div>
                    <span className="font-semibold text-gray-700">{entry.id}</span>
                    <span className="block text-sm text-gray-500">{type}</span>
                    <span className="block text-sm text-gray-500">{batteryCapacity}</span>
                    <span className="block text-sm text-gray-500">{length}</span>
                  </div>
                  <span className="font-medium text-gray-700">{entry.departureTime}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-l-2 border-gray-300 sticky top-0 h-full"></div>
        <div className="w-1/2 pl-4 mr-5">
          <div className="flex flex-col items-start space-y-3">
            {scheduleData.map((entry) => {
              const { type, batteryCapacity, length } = parseVehicleCode(entry.vehicleCode);
              return (
                <div key={entry.id} className="flex justify-between w-full">
                  <div>
                    <span className="font-semibold text-gray-700">{entry.id}</span>
                    <span className="block text-sm text-gray-500">{type}</span>
                    <span className="block text-sm text-gray-500">{batteryCapacity}</span>
                    <span className="block text-sm text-gray-500">{length}</span>
                  </div>
                  <span className="font-medium text-gray-700">{entry.arrivalTime}</span>
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
