import React from 'react';

// Icon source links for reference
// ✅ Green check: https://icons.example/green-check
// ⚠️ Wrench (maintenance): https://icons.example/wrench
// ❌ Red cross: https://icons.example/red-cross

const ChargingStationsStatus: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Status of Charging Stations:</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left py-2 px-2">Station-ID</th>
            <th className="text-left py-2 px-2">Status</th>
            <th className="text-left py-2 px-2">Charging Power</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample rows */}
          <tr className="border-b">
            <td className="py-2 px-2">111112</td>
            <td className="py-2 px-2">
              <span role="img" aria-label="Operational">✅</span>
            </td>
            <td className="py-2 px-2">50 kW</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-2">111115</td>
            <td className="py-2 px-2">
              <span role="img" aria-label="Maintenance">⚠️</span>
            </td>
            <td className="py-2 px-2">-- kW</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-2">111119</td>
            <td className="py-2 px-2">
              <span role="img" aria-label="Operational">✅</span>
            </td>
            <td className="py-2 px-2">59 kW</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-2">111175</td>
            <td className="py-2 px-2">
              <span role="img" aria-label="Out of Service">❌</span>
            </td>
            <td className="py-2 px-2">-- kW</td>
          </tr>
          <tr>
            <td className="py-2 px-2">111190</td>
            <td className="py-2 px-2">
              <span role="img" aria-label="Operational">✅</span>
            </td>
            <td className="py-2 px-2">70 kW</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChargingStationsStatus;
