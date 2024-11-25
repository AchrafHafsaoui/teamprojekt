import React, { useState, useEffect, useRef } from "react";
import { AreaChart, Area, Tooltip } from "recharts";

const ElectricityCost: React.FC = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const data = [
    { hour: "00:00", price: 0.85 },
    { hour: "01:00", price: 0.91 },
    { hour: "02:00", price: 0.86 },
    { hour: "03:00", price: 0.78 },
    { hour: "04:00", price: 0.89 },
    { hour: "05:00", price: 0.95 },
    { hour: "06:00", price: 0.98 },
    { hour: "07:00", price: 1.15 },
    { hour: "08:00", price: 0.91 },
    { hour: "09:00", price: 1.18 },
    { hour: "10:00", price: 1.10 },
    { hour: "11:00", price: 1.12 },
    { hour: "12:00", price: 0.97 },
    { hour: "13:00", price: 1.05 },
    { hour: "14:00", price: 1.00 },
    { hour: "15:00", price: 0.98 },
    { hour: "16:00", price: 0.95 },
    { hour: "17:00", price: 1.00 },
    { hour: "18:00", price: 0.97 },
    { hour: "19:00", price: 0.94 },
    { hour: "20:00", price: 0.85 },
    { hour: "21:00", price: 0.82 },
    { hour: "22:00", price: 0.80 },
    { hour: "23:00", price: 0.78 },
    { hour: "24:00", price: 0.75 },
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth - 40); // Adjust for padding
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full text-white bg-black bg-opacity-90 shadow-lg rounded-3xl flex flex-col transition-all duration-300 pt-6"
      style={{
        backgroundImage: `url('/src/assets/cosmos.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Centered Heading */}
      <div className="text-center">
        <p className="text-lg font-semibold">Today’s Electricity Price</p>
        <p className="text-4xl font-bold mt-1">0.95 €/KWh</p>
      </div>

      {/* Buttons for time period */}
      <div className="flex justify-center mt-4 space-x-4">
        <button className="py-1 px-4 text-sm font-semibold text-[#078ECD] border border-[#078ECD] rounded-full hover:bg-[#078ECD] hover:text-white transition">
          Day
        </button>
        <button className="py-1 px-4 text-sm font-semibold text-white border border-gray-400 rounded-full hover:bg-[#078ECD] hover:text-white transition">
          Week
        </button>
        <button className="py-1 px-4 text-sm font-semibold text-white border border-gray-400 rounded-full hover:bg-[#078ECD] hover:text-white transition">
          Month
        </button>
      </div>

      {/* Graph */}
      <div className="mt-6 flex justify-center">
        <AreaChart
          width={chartWidth}
          height={200}
          data={data}
          margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
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
            type="monotone" // Smooth sinusoidal lines
            dataKey="price"
            stroke="#078ECD"
            fill="url(#colorPrice)"
            strokeWidth={5} // Wider stroke for the graph
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default ElectricityCost;
