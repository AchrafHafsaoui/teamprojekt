import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type BusData = {
    busId: string;
    battery: number | null; // Allow null for placeholder items
};

const FleetStatus: React.FC = () => {
    const buses: BusData[] = [
        { busId: '23001', battery: 30 },
        { busId: '19101', battery: 70 },
        { busId: '15401', battery: 20 },
        { busId: '18757', battery: 95 },
        { busId: '19289', battery: 65 },
        { busId: '21001', battery: 50 },
        { busId: '22345', battery: 80 },
        { busId: '23456', battery: 45 },
        { busId: '24567', battery: 60 },
        { busId: '25678', battery: 90 },
        { busId: '26789', battery: 40 },
        { busId: '27890', battery: 55 },
        { busId: '28901', battery: 85 },
        { busId: '29012', battery: 30 },
        { busId: '30123', battery: 75 },
        { busId: '31234', battery: 50 },
        { busId: '32345', battery: 95 },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const indexOfFirstItem = currentPage * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    let currentBuses = buses.slice(indexOfFirstItem, indexOfLastItem);

    // Pad the currentBuses array with placeholders if it has fewer than itemsPerPage
    if (currentBuses.length < itemsPerPage) {
        currentBuses = [
            ...currentBuses,
            ...Array(itemsPerPage - currentBuses.length).fill({ busId: '', battery: null })
        ];
    }

    const data = {
        labels: currentBuses.map((bus) => bus.busId || ''), // Use empty labels for placeholders
        datasets: [
            {
                label: 'Battery Status (%)',
                data: currentBuses.map((bus) => bus.battery),
                backgroundColor: currentBuses.map((bus) => (bus.battery !== null ? 'rgb(7, 142, 205)' : 'transparent')), // Hide bars for placeholders
                borderRadius: 15,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `${tooltipItem.raw}%`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Removes vertical grid lines
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false, // Hides the numbers on the y-axis
                },
                grid: {
                    drawTicks: true,
                    color: '#e5e5e5',
                    lineWidth: 1,
                    borderDash: [5, 5],
                },
                border: {
                    display: false, // Removes the vertical y-axis line
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeOutCubic',
            delay: (context: any) => context.dataIndex * 200,
        },
    };
    
    

    const handleNextPage = () => {
        if (currentPage < Math.ceil(buses.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="bg-[#F1F1F1] rounded-lg w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Status of Fleet:</h2>
                <div className="flex spacFe-x-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className="disabled:opacity-50"
                    >
                        <svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.90679 21.1627L11.8289 30.5689L14.0591 28.2177L6.252 19.9872L14.0591 11.7566L11.8289 9.40546L2.90679 18.8116C2.61111 19.1234 2.44501 19.5463 2.44501 19.9872C2.44501 20.4281 2.61111 20.8509 2.90679 21.1627Z" fill="#5C5C5C" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(buses.length / itemsPerPage) - 1}
                        className="disabled:opacity-50"
                    >
                        <svg width="19" height="40" viewBox="0 0 12 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0776 14.9168L4.46484 21.5555L3.06189 19.8961L7.9732 14.0871L3.06189 8.27809L4.46484 6.61871L10.0776 13.2574C10.2636 13.4775 10.3681 13.7759 10.3681 14.0871C10.3681 14.3983 10.2636 14.6967 10.0776 14.9168Z" fill="#5C5C5C" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="h-full">
                <Bar key={currentPage} data={data} options={options} />
            </div>
        </div>

    );
};

export default FleetStatus;
