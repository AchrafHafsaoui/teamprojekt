import React from 'react';

const Sidebar: React.FC = () => (
  <div className="flex flex-col bg-gray-900 p-4 text-white w-48 h-screen fixed top-10 justify-between">
    <div className="flex flex-col space-y-2">
      {["Overview", "Charging Stations", "Driving Schedule", "Charging Schedule", "Parking", "Electricity Schedule", "Electricity Status", "Fleet Status"].map((item) => (
        <button key={item} className="text-left hover:bg-gray-700 p-2 rounded">
          {item}
        </button>
      ))}
    </div>
    <div className="text-xs text-center mb-10">v 0.0.1</div> {/* Positioned at the bottom */}
  </div>
);

export default Sidebar;
