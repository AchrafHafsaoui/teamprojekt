import React from 'react';

const Sidebar: React.FC = () => (
  <div className="flex flex-col bg-gray-900 p-4 text-white w-20 hover:w-60 transition-all duration-300 h-screen fixed top-10 justify-between">
    <div className="flex flex-col space-y-2">
      {[
        { label: "Overview", icon: "📊" },
        { label: "Charging Stations", icon: "⚡" },
        { label: "Charging Schedule", icon: "⏱️" },
        { label: "Driving Schedule", icon: "🚗" },
        { label: "Parking", icon: "🅿️" },
        { label: "Electricity Schedule", icon: "🔋" },
        { label: "Electricity Status", icon: "💡" },
        { label: "Fleet Status", icon: "🚌" }
      ].map((item) => (
        <button
          key={item.label}
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
        >
          {/* Making the icon larger using text-2xl */}
          <span className="text-2xl">{item.icon}</span>
          {/* Text label becomes visible when sidebar expands */}
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300" style={{ width: 'auto' }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
    <div className="text-xs text-center mb-10">v 0.0.1</div> {/* Positioned at the bottom */}
  </div>
);

export default Sidebar;
