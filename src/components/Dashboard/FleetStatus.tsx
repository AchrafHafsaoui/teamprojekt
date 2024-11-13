import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type BusData = {
    busId: string;
    battery: number;
    status: 'inDepot' | 'maintenance' | 'onRoute';
    charging: boolean;
};

const FleetStatus: React.FC = () => {
    const buses: BusData[] = [
        { busId: '23001', battery: 50, status: 'onRoute', charging: true },
        { busId: '19101', battery: 0, status: 'inDepot', charging: false },
        { busId: '15401', battery: 30, status: 'maintenance', charging: true },
        { busId: '18757', battery: 95, status: 'onRoute', charging: false },
        { busId: '19289', battery: 65, status: 'inDepot', charging: true },
        { busId: '21001', battery: 50, status: 'maintenance', charging: false },
        { busId: '22345', battery: 80, status: 'onRoute', charging: false },
        { busId: '23456', battery: 45, status: 'inDepot', charging: true },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [animatedValues, setAnimatedValues] = useState<number[]>(Array(buses.length).fill(0));
    const itemsPerPage = 8;

    const indexOfFirstItem = currentPage * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentBuses = buses.slice(indexOfFirstItem, indexOfLastItem);

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

    useEffect(() => {
        currentBuses.forEach((bus, index) => {
            let currentBattery = 0;
            const interval = setInterval(() => {
                if (currentBattery < bus.battery) {
                    currentBattery += 1;
                    setAnimatedValues((prevValues) => {
                        const newValues = [...prevValues];
                        newValues[index + indexOfFirstItem] = currentBattery;
                        return newValues;
                    });
                } else {
                    clearInterval(interval);
                }
            }, 15);
        });
    }, [currentPage]);

    const renderStatusIcon = (status: 'inDepot' | 'maintenance' | 'onRoute') => {
        switch (status) {
            case 'inDepot':
                return (
                    <svg fill="#000000" width="20" height="20" viewBox="0 0 512 512">
                        <rect x="72.097" y="403.885" width="367.816" height="38.864" />
                        <polygon points="256.001,0 0.26,150.209 0.26,512 41.706,512 41.706,165.743 470.294,165.743 470.294,512 511.74,512 511.74,150.209" />
                    </svg>
                );
            case 'maintenance':
                return (
                    <svg fill="#000000" width="20" height="20" viewBox="0 0 512 512">
                        <path d="M117.333333,48 C182.134744,48 234.666667,100.531923 234.666667,165.333333 C234.666667,177.516512 232.809822,189.266001 229.363697,200.314237 L346.710217,317.661885 C367.98629,338.937958 367.98629,373.433288 346.710217,394.709361 C325.434144,415.985434 290.938814,415.985434 269.662741,394.709361 L152.315234,277.363386 C141.266709,280.80971 129.516879,282.666667 117.333333,282.666667 C52.5319227,282.666667 7.10542736e-15,230.134744 7.10542736e-15,165.333333 C7.10542736e-15,152.827953 1.95635722,140.779505 5.57971243,129.477348 L61.0818825,184.888889 L111.319797,168.156815 C112.394454,166.856793 113.540203,165.595781 114.757044,164.37894 L116.379797,162.756188 C117.593198,161.542787 118.85052,160.400077 120.146646,159.328057 L136.888889,109.149054 L81.3212183,53.6298873 C92.6685218,49.9744211 104.770352,48 117.333333,48 Z M384,90.6666667 L384,218.666667 L341.333333,218.666667 L341.333333,90.6666667 L384,90.6666667 Z M362.666667,1.42108547e-14 C377.39426,1.42108547e-14 389.333333,11.9390733 389.333333,26.6666667 C389.333333,41.39426 377.39426,53.3333333 362.666667,53.3333333 C347.939073,53.3333333 336,41.39426 336,26.6666667 C336,11.9390733 347.939073,1.42108547e-14 362.666667,1.42108547e-14 Z" />
                    </svg>
                );
            case 'onRoute':
                return (
                    <svg fill="#000000" width="20" height="20" viewBox="0 0 64 64">
                        <path d="M52,0H12C5.375,0,0,5.371,0,12v40c0,2.211,1.789,4,4,4h4v4c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h24v4 c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h4c2.211,0,4-1.789,4-4V12C64,5.375,58.629,0,52,0z M16,44c-2.211,0-4-1.789-4-4 s1.789-4,4-4s4,1.789,4,4S18.211,44,16,44z M48,44c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S50.211,44,48,44z M56,24H8V12 c0-2.211,1.789-4,4-4h40c2.211,0,4,1.789,4,4V24z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#F1F1F1] col-span-3 bg-opacity-50 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4 flex-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold ">Fleet Status</h2>
                <div className="flex space-x-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0} className="disabled:opacity-50">
                        <svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.90679 21.1627L11.8289 30.5689L14.0591 28.2177L6.252 19.9872L14.0591 11.7566L11.8289 9.40546L2.90679 18.8116C2.61111 19.1234 2.44501 19.5463 2.44501 19.9872C2.44501 20.4281 2.61111 20.8509 2.90679 21.1627Z" fill="#5C5C5C" />
                        </svg>
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(buses.length / itemsPerPage) - 1} className="disabled:opacity-50">
                        <svg width="19" height="40" viewBox="0 0 12 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0776 14.9168L4.46484 21.5555L3.06189 19.8961L7.9732 14.0871L3.06189 8.27809L4.46484 6.61871L10.0776 13.2574C10.2636 13.4775 10.3681 13.7759 10.3681 14.0871C10.3681 14.3983 10.2636 14.6967 10.0776 14.9168Z" fill="#5C5C5C" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 h-full">
                {currentBuses.map((bus, index) => (
                    <div key={bus.busId} className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-1">{bus.busId}</h3>
                        <div style={{ width: '5vw', position: 'relative' }}>
                            <CircularProgressbar
                                value={animatedValues[index + indexOfFirstItem] || 0}
                                maxValue={100}
                                text={`${animatedValues[index + indexOfFirstItem] || 0}%`}
                                strokeWidth={10}
                                styles={buildStyles({
                                    pathColor: 'rgba(7, 142, 205, 0.8)',
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    textSize: '16px',
                                    strokeLinecap: 'round',
                                })}
                            />
                            <div className="absolute bottom-1 text-center font-bold" style={{ fontSize: '1rem' }}>
                                {renderStatusIcon(bus.status)}
                            </div>
                            {bus.charging && (
                                <div className="absolute inset-0 flex items-center justify-center animate-ping"
                                    style={{ animationDuration: '1.5s' }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full opacity-50"
                                        style={{ backgroundColor: 'rgb(7, 142, 205)' }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetStatus;
