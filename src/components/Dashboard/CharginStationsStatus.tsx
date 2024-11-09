import React, { useState } from 'react';

// Icon source links for reference
// ✅ Green check: https://icons.example/green-check
// ⚠️ Wrench (maintenance): https://icons.example/wrench
// ❌ Red cross: https://icons.example/red-cross

interface ChargingStation {
  id: string;
  status: string;
  power: string;
}

const ChargingStationsStatus: React.FC = () => {
  // Define the state with initial data
  const [stations, setStations] = useState<ChargingStation[]>([
    { id: '111112', status: 'operational', power: '50 kW' },
    { id: '111115', status: 'maintenance', power: '-- kW' },
    { id: '111119', status: 'operational', power: '59 kW' },
    { id: '111175', status: 'out of service', power: '-- kW' },
    { id: '111190', status: 'operational', power: '70 kW' },
  ]);

  // Function to display icons based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <span role="img" aria-label="Operational">✅</span>;
      case 'maintenance':
        return <span role="img" aria-label="Maintenance">⚠️</span>;
      case 'out of service':
        return <span role="img" aria-label="Out of Service">❌</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 pl-4 pt-2">Status of Charging Stations:</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="w-1/3 text-left py-2 px-9">Station-ID</th>
            <th className="w-1/3 text-middle py-2 px-2">Status</th>
            <th className="w-1/3 text-left py-2 pl-9">Charging Power</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id} className="border-b">
              <td className="w-1/3 text-left py-2 px-9">{station.id}</td>
              <td className="w-1/3 text-center py-2 px-2">{getStatusIcon(station.status)}</td>
              <td className="w-1/3 text-left py-2 pl-9">{station.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChargingStationsStatus;
