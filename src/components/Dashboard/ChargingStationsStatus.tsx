import React, { useState } from 'react';

interface ChargingStation {
  id: string;
  status: string;
  power: string;
}

const ChargingStationsStatus: React.FC = () => {
  // Define the state with initial data
  const [stations, setStations] = useState<ChargingStation[]>([
    { id: '111112', status: 'Operational', power: '50 kW' },
    { id: '111115', status: 'Maintenance', power: '-- kW' },
    { id: '111119', status: 'Operational', power: '59 kW' },
    { id: '111175', status: 'Out Of Service', power: '-- kW' },
    { id: '111190', status: 'Operational', power: '70 kW' },
    { id: '111193', status: 'Maintenance', power: '-- kW' },
    { id: '111198', status: 'Operational', power: '45 kW' },
    { id: '111200', status: 'Out Of Service', power: '-- kW' },
    { id: '111203', status: 'Operational', power: '60 kW' },
    { id: '111207', status: 'Operational', power: '55 kW' },
    { id: '111210', status: 'Maintenance', power: '-- kW' },
    { id: '111214', status: 'Out Of Service', power: '-- kW' },
    { id: '111218', status: 'Operational', power: '52 kW' },
    { id: '111222', status: 'Operational', power: '63 kW' },
    { id: '111225', status: 'Maintenance', power: '-- kW' },
    { id: '111229', status: 'Out Of Service', power: '-- kW' },
    { id: '111233', status: 'Operational', power: '48 kW' },
]);


  // Function to display icons based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operational":
        return "✅";
      case "Maintenance":
        return "⚠️";
      case "Out Of Service":
        return "❌";
      default:
        return "";
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the buses to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = stations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(stations.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-3xl p-4'>
      <h2 className="text-lg font-semibold mb-2">Charging Stations Status</h2>
      <table className="min-w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/3 text-center p-2">ID</th>
            <th className="w-1/3 text-center p-2">Status</th>
            <th className="w-1/3 text-center p-2">Power</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((station) => (
            <tr key={station.id} className="text-center border-b">
              <td className="w-1/3 text-center p-2">{station.id}</td>
              <td className="w-1/3 text-center p-2">
                <div className="flex items-center justify-center space-x-2">
                  <span title={station.status} className="text-2xl">{getStatusIcon(station.status)}</span>
                </div>
              </td>
              <td className="w-1/3 text-center p-2">{station.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>showing: {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, stations.length)} of {stations.length}</span>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            className={`text-blue-500 hover:underline ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            previous
          </button>
          <button
            onClick={handleNextPage}
            className={`text-blue-500 hover:underline ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargingStationsStatus;