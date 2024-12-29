import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import API_ROUTES from '../apiRoutes';

type Location = {
  description: string;
  location_name: string | null;
};

type Bus = {
  bus_id: string;
  battery_capacity: string;
};

type ScheduleEntry = {
  id: string;
  departure_time: string;
  arrival_time: string;
  departure_location: Location;
  arrival_location: Location;
  bus: Bus | null;
};

type DrivingScheduleProps = {
  fullPage?: boolean;
};

const DrivingSchedule: React.FC<DrivingScheduleProps> = ({ fullPage = false }) => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const fetchSchedules = async () => {
    try {
      const response = await axios.get<ScheduleEntry[]>(API_ROUTES.GET_DRIVING_SCHEDULES); // Fetch from API
      console.log(response.data[3].id); // Update state with fetched data
      setSchedules(response.data)
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchSchedules();

    // Optional: Polling to refresh data every 10 seconds
    const interval = setInterval(fetchSchedules, 60000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for panel visibility
  const [activeButton, setActiveButton] = useState("Departure"); // Default active button

  const filterSchedule = () => {
    if (!time) return schedules; // No filter if no start or end time selected

    const startHours = time.getHours();
    const startMinutes = time.getMinutes();

    return schedules.filter((entry) => {
      const [entryHours, entryMinutes] = entry.departure_time.split(":").map(Number);

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
      className={`bg-secondaryColor bg-opacity-80 flex flex-col border border-borderColor shadow-md rounded-3xl p-4 overflow-hidden ${fullPage ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]" : "h-full"
        }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-2 text-primaryColor">Driving Schedule</h2>
        {/* Select Date Button */}
        {fullPage && (<button
          onClick={handlePanelToggle}
          className="bg-componentsColor border border-borderColor text-black px-4 py-2 rounded-lg hover:bg-primaryColor hover:text-white transition-all font-semibold"
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
              <h2 className="text-xl font-bold text-primaryColor text-center">Select Date & Time</h2>
              <div className="flex space-x-2 my-4 justify-center">
                {/* Departure Button */}
                <button
                  onClick={() => setActiveButton("Departure")}
                  className={`py-1 px-3 rounded-lg text-sm font-semibold transition ${activeButton === "Departure"
                    ? "bg-primaryColor text-white"
                    : "bg-componentsColor border border-borderColor text-black hover:bg-primaryColor hover:text-white"
                    }`}
                >
                  Departure
                </button>

                {/* Arrival Button */}
                <button
                  onClick={() => setActiveButton("Arrival")}
                  className={`py-1 px-3 rounded-lg text-sm font-semibold transition ${activeButton === "Arrival"
                    ? "bg-primaryColor text-white"
                    : "bg-componentsColor border border-borderColor text-black hover:bg-primaryColor hover:text-white"
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
                    className="text-primaryColor text-2xl font-bold px-2 hover:opacity-80"
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
                    className="text-primaryColor text-2xl font-bold px-2 hover:opacity-80"
                  >
                    +
                  </button>

                  {/* Now Button */}
                  <button
                    onClick={() => setTime(new Date())}
                    className="py-1 px-5 border border-borderColor bg-componentsColor text-black font-semibold rounded-lg hover:bg-primaryColor hover:text-white transition"
                  >
                    Now
                  </button>
                </div>
              </div>
              {/* Apply Button */}
              <button
                onClick={handlePanelToggle}
                className="w-60 py-3 mx-6 rounded-lg font-semibold border border-borderColor bg-primaryColor text-white text-lg"
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
        <div className="border-l-2 border-borderColor sticky top-0 h-full"></div>
        <div className="w-1/2 ml-4">
          <div className={`flex flex-col items-start ${fullPage ? "space-y-10" : "space-y-4"}`}>
            {filterSchedule().map((entry) => (
              <div key={entry.id} className="flex justify-between w-full">
                <span className="font-semibold text-gray-700">{entry.id}</span>
                <span className="font-medium text-gray-700">{entry.departure_time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchedule;
