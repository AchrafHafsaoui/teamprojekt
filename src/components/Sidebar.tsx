import React from 'react';

const Sidebar: React.FC = () => (
  <div className="flex flex-col bg-gray-900 p-4 text-white space-y-2 w-48 h-screen fixed top-10 "  >
    {["Overview", "Charging Stations", "Driving Schedule", "Charging Schedule", "Parking", "Electricity Schedule", "Electricity Status", "Fleet Status"].map((item) => (
      <button key={item} className="text-left hover:bg-gray-700 p-2 rounded">
        {item}
      </button>
    ))}
    <div className="text-xs mt-auto">v 0.0.1</div>
  </div>
);

export default Sidebar;
