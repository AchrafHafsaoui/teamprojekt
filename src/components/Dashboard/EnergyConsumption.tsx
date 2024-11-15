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

// Sample data for daily energy consumption for each month
const monthlyData = [
    { month: 'Jan', values: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) },
    { month: 'Feb', values: Array.from({ length: 28 }, () => Math.floor(Math.random() * 100)) },
    { month: 'Mar', values: Array.from({ length: 31 }, () => Math.floor(Math.random() * 100)) },
    // Add more months as needed
];

const EnergyConsumption: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const currentMonthData = monthlyData[currentPage];
    const highestValue = Math.max(...currentMonthData.values);
    const lowestValue = Math.min(...currentMonthData.values);

    const data = {
        labels: currentMonthData.values.map((_, index) => `${currentMonthData.month} ${index + 1}`),
        datasets: [
            {
                label: 'Electricity Consumption (kWh)',
                data: currentMonthData.values,
                backgroundColor: currentMonthData.values.map((value) =>
                    value === highestValue || value === lowestValue ? 'rgb(7, 142, 205)' : 'rgba(0,0,0,0.7)'
                ),
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
                    label: (tooltipItem: any) => `${tooltipItem.raw} kWh`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    display: false,
                },
                grid: {
                    drawTicks: true,
                    color: '#e5e5e5',
                    lineWidth: 1,
                    borderDash: [5, 5],
                },
                border: {
                    display: false,
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeOutCubic' as const,
            delay: (context: any) => context.dataIndex * 20,
        },
    };

    const handleNextPage = () => {
        if (currentPage < monthlyData.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="h-full bg-opacity-60 flex flex-col bg-[#F1F1F1] border border-[#D3D3D3] shadow-md rounded-3xl p-4 flex-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Energy Consumption</h2>
                <div className="flex space-x-4">
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
                        disabled={currentPage === monthlyData.length - 1}
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

export default EnergyConsumption;
