import React, { useState, useEffect } from "react";

type ChargingStationData = {
  stationId: string;
  availability: "OK" | "Down" | "Maintenance";
  chargingPower: number;
  maxPower: number;
};

type ChargingStationProps = {
  fullPage?: boolean; // Controls height
};

const ChargingStationStatus: React.FC<ChargingStationProps> = ({ fullPage = false }) => {
  const stations: ChargingStationData[] = [
    { stationId: "ST01", availability: "OK", chargingPower: 100, maxPower: 300 },
    { stationId: "ST02", availability: "Down", chargingPower: 70, maxPower: 200 },
    { stationId: "ST03", availability: "Maintenance", chargingPower: 160, maxPower: 400 },
    { stationId: "ST04", availability: "OK", chargingPower: 200, maxPower: 200 },
    { stationId: "ST05", availability: "OK", chargingPower: 100, maxPower: 150 },
    { stationId: "ST06", availability: "Maintenance", chargingPower: 180, maxPower: 200 },
    { stationId: "ST07", availability: "Down", chargingPower: 40, maxPower: 100 },
    { stationId: "ST08", availability: "OK", chargingPower: 180, maxPower: 500 },
  ];

  const [filterStatus, setFilterStatus] = useState<"all" | "OK" | "Down" | "Maintenance">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [animatedSegments, setAnimatedSegments] = useState<number[]>(Array(stations.length).fill(0));

  const segmentCount = 20; // Number of segments in the bar

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
      }, 100); // Animation speed
    });
  }, []);

  const filteredStations = stations.filter((station) => {
    const matchesStatus = filterStatus === "all" || station.availability === filterStatus;
    const matchesSearch = station.stationId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const renderGraduatedBar = (chargingPower: number, maxPower: number, stationIndex: number) => {
    const segmentsToShow = Math.round((chargingPower / maxPower) * segmentCount);

    return (
      <div className="flex space-x-0.5 w-full">
        {Array.from({ length: segmentCount }).map((_, index) => (
          <div
            key={index}
            className={`h-6 rounded transition-colors duration-500`}
            style={{
              width: "4%", // Each segment takes 4% of the column width
              backgroundColor:
                index < animatedSegments[stationIndex] && index < segmentsToShow
                  ? "#078ECD"
                  : "#D3D3D3",
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`bg-[#FFFFFF] bg-opacity-80 flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 overflow-hidden ${fullPage
        ? "ml-32 mt-12 mr-12 h-[calc(100vh-6rem)]"
        : "h-full"
        }`}
    >      <div className="flex items-center mb-4 w-full">
        <div className="flex-grow flex items-center">
          <h2 className="text-2xl font-semibold">Charging Station Status</h2>
          {fullPage && (
            <input
              type="text"
              placeholder="Search by Station ID"
              className="px-3 py-2 w-2/3 ml-10 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>
        <div className="flex space-x-3">
          {["all", "OK", "Down", "Maintenance"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as typeof filterStatus)}
              className={`px-3 py-1 rounded-lg border font-semibold border-[#cccccc] ${filterStatus === status ? "text-white" : "bg-[#ededed] text-gray-800"
                } transition-colors`}
              style={{
                backgroundColor: filterStatus === status ? "rgba(7, 142, 205, 0.8)" : undefined,
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={`overflow-y-auto overflow-x-hidden ${fullPage ? "h-4/5" : "h-80"} custom-scrollbar`}>
        <div className="grid grid-cols-4 gap-4 font-bold text-lg mb-2 px-2 text-gray-600">
          <div className="text-center">Station ID</div>
          <div className="text-center">Availability</div>
          <div className="text-center">Max Capacity</div>
          <div className="text-center">Charging Power</div>
        </div>
        <div className="space-y-3">
          {filteredStations.map((station, index) => (
            <div
              key={station.stationId}
              className="grid grid-cols-4 gap-4 items-center text-gray-800 pb-3 shadow-sm font-semibold mr-5"
            >
              <span className="text-center">{station.stationId}</span>
              <span className="text-center">{station.availability}</span>
              <span className="text-center">{station.maxPower} kW</span>
              <div className="w-full">
                {renderGraduatedBar(station.chargingPower, station.maxPower, index)}
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
