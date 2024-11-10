import React, { useState } from 'react';

type BusData = {
    busId: string;
    status: string;
    VehicleType: string;
};

// Helper function to select icon based on status
const AvailablityIcon = (status: string) => {
    switch (status) {
        case "Available":
            return "✅";
        case "not Available":
            return "❌";
        default:
            return "";
    }
};


const DrivingSchedule: React.FC = () => {
    // Define dummy data for 13 buses
    const [buses, setBuses] = useState<BusData[]>([
        { busId: '111112', status: 'Available', VehicleType: 'Bus' },
        { busId: '111115', status: 'Available', VehicleType: 'Bus' },
        { busId: '111119', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111175', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111190', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111200', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111201', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111202', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111203', status: 'Available', VehicleType: 'Bus' },
        { busId: '111204', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111205', status: 'Available', VehicleType: 'Bus' },
        { busId: '111206', status: 'not Available', VehicleType: 'Bus' },
        { busId: '111207', status: 'Available', VehicleType: 'Bus' },
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
            <h2 className="text-lg font-semibold mb-2">Driving Schedule</h2>
            <table className="min-w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/3 text-center p-2">ID</th>
                        <th className="w-1/3 text-center p-2">Availability</th>
                        <th className="w-1/3 text-center p-2">VehicleType</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((bus, index) => (
                        <tr key={index} className="text-center border-b">
                            <td className="w-1/3 text-center p-2">{bus.busId}</td>
                            <td className="w-1/3 text-center p-2">
                                <div className="flex items-center justify-center space-x-2">
                                    <span title={bus.status} className="text-2xl">{AvailablityIcon(bus.status)}</span>
                                </div>
                            </td>
                            <td className="w-1/3 text-center p-2">{bus.VehicleType}</td>
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





export default DrivingSchedule; 