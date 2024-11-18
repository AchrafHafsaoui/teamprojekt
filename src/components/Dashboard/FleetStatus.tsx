import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type VehicleData = {
  busId: string;
  availability: string;
  battery: number;
  status: "In Depot" | "In Maintenance" | "On Route";
  charging: boolean;
  CAP: string;
  ENE: string;
};

const FleetStatus: React.FC = () => {
  const vehicles: VehicleData[] = [
    {
      busId: "23001",
      availability: "Charging",
      battery: 50,
      status: "In Depot",
      charging: true,
      CAP: "30MWh",
      ENE: "50MWh",
    },
    {
      busId: "19101",
      availability: "Unvailable",
      battery: 0,
      status: "In Maintenance",
      charging: false,
      CAP: "20MWh",
      ENE: "30MWh",
    },
    {
      busId: "15401",
      availability: "Available",
      battery: 30,
      status: "On Route",
      charging: true,
      CAP: "100MWh",
      ENE: "0MWh",
    },
    {
      busId: "18757",
      availability: "Available",
      battery: 95,
      status: "On Route",
      charging: false,
      CAP: "15MWh",
      ENE: "70MWh",
    },
    {
      busId: "19289",
      availability: "Charging",
      battery: 65,
      status: "In Depot",
      charging: true,
      CAP: "30MWh",
      ENE: "10MWh",
    },
    {
      busId: "21001",
      availability: "Unvailable",
      battery: 50,
      status: "In Maintenance",
      charging: false,
      CAP: "95MWh",
      ENE: "75MWh",
    },
    {
      busId: "22345",
      availability: "Available",
      battery: 80,
      status: "On Route",
      charging: false,
      CAP: "15MWh",
      ENE: "50MWh",
    },
    {
      busId: "23456",
      availability: "Charging",
      battery: 45,
      status: "In Depot",
      charging: false,
      CAP: "0MWh",
      ENE: "40MWh",
    },
  ];

  const [filterStatus, setFilterStatus] = useState<
    "all" | "In Depot" | "In Maintenance" | "On Route"
  >("all");
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    Array(vehicles.length).fill(0),
  );

  // Filtered list of vehicles based on the selected filter
  const filteredVehicles =
    filterStatus === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.status === filterStatus);

  const renderStatusIcon = (
    status: "In Depot" | "In Maintenance" | "On Route",
  ) => {
    switch (status) {
      case "In Depot":
        return (
          <svg fill="#000000" width="20" height="20" viewBox="0 0 512 512">
            <rect x="72.097" y="403.885" width="367.816" height="38.864" />
            <polygon points="256.001,0 0.26,150.209 0.26,512 41.706,512 41.706,165.743 470.294,165.743 470.294,512 511.74,512 511.74,150.209" />
          </svg>
        );
      case "In Maintenance":
        return (
          <svg fill="#000000" width="20" height="20" viewBox="0 0 512 512">
            <path d="M117.333333,48 C182.134744,48 234.666667,100.531923 234.666667,165.333333 C234.666667,177.516512 232.809822,189.266001 229.363697,200.314237 L346.710217,317.661885 C367.98629,338.937958 367.98629,373.433288 346.710217,394.709361 C325.434144,415.985434 290.938814,415.985434 269.662741,394.709361 L152.315234,277.363386 C141.266709,280.80971 129.516879,282.666667 117.333333,282.666667 C52.5319227,282.666667 7.10542736e-15,230.134744 7.10542736e-15,165.333333 C7.10542736e-15,152.827953 1.95635722,140.779505 5.57971243,129.477348 L61.0818825,184.888889 L111.319797,168.156815 C112.394454,166.856793 113.540203,165.595781 114.757044,164.37894 L116.379797,162.756188 C117.593198,161.542787 118.85052,160.400077 120.146646,159.328057 L136.888889,109.149054 L81.3212183,53.6298873 C92.6685218,49.9744211 104.770352,48 117.333333,48 Z M384,90.6666667 L384,218.666667 L341.333333,218.666667 L341.333333,90.6666667 L384,90.6666667 Z M362.666667,1.42108547e-14 C377.39426,1.42108547e-14 389.333333,11.9390733 389.333333,26.6666667 C389.333333,41.39426 377.39426,53.3333333 362.666667,53.3333333 C347.939073,53.3333333 336,41.39426 336,26.6666667 C336,11.9390733 347.939073,1.42108547e-14 362.666667,1.42108547e-14 Z" />
          </svg>
        );
      case "On Route":
        return (
          <svg fill="#000000" width="20" height="20" viewBox="0 0 64 64">
            <path d="M52,0H12C5.375,0,0,5.371,0,12v40c0,2.211,1.789,4,4,4h4v4c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h24v4 c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h4c2.211,0,4-1.789,4-4V12C64,5.375,58.629,0,52,0z M16,44c-2.211,0-4-1.789-4-4 s1.789-4,4-4s4,1.789,4,4S18.211,44,16,44z M48,44c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S50.211,44,48,44z M56,24H8V12 c0-2.211,1.789-4,4-4h40c2.211,0,4,1.789,4,4V24z" />
          </svg>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    vehicles.forEach((vehicle, index) => {
      let currentBattery = 0;
      const interval = setInterval(() => {
        if (currentBattery < vehicle.battery) {
          currentBattery += 1;
          setAnimatedValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = currentBattery;
            return newValues;
          });
        } else {
          clearInterval(interval);
        }
      }, 15);
    });
  }, []);

  return (
    <div className="bg-[#FFFFFF] bg-opacity-80 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Fleet Status</h2>
        {/* Filter Buttons */}
        <div className="flex space-x-3">
          {["all", "In Depot", "In Maintenance", "On Route"].map((status) => (
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
              {status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-hidden h-80 custom-scrollbar">
        <div className="grid grid-cols-5 gap-4 font-bold text-lg mb-2 px-2 text-gray-600">
          <div className="text-center">Vehicule ID</div>
          <div className="text-center">Availability</div>
          <div className="text-center">ENE</div>
          <div className="text-center">CAP</div>
          <div className="text-center">Status</div>
        </div>
        <div className="space-y-3">
          {filteredVehicles.map((vehicle, index) => (
            <div
              key={vehicle.busId}
              className="grid grid-cols-5 gap-4 items-center text-gray-800 pb-3 shadow-sm font-semibold"
            >
              <span className="text-center">{vehicle.busId}</span>
              <span className="text-center">{vehicle.availability}</span>
              <span className="text-center">{vehicle.ENE}</span>
              <span className="text-center">{vehicle.CAP}</span>
              <div
                style={{ width: 75, position: "relative", margin: "0 auto" }}
              >
                <CircularProgressbar
                  value={animatedValues[index]}
                  maxValue={100}
                  text={`${animatedValues[index]}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    pathColor: "rgba(7, 142, 205, 0.8)",
                    textColor: "#000",
                    trailColor: "#d6d6d6",
                    textSize: "22px",
                    strokeLinecap: "round",
                  })}
                />
                {vehicle.charging && (
                  <div
                    className="absolute inset-0 flex items-center justify-center animate-ping"
                    style={{ animationDuration: "1.5s" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full opacity-50"
                      style={{ backgroundColor: "rgb(7, 142, 205)" }}
                    ></div>
                  </div>
                )}
                <div
                  className="absolute bottom-1 text-center font-bold"
                  style={{ fontSize: "1rem" }}
                >
                  {renderStatusIcon(vehicle.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetStatus;
