import React, { useState } from 'react';

type BusData = {
    busId: string;
    status: string;
    Battery: string;
};

// Helper function to select icon based on status
const getStatusIcon = (status: string) => {
    switch (status) {
        case "In Depot":
            return "🏭";
        case "On Route":
            return "🛣";
        case "In Maintenance":
            return "🛠️";
        default:
            return "";
    }
};

const FleetStatus: React.FC = () => {
    // Define dummy data for 13 buses
    const [buses, setBuses] = useState<BusData[]>([
        { busId: '111112', status: 'On Route', Battery: '72%' },
        { busId: '111115', status: 'In Maintenance', Battery: '--' },
        { busId: '111119', status: 'In Depot', Battery: '55%' },
        { busId: '111175', status: 'In Depot', Battery: '5%' },
        { busId: '111190', status: 'On Route', Battery: '35%' },
        { busId: '111200', status: 'On Route', Battery: '50%' },
        { busId: '111201', status: 'In Maintenance', Battery: '--' },
        { busId: '111202', status: 'In Depot', Battery: '45%' },
        { busId: '111203', status: 'In Depot', Battery: '10%' },
        { busId: '111204', status: 'On Route', Battery: '25%' },
        { busId: '111205', status: 'In Maintenance', Battery: '--' },
        { busId: '111206', status: 'In Depot', Battery: '65%' },
        { busId: '111207', status: 'On Route', Battery: '15%' },
    ]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the buses to display based on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = buses.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(buses.length / itemsPerPage);

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
        <div>
            <h2 className="text-lg font-semibold mb-2">Fleet Status</h2>
            <table className="min-w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/3 text-center p-2">ID</th>
                        <th className="w-1/3 text-center p-2">Status</th>
                        <th className="w-1/3 text-center p-2">Battery</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((bus, index) => (
                        <tr key={index} className="text-center border-b">
                            <td className="w-1/3 text-center p-2">{bus.busId}</td>
                            <td className="w-1/3 text-center p-2">
                                <div className="flex items-center justify-center space-x-2">
                                    <span title={bus.status} className="text-2xl">{getStatusIcon(bus.status)}</span>
                                </div>
                            </td>
                            <td className="w-1/3 text-center p-2">{bus.Battery}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>showing: {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, buses.length)} of {buses.length}</span>
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

export default FleetStatus;
