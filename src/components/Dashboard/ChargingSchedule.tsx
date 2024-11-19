import React from "react";

type ChargingVehicle = {
  vehicleId: string;
  chargingPower: number; // Current power being used for charging (kW)
  capacity: number; // Total battery capacity (kWh)
  energyUsed: number; // Energy already charged (kWh)
  energyRemaining: number; // Remaining energy needed to fully charge (kWh)
};

const ChargingSchedule: React.FC = () => {
  const vehicles: ChargingVehicle[] = [
    { vehicleId: "V001", chargingPower: 50, capacity: 200, energyUsed: 50, energyRemaining: 150 },
    { vehicleId: "V002", chargingPower: 40, capacity: 150, energyUsed: 30, energyRemaining: 120 },
    { vehicleId: "V003", chargingPower: 30, capacity: 100, energyUsed: 60, energyRemaining: 40 },
    { vehicleId: "V004", chargingPower: 70, capacity: 250, energyUsed: 100, energyRemaining: 150 },
    { vehicleId: "V005", chargingPower: 20, capacity: 80, energyUsed: 40, energyRemaining: 40 },
  ];

  // Calculate totals
  const totalEnergyUsed = vehicles.reduce((sum, vehicle) => sum + vehicle.energyUsed, 0);
  const totalEnergyRemaining = vehicles.reduce((sum, vehicle) => sum + vehicle.energyRemaining, 0);
  const totalChargingPower = vehicles.reduce((sum, vehicle) => sum + vehicle.chargingPower, 0);
  const totalCapacity = vehicles.reduce((sum, vehicle) => sum + vehicle.capacity, 0);

  // Flexibility ratios
  const upwardFlexibility = ((totalCapacity - totalEnergyUsed) / totalCapacity) * 100;
  const downwardFlexibility = (totalEnergyUsed / totalCapacity) * 100;

  return (
    <div className="bg-[#FFFFFF] bg-opacity-80 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Charging Schedule</h2>
        <div className="flex justify-between items-center">
          <p className="text-lg">
            Total Energy Used: <span className="font-bold">{totalEnergyUsed} kWh</span>
          </p>
          <p className="text-lg">
            Total Energy Remaining: <span className="font-bold">{totalEnergyRemaining} kWh</span>
          </p>
          <p className="text-lg">
            Total Charging Power: <span className="font-bold">{totalChargingPower} kW</span>
          </p>
        </div>
      </div>

      {/* Flexibility Ratios */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-grow bg-gray-200 h-6 rounded-lg overflow-hidden relative">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${upwardFlexibility}%` }}
            ></div>
          </div>
          <p className="text-blue-500 font-bold">
            Upward Flexibility: {upwardFlexibility.toFixed(2)}%
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex-grow bg-gray-200 h-6 rounded-lg overflow-hidden relative">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${downwardFlexibility}%` }}
            ></div>
          </div>
          <p className="text-green-500 font-bold">
            Downward Flexibility: {downwardFlexibility.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Vehicle Summary */}
      <div className="overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-5 gap-4 font-bold text-lg mb-4 text-gray-600 text-center">
          <div>Vehicle ID</div>
          <div>Charging Power (kW)</div>
          <div>Energy Used (kWh)</div>
          <div>Energy Remaining (kWh)</div>
          <div>Total Capacity (kWh)</div>
        </div>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.vehicleId}
            className="grid grid-cols-5 gap-4 items-center text-gray-800 py-2 text-center shadow-sm font-semibold"
          >
            <span>{vehicle.vehicleId}</span>
            <span>{vehicle.chargingPower}</span>
            <span>{vehicle.energyUsed}</span>
            <span>{vehicle.energyRemaining}</span>
            <span>{vehicle.capacity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargingSchedule;
