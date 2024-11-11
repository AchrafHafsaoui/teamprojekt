import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type StationData = {
    stationId: string;
    status: 'Operational' | 'Maintenance' | 'Out Of Service';
    power: number;
};

const ChargingStationStatus: React.FC = () => {
    const stations: StationData[] = [
        { stationId: '1001', status: 'Operational', power: 50 },
        { stationId: '1002', status: 'Maintenance', power: 0 },
        { stationId: '1003', status: 'Operational', power: 30 },
        { stationId: '1004', status: 'Out Of Service', power: 0 },
        { stationId: '1005', status: 'Operational', power: 70 },
        { stationId: '1006', status: 'Operational', power: 66 },
        { stationId: '1007', status: 'Operational', power: 90 },
        { stationId: '1008', status: 'Operational', power: 81 },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Show only 3 stations per page

    const currentStations = stations.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < Math.ceil(stations.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // State to track the current animated value for each station
    const [animatedValues, setAnimatedValues] = useState<number[]>([]);

    const getStatusColor = (status: 'Operational' | 'Maintenance' | 'Out Of Service') => {
        switch (status) {
            case 'Operational':
                return '#4CAF50'; // Green
            case 'Maintenance':
                return '#FF9800'; // Orange
            case 'Out Of Service':
                return '#F44336'; // Red
            default:
                return '#BDBDBD'; // Gray
        }
    };

    useEffect(() => {
        // Start animation for each station's charging power
        const newAnimatedValues = currentStations.map((station) => {
            let startValue = 0;
            const targetValue = station.status === 'Operational' ? station.power : 0;
            const duration = 1500; // Animation duration (in ms)
            let startTime: number | null = null;

            // Function to animate the progress bar
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;
                if (progress < 1) {
                    setAnimatedValues((prevValues) => [
                        ...prevValues.filter((_, index) => index !== currentStations.indexOf(station)),
                        startValue + (targetValue - startValue) * progress,
                    ]);
                    requestAnimationFrame(animate);
                } else {
                    setAnimatedValues((prevValues) => [
                        ...prevValues.filter((_, index) => index !== currentStations.indexOf(station)),
                        targetValue,
                    ]);
                }
            };

            requestAnimationFrame(animate);

            return targetValue;
        });

        setAnimatedValues(newAnimatedValues);
    }, [currentPage, currentStations]);

    return (
        <div className="bg-[#F1F1F1] w-full h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Charging Station Status</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentStations.map((station, index) => (
                    <div
                        key={station.stationId}
                        className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                    >
                        <h3 className="text-lg font-semibold">{`Station ID: ${station.stationId}`}</h3>
                        <div className="w-24 h-24 mb-4">
                            <CircularProgressbar
                                value={animatedValues[index] || 0}
                                maxValue={100}
                                text={`${station.status === 'Operational' ? animatedValues[index]?.toFixed(0) : 0} kW`}
                                strokeWidth={10}
                                styles={{
                                    path: {
                                        stroke: getStatusColor(station.status),
                                    },
                                    text: {
                                        fill: getStatusColor(station.status),
                                        fontSize: '12px',
                                    },
                                }}
                            />
                        </div>
                        <p>Status: {station.status}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className="disabled:opacity-50 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(stations.length / itemsPerPage) - 1}
                    className="disabled:opacity-50 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ChargingStationStatus;
