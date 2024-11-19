import React, { useState } from "react";
import { AreaChart, Area, Tooltip } from "recharts";

interface ElectricityCostProps {
  setHideHello: (hide: boolean) => void;
}

const ElectricityCost: React.FC<ElectricityCostProps> = ({ setHideHello }) => {
  const [expanded, setExpanded] = useState(false);

  // Updated hourly data
  const data = [
    { hour: "00:00", price: 0.85 },
    { hour: "01:00", price: 0.87 },
    { hour: "02:00", price: 0.89 },
    { hour: "03:00", price: 0.91 },
    { hour: "04:00", price: 0.92 },
    { hour: "05:00", price: 0.95 },
    { hour: "06:00", price: 0.98 },
    { hour: "07:00", price: 1.02 },
    { hour: "08:00", price: 1.08 },
    { hour: "09:00", price: 1.11 },
    { hour: "10:00", price: 1.15 },
    { hour: "11:00", price: 1.12 },
    { hour: "12:00", price: 1.08 },
    { hour: "13:00", price: 1.05 },
    { hour: "14:00", price: 1.00 },
    { hour: "15:00", price: 0.98 },
    { hour: "16:00", price: 0.95 },
    { hour: "17:00", price: 0.92 },
    { hour: "18:00", price: 0.90 },
    { hour: "19:00", price: 0.88 },
    { hour: "20:00", price: 0.85 },
    { hour: "21:00", price: 0.82 },
    { hour: "22:00", price: 0.80 },
    { hour: "23:00", price: 0.78 },
    { hour: "24:00", price: 0.75 },
  ];

  return (
    <div
      className="relative w-full h-full text-white bg-black bg-opacity-90 shadow-lg rounded-3xl flex flex-col transition-all duration-300 p-6"
      style={{
        backgroundImage: `url('/src/assets/cosmos.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => {
        setExpanded(true);
        setHideHello(true); // Hide "Hello Benjamin!" on hover
      }}
      onMouseLeave={() => {
        setExpanded(false);
        setHideHello(false); // Show "Hello Benjamin!" when not hovered
      }}
    >
      <p className="text-3xl leading-tight">Today’s electricity price</p>
      <p className="text-6xl mt-8 font-bold">0.958 €/KWh</p>
      {expanded && (
        <div className="mt-6">
          <AreaChart
            width={450}
            height={150}
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#078ECD" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#078ECD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }}
              labelStyle={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
              }}
              itemStyle={{
                color: "#078ECD",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />
            <Area
              type="linear" // Straight triangular lines
              dataKey="price"
              stroke="#078ECD"
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </div>
      )}
      <p className="text-lg mt-2 text-gray-300">100 kWh available</p>
    </div>
  );
};

export default ElectricityCost;
