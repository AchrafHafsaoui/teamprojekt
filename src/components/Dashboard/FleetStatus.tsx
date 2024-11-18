import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type VehicleData = {
    busId: string;
    battery: number;
    chargingStart: string | null; // Charging start time or null if not charging
    status: "Depot" | "Maintenance" | "Route";
    chargingLocation: string | null; // Combined charging station and point (e.g., A1, B23, A17) or null if not charging
    CAP: string;
    ENE: string;
};

type FleetStatusProps = {
    showAllColumns?: boolean; // Controls whether to show all columns
};

const FleetStatus: React.FC<FleetStatusProps> = ({ showAllColumns = true }) => {
    const vehicles: VehicleData[] = [
        {
            busId: "23001",
            battery: 50,
            chargingStart: "2024-11-18 08:00", // Example timestamp
            status: "Maintenance",
            chargingLocation: "A1", // Combined station and point
            CAP: "30MWh",
            ENE: "50MWh",
        },
        {
            busId: "19101",
            battery: 80,
            chargingStart: "2024-11-18 07:45",
            status: "Depot",
            chargingLocation: "B2",
            CAP: "20MWh",
            ENE: "30MWh",
        },
        {
            busId: "15401",
            battery: 30,
            chargingStart: null, // Not charging
            status: "Route",
            chargingLocation: null,
            CAP: "100MWh",
            ENE: "0MWh",
        },
        {
            busId: "18757",
            battery: 95,
            chargingStart: null,
            status: "Route",
            chargingLocation: null,
            CAP: "15MWh",
            ENE: "70MWh",
        },
        {
            busId: "19289",
            battery: 65,
            chargingStart: "2024-11-18 08:15",
            status: "Depot",
            chargingLocation: "C3",
            CAP: "30MWh",
            ENE: "10MWh",
        },
        {
            busId: "21001",
            battery: 50,
            chargingStart: "2024-11-18 08:10",
            status: "Maintenance",
            chargingLocation: "A4",
            CAP: "95MWh",
            ENE: "75MWh",
        },
        {
            busId: "22345",
            battery: 80,
            chargingStart: null,
            status: "Route",
            chargingLocation: null,
            CAP: "15MWh",
            ENE: "50MWh",
        },
        {
            busId: "23456",
            battery: 45,
            chargingStart: "2024-11-18 08:30",
            status: "Depot",
            chargingLocation: "B5",
            CAP: "0MWh",
            ENE: "40MWh",
        },
    ];

    const [filterStatus, setFilterStatus] = useState<"all" | "Depot" | "Maintenance" | "Route">("all");
    const [animatedValues, setAnimatedValues] = useState<number[]>(Array(vehicles.length).fill(0));
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesStatus = filterStatus === "all" || vehicle.status === filterStatus;
        const matchesSearch = !showAllColumns ||
            vehicle.busId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (vehicle.chargingLocation && vehicle.chargingLocation.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesStatus && matchesSearch;
    });


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
            <div className="flex items-center mb-4 w-full">
                <div className="flex-grow flex items-center">
                    <h2 className="text-2xl font-semibold">Fleet Status</h2>
                    {showAllColumns && (
                        <input
                            type="text"
                            placeholder="Search by Plate Number or Charging Point"
                            className="px-3 py-2 w-2/3 ml-10 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    )}
                </div>
                <div className="flex space-x-3">
                    {["all", "Depot", "Maintenance", "Route"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as typeof filterStatus)}
                            className={`px-3 py-1 rounded-lg border font-semibold border-[#cccccc] ${filterStatus === status ? "text-white" : "bg-[#ededed] text-gray-800"
                                } transition-colors`}
                            style={{
                                backgroundColor: filterStatus === status ? "rgba(7, 142, 205, 0.8)" : undefined,
                            }}
                        >
                            {status === "all" ? "All" : status}
                        </button>
                    ))}
                </div>
            </div>


            <div className={`overflow-x-hidden ${showAllColumns ? "h-svh" : "h-80"} custom-scrollbar`}>
                {/* Header Row */}
                <div className={`grid gap-4 font-bold text-lg mb-2 px-2 text-gray-600 text-center ${showAllColumns ? "grid-cols-7" : "grid-cols-5"}`}>
                    <div>Plate Number</div>
                    <div>Status</div>
                    <div>Charging Point</div>
                    <div>Session Start</div>
                    {showAllColumns && <div>CAP</div>}
                    {showAllColumns && <div>ENE</div>}
                    <div>Battery</div>
                </div>

                {/* Data Rows */}
                <div className="space-y-3">
                    {filteredVehicles.map((vehicle, index) => (
                        <div
                            key={vehicle.busId}
                            className={`grid gap-4 items-center text-gray-800 pb-3 shadow-sm font-semibold ${showAllColumns ? "grid-cols-7" : "grid-cols-5"
                                }`}
                        >
                            <span className="text-center">{vehicle.busId}</span>
                            <span className="text-center">{vehicle.status}</span>
                            <span className="text-center">{vehicle.chargingLocation || "N/A"}</span>
                            <span className="text-center">{vehicle.chargingStart || "N/A"}</span>
                            {showAllColumns && <span className="text-center">{vehicle.CAP}</span>}
                            {showAllColumns && <span className="text-center">{vehicle.ENE}</span>}
                            <div style={{ width: 75, position: "relative", margin: "0 auto" }}>
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
                                {vehicle.chargingStart && (
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
                                {vehicle.status == "Maintenance" && (<div className="absolute bottom-1 text-center font-bold" style={{ fontSize: '1rem' }}>
                                    <svg fill="#000000" width="20" height="20" viewBox="0 0 512 512">
                                        <path d="M117.333333,48 C182.134744,48 234.666667,100.531923 234.666667,165.333333 C234.666667,177.516512 232.809822,189.266001 229.363697,200.314237 L346.710217,317.661885 C367.98629,338.937958 367.98629,373.433288 346.710217,394.709361 C325.434144,415.985434 290.938814,415.985434 269.662741,394.709361 L152.315234,277.363386 C141.266709,280.80971 129.516879,282.666667 117.333333,282.666667 C52.5319227,282.666667 7.10542736e-15,230.134744 7.10542736e-15,165.333333 C7.10542736e-15,152.827953 1.95635722,140.779505 5.57971243,129.477348 L61.0818825,184.888889 L111.319797,168.156815 C112.394454,166.856793 113.540203,165.595781 114.757044,164.37894 L116.379797,162.756188 C117.593198,161.542787 118.85052,160.400077 120.146646,159.328057 L136.888889,109.149054 L81.3212183,53.6298873 C92.6685218,49.9744211 104.770352,48 117.333333,48 Z M384,90.6666667 L384,218.666667 L341.333333,218.666667 L341.333333,90.6666667 L384,90.6666667 Z M362.666667,1.42108547e-14 C377.39426,1.42108547e-14 389.333333,11.9390733 389.333333,26.6666667 C389.333333,41.39426 377.39426,53.3333333 362.666667,53.3333333 C347.939073,53.3333333 336,41.39426 336,26.6666667 C336,11.9390733 347.939073,1.42108547e-14 362.666667,1.42108547e-14 Z" />
                                    </svg>
                                </div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FleetStatus;
