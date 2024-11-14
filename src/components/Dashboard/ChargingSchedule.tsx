import React from 'react';

// Define a type for charging schedule entries
type ChargingEntry = {
    id: string;
    availability: string;
    cap: number; // Capacity Blocked in MW
    ene: number; // Energy Purchased in MWh (updated)
};

const ChargingSchedule: React.FC = () => {
    const chargingData: ChargingEntry[] = [
        { id: 'CH101', availability: 'Available', cap: 50, ene: 30 },
        { id: 'CH102', availability: 'Charging', cap: 40, ene: 25 },
        { id: 'CH103', availability: 'Unavailable', cap: 60, ene: 35 },
        { id: 'CH104', availability: 'Available', cap: 55, ene: 33 },
        { id: 'CH105', availability: 'Charging', cap: 45, ene: 28 },
        { id: 'CH106', availability: 'Available', cap: 50, ene: 32 },
        { id: 'CH107', availability: 'Unavailable', cap: 70, ene: 37 },
        { id: 'CH108', availability: 'Charging', cap: 42, ene: 29 },
        { id: 'CH109', availability: 'Available', cap: 55, ene: 34 },
        { id: 'CH110', availability: 'Charging', cap: 50, ene: 27 },
        { id: 'CH111', availability: 'Unavailable', cap: 65, ene: 36 },
        { id: 'CH112', availability: 'Available', cap: 53, ene: 31 },
        { id: 'CH113', availability: 'Charging', cap: 47, ene: 26 },
        // Add more entries as needed for testing
    ];

    return (
        <div className="bg-[#F1F1F1] bg-opacity-60 h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
            <h2 className="text-2xl font-semibold mb-4">Charging Schedule</h2>
            <div className="grid grid-cols-4 text-lg font-semibold mb-2">
                <div className="text-center">Vehicle ID</div>
                <div className="text-center">Availability</div>
                <div className="text-center">ENE (MWh)</div> {/* Updated label to MWh */}
                <div className="text-center">CAP (MW)</div>
            </div>
            <div className="overflow-y-auto h-60 custom-scrollbar">
                {chargingData.map((entry) => (
                    <div key={entry.id} className="grid grid-cols-4 text-center py-2 text-gray-700 font-medium">
                        <div>{entry.id}</div>
                        <div>{entry.availability}</div>
                        <div>{entry.ene}</div>
                        <div>{entry.cap}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChargingSchedule;
