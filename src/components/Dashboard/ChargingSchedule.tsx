import React, { useState, useEffect } from "react";

// SVG for the bus
const BusSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#078ECD"
    viewBox="0 0 24 24"
    className="w-9 h-9"
  >
    <path d="M20 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a3 3 0 1 0 6 0h2a3 3 0 1 0 6 0h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM4 9V7h6v2Zm10 0V7h6v2Zm-6 4v-2h6v2Z" />
  </svg>
);

interface Bus {
  id: number;
  station: string;
  maxCapacity: number;
  currentCharging: number;
  remainingTime: number;
  scheduledStart: Date;
}

const ChargingSchedule: React.FC = () => {
  const stations = [
    { id: "A", chargingPoints: 8 },
    { id: "B", chargingPoints: 8 },
    { id: "C", chargingPoints: 8 },
    { id: "D", chargingPoints: 8 },
    { id: "E", chargingPoints: 8 },
    { id: "F", chargingPoints: 8 },
    { id: "G", chargingPoints: 8 },
    { id: "H", chargingPoints: 8 },
  ];

  const [chargingPoints, setChargingPoints] = useState<{
    [key: string]: (number | null)[];
  }>({
    A: [10091, null, 12307, null, null, null, null, null],
    B: [16785, null, 14311, null, 15006, null, null, null],
    C: [null, 16220, null, null, null, null, null, null],
    D: [17899, null, null, null, null, null, null, null],
    E: [18456, null, null, null, null, null, null, null],
    F: [19422, null, null, null, null, null, null, null],
    G: [null, null, 20311, null, null, null, null, null],
    H: [21290, null, null, null, null, null, null, null],
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
      station: "C",
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
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) =>
          bus.remainingTime > 0
            ? {
                ...bus,
                remainingTime: bus.remainingTime - 1,
                currentCharging: Math.min(bus.currentCharging + 1, bus.maxCapacity),
              }
            : bus
        )
      );
    }, 1000); // Exact 1-second interval
  
    return () => clearInterval(interval);
  }, []);
  
  const renderStations = () => {
    return stations.map((station) => (
      <div
        key={station.id}
        className="bg-secondaryColor border border-borderColor p-2 rounded-2xl shadow-xl relative w-full flex flex-col items-center"
      >
        <h3 className="text-lg font-semibold mb-6 text-center">
          Station {station.id}
        </h3>
        <div className="grid grid-cols-8 gap-4">
          {Array.from({ length: station.chargingPoints }).map((_, index) => {
            const busId = chargingPoints[station.id][index];
            const bus = buses.find((b) => b.id === busId);
            const remainingTime =
              bus && bus.currentCharging < bus.maxCapacity
                ? ((bus.maxCapacity - bus.currentCharging) / 5) * 3 // time in seconds
                : 0;

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-200 rounded-full w-12 h-12 border border-borderColor relative"
              >
                {busId && (
                  <>
                    <span className="absolute -top-6 text-sm font-semibold">
                      {busId}
                    </span>
                    <BusSVG />
                    <span className="absolute -bottom-6 text-xs text-gray-700">
                      {remainingTime > 0
                        ? `${Math.floor(remainingTime / 60)}m ${remainingTime % 60}s`
                        : "Done"}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ));
  };


  const renderChargingQueue = () => {
    return (
      <div className="w-1/6 flex flex-col shadow-lg rounded-2xl py-4 px-2 border border-borderColor"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(7, 68, 84, 1) 60%)",
        }}>
        <h3 className="text-2xl font-semibold mb-4 text-center text-secondaryColor">
          Charging Queue
        </h3>
        <div className="flex flex-col justify-center gap-4">
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
    <div className={`flex ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]}`}>
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
