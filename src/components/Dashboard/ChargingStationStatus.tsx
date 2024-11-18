import React, { useState, useEffect } from "react";

type ChargingStationData = {
  stationId: string;
  availability: "OK" | "Down" | "Maintenance";
  chargingPower: number;
};

const ChargingStationStatus: React.FC = () => {
  const stations: ChargingStationData[] = [
    { stationId: "ST01", availability: "OK", chargingPower: 100 },
    { stationId: "ST02", availability: "Down", chargingPower: 70 },
    { stationId: "ST03", availability: "Maintenance", chargingPower: 160 },
    { stationId: "ST04", availability: "OK", chargingPower: 200 },
    { stationId: "ST05", availability: "OK", chargingPower: 100 },
    { stationId: "ST06", availability: "Maintenance", chargingPower: 180 },
    { stationId: "ST07", availability: "Down", chargingPower: 40 },
    { stationId: "ST08", availability: "OK", chargingPower: 180 },
  ];

  const [filterStatus, setFilterStatus] = useState<
    "all" | "OK" | "Down" | "Maintenance"
  >("all");

  const [, setAnimatedSegments] = useState<number[]>([]);

  useEffect(() => {
    setAnimatedSegments(Array(20).fill(0)); // Initialize animated segments
  }, []);

  const filteredStations =
    filterStatus === "all"
      ? stations
      : stations.filter((station) => station.availability === filterStatus);

  const renderGraduatedBar = (chargingPower: number) => {
    const maxPower = 200; // Max value for full bar
    const segmentCount = 20; // Number of segments in the bar
    const segmentsToShow = Math.round(
      (chargingPower / maxPower) * segmentCount,
    );

    return (
      <div className="flex space-x-0.5 w-full">
        {Array.from({ length: segmentCount }).map((_, index) => (
          <div
            key={index}
            className={`h-6 rounded transition-colors duration-500`}
            style={{
              width: "4%", // Each segment takes 4% of the column width
              backgroundColor: index < segmentsToShow
                ? "#078ECD"
                : "#D3D3D3",
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#FFFFFF] bg-opacity-80 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Charging Station Status</h2>
        <div className="flex space-x-3">
          {["all", "OK", "Down", "Maintenance"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as typeof filterStatus)}
              className={`px-3 py-1 rounded-lg border font-semibold border-[#cccccc] ${filterStatus === status ? "text-white" : "bg-[#ededed] text-gray-800"} transition-colors`}
              style={{
                backgroundColor:
                  filterStatus === status
                    ? "rgba(7, 142, 205, 0.8)"
                    : undefined,
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto overflow-x-hidden h-80 custom-scrollbar">
        <div className="grid grid-cols-3 gap-4 font-bold text-lg mb-2 px-2 text-gray-600">
          <div className="text-center">Station ID</div>
          <div className="text-center">Availability</div>
          <div className="text-center">Charging Power</div>
        </div>
        <div className="space-y-3">
          {filteredStations.map((station) => (
            <div
              key={station.stationId}
              className="grid grid-cols-3 gap-4 items-center text-gray-800 pb-3 shadow-sm font-semibold"
            >
              <span className="text-center">{station.stationId}</span>
              <span className="text-center">{station.availability}</span>
              <div className="w-full">
                {renderGraduatedBar(station.chargingPower)}
                <div className="text-center font-semibold mt-1 text-sm">
                  {station.chargingPower} kW
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChargingStationStatus;
