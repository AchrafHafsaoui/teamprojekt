import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import apiClient, { updateContextValues } from "../api/api";
import API_ROUTES from "../apiRoutes";
import { useNavigate } from "react-router-dom";

// SVG for the bus
const BusSVG = () => (
  <svg
    width="30"
    fill="#078ECD"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M12 0C5.4375 0 3 2.167969 3 8L3 41C3 42.359375 3.398438 43.339844 4 44.0625L4 47C4 48.652344 5.347656 50 7 50L11 50C12.652344 50 14 48.652344 14 47L14 46L36 46L36 47C36 48.652344 37.347656 50 39 50L43 50C44.652344 50 46 48.652344 46 47L46 44.0625C46.601563 43.339844 47 42.359375 47 41L47 9C47 4.644531 46.460938 0 40 0 Z M 15 4L36 4C36.554688 4 37 4.449219 37 5L37 7C37 7.550781 36.554688 8 36 8L15 8C14.449219 8 14 7.550781 14 7L14 5C14 4.449219 14.449219 4 15 4 Z M 11 11L39 11C41 11 42 12 42 14L42 26C42 28 40.046875 28.9375 39 28.9375L11 29C9 29 8 28 8 26L8 14C8 12 9 11 11 11 Z M 2 12C0.898438 12 0 12.898438 0 14L0 22C0 23.101563 0.898438 24 2 24 Z M 48 12L48 24C49.105469 24 50 23.101563 50 22L50 14C50 12.898438 49.105469 12 48 12 Z M 11.5 34C13.433594 34 15 35.566406 15 37.5C15 39.433594 13.433594 41 11.5 41C9.566406 41 8 39.433594 8 37.5C8 35.566406 9.566406 34 11.5 34 Z M 38.5 34C40.433594 34 42 35.566406 42 37.5C42 39.433594 40.433594 41 38.5 41C36.566406 41 35 39.433594 35 37.5C35 35.566406 36.566406 34 38.5 34Z"></path>
    </g>
  </svg>
);

type StationData = {
  station_id: string;
  availability: "OK" | "Down" | "Maintenance";
  charging_power: number;
  max_power: number;
};

interface Bus {
  id: number;
  station: string;
  maxCapacity: number;
  currentCharging: number;
  remainingTime: number;
  scheduledStart: Date;
}

const ChargingSchedule: React.FC = () => {
  const [stations, setStations] = useState<StationData[]>([]);
  const fetchStations = async () => {
    try {
      const response = await axios.get<StationData[]>(API_ROUTES.GET_STATIONS); // Fetch from API
      setStations(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    fetchStations();
    // Optional: Polling to refresh data every 10 seconds
    const interval = setInterval(fetchStations, 60000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [chargingPoints] = useState<{
    [key: string]: (number | null)[];
  }>({
    A: [10091, null, 12307, null],
    B: [16785, null, 14311, null],
    C: [null, 16220, null, null],
    D: [17899, null, null, 11397],
    E: [18456, null, 15600, null],
    F: [null, 19422, null, null],
    G: [null, null, 20311, null],
    H: [21290, null, 13534, null],
  });

  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 10091,
      station: "A",
      maxCapacity: 100,
      currentCharging: 50,
      remainingTime: 50,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes from now
    },
    {
      id: 12307,
      station: "A",
      maxCapacity: 100,
      currentCharging: 70,
      remainingTime: 30,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes from now
    },
    {
      id: 16785,
      station: "B",
      maxCapacity: 100,
      currentCharging: 60,
      remainingTime: 40,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
    },
    {
      id: 14311,
      station: "B",
      maxCapacity: 100,
      currentCharging: 80,
      remainingTime: 20,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 8), // 8 minutes from now
    },
    {
      id: 15006,
      station: "B",
      maxCapacity: 100,
      currentCharging: 90,
      remainingTime: 10,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 20), // 20 minutes from now
    },
    {
      id: 16220,
      station: "C",
      maxCapacity: 100,
      currentCharging: 40,
      remainingTime: 60,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 12), // 12 minutes from now
    },
    {
      id: 17899,
      station: "D",
      maxCapacity: 100,
      currentCharging: 0,
      remainingTime: 100,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 18), // 18 minutes from now
    },
    {
      id: 18456,
      station: "D",
      maxCapacity: 100,
      currentCharging: 20,
      remainingTime: 80,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 25), // 25 minutes from now
    },
    {
      id: 19422,
      station: "F",
      maxCapacity: 100,
      currentCharging: 20,
      remainingTime: 80,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 25), // 25 minutes from now
    },
    {
      id: 20311,
      station: "G",
      maxCapacity: 100,
      currentCharging: 20,
      remainingTime: 80,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 25), // 25 minutes from now
    },
    {
      id: 21290,
      station: "H",
      maxCapacity: 100,
      currentCharging: 20,
      remainingTime: 80,
      scheduledStart: new Date(Date.now() + 1000 * 60 * 25), // 25 minutes from now
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) =>
          bus.remainingTime > 0
            ? {
                ...bus,
                remainingTime: bus.remainingTime - 1,
                currentCharging: Math.min(
                  bus.currentCharging + 1,
                  bus.maxCapacity
                ),
              }
            : bus
        )
      );
    }, 1000); // Exact 1-second interval

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  const { setAuth, auth } = useAuth();
  type AuthReq = {
    message: string;
  };
  const checkAuth = async () => {
    updateContextValues(setAuth, auth);
    try {
      const res = await apiClient.post<AuthReq>(API_ROUTES.IS_AUTH, {
        role: 20,
      });
      console.log(res.data);
      if (res.data.message != "Authorized access") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Is auth error :", error);
    }
  };

  useEffect(() => {
    if (auth.access !== null || localStorage.getItem("refresh token")) {
      checkAuth();
    } else navigate("/login", { replace: true });
  }, []);

  const renderStations = () => {
    return stations.map((station, index) => {
      return (
        <div
          key={station.station_id}
          className="bg-secondaryColor border border-borderColor p-4 rounded-2xl shadow-xl relative w-full flex flex-row"
        >
          {/* Left Part: Station Information */}
          <div className="w-1/2 flex flex-col items-start px-4">
            <h3 className="text-3xl text-primaryColor font-semibold mb-4">
              Station {station.station_id}
            </h3>
            <p className="text-md text-black">
              <span className="font-semibold">Current Capacity:</span>{" "}
              {station.charging_power} kWh
            </p>
            <p className="text-md text-black mb-4">
              <span className="font-semibold">Max Capacity:</span>{" "}
              {station.max_power} kWh
            </p>
            {renderGraduatedBar(
              station.charging_power,
              station.max_power,
              index
            )}
          </div>

          {/* Right Part: Charging Spots */}
          <div className="w-1/2 grid grid-cols-4 gap-5 items-center">
            {Array.from({ length: 4 }).map((_, index) => {
              //console.log(chargingPoints[station.station_id][index])
              //const busId = chargingPoints[station.station_id][index];
              //const bus = buses.find((b) => b.id === busId);
              //const remainingTime = bus?.remainingTime;
              const remainingTime = 90;
              // Format remaining time
              let formattedTime = "";
              if (remainingTime !== undefined) {
                if (remainingTime < 60) {
                  formattedTime = `${remainingTime}s`; // Seconds
                } else if (remainingTime < 3600) {
                  formattedTime = `${Math.floor(remainingTime / 60)}m`; // Minutes
                } else {
                  formattedTime = `${Math.floor(remainingTime / 3600)}h`; // Hours
                }
              }

              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center bg-secondaryColor rounded-full w-12 h-12 border border-borderColor relative"
                >
                  {
                    <>
                      <span className="absolute -top-6 text-sm font-semibold">
                        Bus ID
                      </span>
                      <BusSVG />
                      <span className="absolute -bottom-6 text-xs text-gray-700">
                        {formattedTime}
                      </span>
                    </>
                  }
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const segmentCount = 20; // Number of segments in the bar
  const [animatedSegments, setAnimatedSegments] = useState<number[]>(
    Array(stations.length).fill(0)
  );

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
      }, 50); // Animation speed
    });
  }, []);

  const renderGraduatedBar = (
    chargingPower: number,
    maxPower: number,
    stationIndex: number
  ) => {
    const segmentsToShow = Math.round(
      (chargingPower / maxPower) * segmentCount
    );
    return (
      <div className="flex space-x-0.5 w-full items-center">
        {Array.from({ length: segmentCount }).map((_, index) => (
          <div
            key={index}
            className={`h-6 rounded transition-colors duration-500`}
            style={{
              width: "4%", // Each segment takes 4% of the column width
              backgroundColor: index < segmentsToShow ? "#078ECD" : "#D3D3D3",
            }}
          ></div>
        ))}
      </div>
    );
  };

  const renderChargingQueue = () => {
    return (
      <div
        className="w-1/6 flex flex-col shadow-lg rounded-2xl py-4 px-2 border border-borderColor "
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(7, 68, 84, 1) 60%)",
        }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-center text-secondaryColor">
          Charging Queue
        </h3>
        <div className="flex flex-col justify-center gap-4 overflow-y-auto custom-scrollbar">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="flex flex-row justify-between items-center rounded-lg pl-1 text-secondaryColor hover:text-primaryColor hover:bg-secondaryColor py-2 px-4"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-secondaryColor rounded-full w-12 h-12 mr-4">
                  <BusSVG />
                </div>
                <h2 className="text-lg font-bold">{bus.id}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  Starts:{" "}
                  {bus.scheduledStart.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]`}>
      {/* Left Panel */}
      <div className="flex-grow grid grid-cols-2 gap-4 rounded-2xl mr-4">
        {renderStations()}
      </div>

      {/* Right Panel */}
      {renderChargingQueue()}
    </div>
  );
};

export default ChargingSchedule;
