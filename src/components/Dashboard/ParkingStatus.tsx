import React, { useRef } from 'react';

type ParkingSpace = {
    id: string;
    isOccupied: boolean;
    blocks: string[]; // IDs of spaces this one blocks
};

const ParkingStatus: React.FC = () => {
    const parkingSpaces: ParkingSpace[] = [
        { id: 'A', isOccupied: true, blocks: ['B'] },
        { id: 'B', isOccupied: true, blocks: ['F'] },
        { id: 'C', isOccupied: false, blocks: [] },
        { id: 'D', isOccupied: true, blocks: ['E'] },
        { id: 'E', isOccupied: false, blocks: [] },
        { id: 'F', isOccupied: false, blocks: [] },
        { id: 'G', isOccupied: false, blocks: [] },
        { id: 'H', isOccupied: true, blocks: ['I'] },
        { id: 'I', isOccupied: false, blocks: [] },
    ];

    const colorOccupied = 'rgb(7, 142, 205)';
    const colorFree = '#D3D3D3';

    // Refs for each parking space
    const parkingRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Function to scroll to a specific parking space
    const scrollToParkingSpace = (id: string) => {
        const element = parkingRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    };

    return (
        <div className="bg-[#F1F1F1] col-span-3 bg-opacity-60 w-full h-full flex flex-col border border-[#D3D3D3] shadow-md rounded-3xl p-4">
            <h2 className="text-2xl font-semibold text-gray-800">Parking Status</h2>
            <div className="relative overflow-x-auto h-36 mt-4 flex items-center">
                <div className="flex space-x-8 px-4">
                    {parkingSpaces.map((space, index) => (
                        <div
                            key={space.id}
                            ref={(el) => (parkingRefs.current[space.id] = el)}
                            className="relative flex flex-col items-center"
                        >
                            {/* Parking space box with subtle shadow and animation */}
                            <div
                                className={`w-14 h-20 rounded-md flex items-center justify-center text-white font-semibold text-lg shadow-md transition-transform duration-300 ${
                                    space.isOccupied ? 'bg-opacity-80' : 'bg-opacity-50'
                                }`}
                                style={{
                                    backgroundColor: space.isOccupied ? colorOccupied : colorFree,
                                    transform: space.isOccupied ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                {space.id}
                            </div>

                            {/* Blocking navigation buttons */}
                            {space.isOccupied && space.blocks.length > 0 && (
                                <div className="flex flex-col items-center mt-2">
                                    {space.blocks.map((blockedId) => (
                                        <button
                                            key={blockedId}
                                            onClick={() => scrollToParkingSpace(blockedId)}
                                            className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 mt-1 shadow-md hover:bg-blue-600 transition"
                                            style={{
                                                backgroundColor: colorOccupied,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Blocked: {blockedId}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Blocking line */}
                            {space.blocks.map((blockedId) => {
                                const targetIndex = parkingSpaces.findIndex(
                                    (s) => s.id === blockedId
                                );
                                if (targetIndex > index) {
                                    return (
                                        <svg
                                            className="absolute"
                                            key={blockedId}
                                            style={{
                                                top: '50%',
                                                left: '100%',
                                                width: (targetIndex - index) * 60 + 'px',
                                                height: '2px',
                                            }}
                                        >
                                            <line
                                                x1="0"
                                                y1="0"
                                                x2="100%"
                                                y2="0"
                                                stroke={colorOccupied}
                                                strokeWidth="2"
                                                strokeDasharray="4 2" // Dotted line effect
                                            />
                                        </svg>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ParkingStatus;
