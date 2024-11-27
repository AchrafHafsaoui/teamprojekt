import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ScheduleEntry = {
  id: string;
  departureTime: string;
  arrivalTime: string;
  vehicleCode: string;
};

type DrivingScheduleProps = {
  fullPage?: boolean;
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({ fullPage = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for panel visibility
  const [activeButton, setActiveButton] = useState("Departure"); // Default active button

  const scheduleData: ScheduleEntry[] = [
    { id: "10190", departureTime: "06:15", arrivalTime: "08:30", vehicleCode: "T300L18" },
    { id: "12222", departureTime: "09:00", arrivalTime: "11:10", vehicleCode: "B250L12" },
    { id: "15643", departureTime: "12:45", arrivalTime: "14:50", vehicleCode: "B400L18" },
    { id: "16754", departureTime: "15:20", arrivalTime: "17:15", vehicleCode: "T450L20" },
    { id: "17865", departureTime: "18:00", arrivalTime: "20:30", vehicleCode: "B320L15" },
    { id: "18976", departureTime: "21:10", arrivalTime: "23:00", vehicleCode: "T350L12" },
    { id: "19087", departureTime: "23:45", arrivalTime: "02:00", vehicleCode: "B410L18" },
    { id: "20198", departureTime: "04:00", arrivalTime: "06:15", vehicleCode: "T300L16" },
  ];

  const parseVehicleCode = (code: string) => {
    const type = code[0] === "T" ? "Truck" : "Bus";
    const batteryCapacity = `${code.slice(2, -3)} kWh`;
    const length = `${code.slice(-2)}m`;
    return { type, batteryCapacity, length };
  };

  const filterSchedule = () => {
    if (!time) return scheduleData; // No filter if no start or end time selected

    const startHours = time.getHours();
    const startMinutes = time.getMinutes();

    return scheduleData.filter((entry) => {
      const [entryHours, entryMinutes] = entry.departureTime.split(":").map(Number);

      // Check if the departure time is within the range
      const isAfterTime =
        entryHours > startHours || (entryHours === startHours && entryMinutes >= startMinutes);

      return isAfterTime;
    });
  };

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen); // Toggle panel visibility
  };

  return (
    <div
      className={`bg-[#FFFFFF] bg-opacity-80 flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ${fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
        }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-2 text-[#078ECD]">Driving Schedule</h2>
        {/* Select Date Button */}
        {fullPage && (<button
          onClick={handlePanelToggle}
          className="bg-[#078ECD] text-white px-4 py-2 rounded-lg hover:bg-[#066a97] transition-all font-semibold"
        >
          Select Date & Time
        </button>)}
      </div>
      <div className="relative">

        {/* Overlay Panel */}
        {isPanelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 relative">
              {/* Close Button */}
              <button
                onClick={handlePanelToggle}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>

              {/* Panel Header */}
              <h2 className="text-xl font-bold text-[#078ECD] text-center">Select Date & Time</h2>
              <div className="flex space-x-2 my-4 justify-center">
                {/* Departure Button */}
                <button
                  onClick={() => setActiveButton("Departure")}
                  className={`py-1 px-3 rounded-full text-sm font-semibold transition ${activeButton === "Departure"
                    ? "bg-[#078ECD] text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Departure
                </button>

                {/* Arrival Button */}
                <button
                  onClick={() => setActiveButton("Arrival")}
                  className={`py-1 px-3 rounded-full text-sm font-semibold transition ${activeButton === "Arrival"
                    ? "bg-[#078ECD] text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Arrival
                </button>
              </div>

              {/* Customized Calendar */}
              <div className="mb-4 mx-6">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                  className="custom-calendar"
                />
              </div>

              {/* Time Picker */}
              <div className="mb-6 mx-6">
                <div className="flex items-center space-x-4">
                  {/* Decrease Time Button */}
                  <button
                    onClick={() => {
                      if (time) {
                        const updatedTime = new Date(time);
                        updatedTime.setMinutes(updatedTime.getMinutes() - 15); // Decrease by 15 minutes
                        setTime(updatedTime);
                      }
                    }}
                    className="text-[#078ECD] text-2xl font-bold px-2 hover:opacity-80"
                  >
                    −
                  </button>

                  {/* Time Display */}
                  <div className="text-xl font-medium text-gray-800 underline">
                    {time ? time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "00:00"}
                  </div>

                  {/* Increase Time Button */}
                  <button
                    onClick={() => {
                      if (time) {
                        const updatedTime = new Date(time);
                        updatedTime.setMinutes(updatedTime.getMinutes() + 15); // Increase by 15 minutes
                        setTime(updatedTime);
                      }
                    }}
                    className="text-[#078ECD] text-2xl font-bold px-2 hover:opacity-80"
                  >
                    +
                  </button>

                  {/* Now Button */}
                  <button
                    onClick={() => setTime(new Date())}
                    className="py-1 px-5 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-[#078ECD] hover:text-white transition"
                  >
                    Now
                  </button>
                </div>
              </div>
              {/* Apply Button */}
              <button
                onClick={handlePanelToggle}
                className="w-60 py-3 mx-6 rounded-full font-semibold bg-[#078ECD] text-white hover:bg-[#066a97] transition text-lg"
              >
                Apply
              </button>
            </div>
          </div>
        )}

      </div>
      {/* Filtered Schedule */}
      <div className="flex justify-between mb-4 px-2 text-lg font-semibold">
        <div className="text-center w-1/2">Arrival</div>
        <div className="text-center w-1/2">Departure</div>
      </div>
      <div className={`flex overflow-y-auto ${fullPage ? "h-4/5" : "h-60"} custom-scrollbar`}>
        <div className="w-1/2 pl-4 mr-5">
          <div className={`flex flex-col items-start ${fullPage ? "space-y-10" : "space-y-4"}`}>
            {filterSchedule().map((entry) => {
              const { type, batteryCapacity, length } = parseVehicleCode(entry.vehicleCode);
              return (
                <div key={entry.id} className="flex justify-between w-full">
                  <span className="font-semibold text-gray-700">{entry.id}</span>
                  {fullPage && (<span className="block text-sm text-gray-500">{type}</span>)}
                  {fullPage && (<span className="block text-sm text-gray-500">{batteryCapacity}</span>)}
                  {fullPage && (<span className="block text-sm text-gray-500">{length}</span>)}
                  <span className="font-medium text-gray-700">{entry.arrivalTime}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-l-2 border-gray-300 sticky top-0 h-full"></div>
        <div className="w-1/2 ml-4">
          <div className={`flex flex-col items-start ${fullPage ? "space-y-10" : "space-y-4"}`}>
            {filterSchedule().map((entry) => {
              const { type, batteryCapacity, length } = parseVehicleCode(entry.vehicleCode);
              return (
                <div key={entry.id} className="flex justify-between w-full">
                  <span className="font-semibold text-gray-700">{entry.id}</span>
                  {fullPage && (<span className="block text-sm text-gray-500">{type}</span>)}
                  {fullPage && (<span className="block text-sm text-gray-500">{batteryCapacity}</span>)}
                  {fullPage && (<span className="block text-sm text-gray-500">{length}</span>)}
                  <span className="font-medium text-gray-700">{entry.departureTime}</span>
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
