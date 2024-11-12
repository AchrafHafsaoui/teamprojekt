import React from 'react';

const DrivingSchedule: React.FC = () => {
    const scheduleData = [
        { id: '10190', departureTime: '15:30', arrivalTime: '15:23' },
        { id: '10290', departureTime: '15:33', arrivalTime: '15:25' },
        { id: '10331', departureTime: '15:40', arrivalTime: '15:31' },
        { id: '19373', departureTime: '15:43', arrivalTime: '15:36' },
        { id: '19830', departureTime: '15:47', arrivalTime: '15:46' },
        { id: '20145', departureTime: '16:00', arrivalTime: '15:55' },
        { id: '20987', departureTime: '16:10', arrivalTime: '16:05' },
        { id: '21345', departureTime: '16:20', arrivalTime: '16:15' },
        { id: '21976', departureTime: '16:30', arrivalTime: '16:25' },
        { id: '22345', departureTime: '16:40', arrivalTime: '16:35' },
        { id: '22900', departureTime: '16:50', arrivalTime: '16:45' },
    ];

    return (
        <div className="bg-[#F1F1F1] bg-opacity-60 w-full h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
            <h2 className="text-2xl font-semibold">Driving Schedule</h2>
            <div className="flex justify-between my-2">
                {/* Column Headers */}
                <div className="w-1/2 text-center font-semibold">Departure</div>
                <div className="w-1/2 text-center font-semibold">Arrival</div>
            </div>
            {/* Scrollable Content */}
            <div className="flex justify-between overflow-auto h-60 custom-scrollbar">
                {/* Departure Column */}
                <div className="w-1/2">
                    <div className="flex flex-col items-center">
                        {scheduleData.map((entry) => (
                            <div key={entry.id} className="flex justify-between w-3/4 my-1">
                                <span className="font-bold">{entry.id}</span>
                                <span>{entry.departureTime}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Divider */}
                <div className="border-l border-gray-300"></div>
                {/* Arrival Column */}
                <div className="w-1/2">
                    <div className="flex flex-col items-center">
                        {scheduleData.map((entry) => (
                            <div key={entry.id} className="flex justify-between w-3/4 my-1">
                                <span className="font-bold">{entry.id}</span>
                                <span>{entry.arrivalTime}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrivingSchedule;
