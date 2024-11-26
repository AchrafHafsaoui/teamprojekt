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
  fullPage?: boolean; // Controls height
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({ fullPage = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

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
    if (!startTime || !endTime) return scheduleData; // No filter if no start or end time selected

    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();

    return scheduleData.filter((entry) => {
      const [entryHours, entryMinutes] = entry.departureTime.split(":").map(Number);

      // Check if the departure time is within the range
      const isAfterStartTime =
        entryHours > startHours || (entryHours === startHours && entryMinutes >= startMinutes);
      const isBeforeEndTime =
        entryHours < endHours || (entryHours === endHours && entryMinutes <= endMinutes);

      return isAfterStartTime && isBeforeEndTime;
    });
  };

  return (
    <div
      className={`bg-[#FFFFFF] bg-opacity-80 flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ${fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
        }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Driving Schedule</h2>
      {/* Date and Time Picker */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block font-medium text-gray-700">Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Start Time:</label>
          <DatePicker
            selected={startTime}
            onChange={(time) => setStartTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15} // Allows selection in 15-minute intervals
            timeCaption="Start Time"
            dateFormat="HH:mm" // 24-hour format without AM/PM
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">End Time:</label>
          <DatePicker
            selected={endTime}
            onChange={(time) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15} // Allows selection in 15-minute intervals
            timeCaption="End Time"
            dateFormat="HH:mm" // 24-hour format without AM/PM
            className="border rounded-md p-2 w-full"
          />
        </div>
      </div>
      {/* Filtered Schedule */}
      <div className="flex justify-between mb-4 px-2 text-lg font-semibold">
        <div className="text-center w-1/2">Departure</div>
        <div className="text-center w-1/2">Arrival</div>
      </div>
      <div className={`flex overflow-y-auto ${fullPage ? "h-4/5" : "h-60"} custom-scrollbar`}>
        <div className="w-1/2 pr-4">
          <div className="flex flex-col items-start space-y-3">
            {filterSchedule().map((entry) => {
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
            {filterSchedule().map((entry) => {
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
