import React, { useState, useEffect, useRef } from "react";
import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

const ElectricityCost: React.FC = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const hourlyData = [
    { hour: "0", price: 0.85 },
    { hour: "1", price: 0.91 },
    { hour: "2", price: 0.86 },
    { hour: "3", price: 0.78 },
    { hour: "4", price: 0.89 },
    { hour: "5", price: 0.95 },
    { hour: "6", price: 0.98 },
    { hour: "7", price: 1.15 },
    { hour: "8", price: 0.91 },
    { hour: "9", price: 1.18 },
    { hour: "10", price: 1.1 },
    { hour: "11", price: 1.12 },
    { hour: "12", price: 0.97 },
    { hour: "13", price: 1.05 },
    { hour: "14", price: 1.0 },
    { hour: "15", price: 0.98 },
    { hour: "16", price: 0.95 },
    { hour: "17", price: 1.0 },
    { hour: "18", price: 0.97 },
    { hour: "19", price: 0.94 },
    { hour: "20", price: 0.85 },
    { hour: "21", price: 0.82 },
    { hour: "22", price: 0.8 },
    { hour: "23", price: 0.78 },
    { hour: "24", price: 0.75 },
  ];

  const weeklyData = [
    { day: "Mo", price: 0.95 },
    { day: "Tu", price: 1.02 },
    { day: "We", price: 0.88 },
    { day: "Th", price: 1.15 },
    { day: "Fr", price: 0.97 },
    { day: "Sa", price: 0.78 },
    { day: "Su", price: 0.82 },
  ];

  const monthlyData = Array.from({ length: 31 }, (_, i) => ({
    day: `${i + 1}`,
    price: (Math.random() * (1.2 - 0.7) + 0.7).toFixed(2), // Generate random filter for 31 days
  }));

  const [filter, setFilter] = useState<"hourly" | "weekly" | "monthly">(
    "hourly",
  );

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth); // Adjust for padding
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
      className="h-full bg-opacity-90 flex flex-col bg-[#FFFFFF] border border-[#D3D3D3] shadow-md rounded-3xl p-4 flex-1"
      style={{
        background:
          "linear-gradient(315deg, rgba(0, 0, 0, 1) 40%, rgba(7, 68, 84, 1) 90%)",
      }}
    >
      {/* Centered Heading */}
      {/* Centered Heading with Buttons */}
      <div className="flex justify-between items-center px-4">
        {/* Heading */}
        <p className="text-2xl font-bold text-white">Electricity Cost</p>

        {/* Buttons for time period */}
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter("hourly")}
            className={`py-1 px-4 text-sm font-semibold rounded-full transition ${
              filter === "hourly"
                ? "border border-black bg-[#078ECD] text-white"
                : "text-white border border-gray-400 hover:bg-[#078ECD] hover:text-white"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setFilter("weekly")}
            className={`py-1 px-4 text-sm font-semibold rounded-full transition ${
              filter === "weekly"
                ? "border border-black bg-[#078ECD] text-white"
                : "text-white border border-gray-400 hover:bg-[#078ECD] hover:text-white"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`py-1 px-4 text-sm font-semibold rounded-full transition ${
              filter === "monthly"
                ? "border border-black bg-[#078ECD] text-white"
                : "text-white border border-gray-400 hover:bg-[#078ECD] hover:text-white"
            }`}
          >
            Month
          </button>
        </div>
      </div>
      {/* Graph */}
      <div className="mt-2 flex justify-center">
        <AreaChart
          width={chartWidth}
          height={200}
          data={
            filter === "hourly"
              ? hourlyData
              : filter === "weekly"
                ? weeklyData
                : monthlyData
          }
          margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#078ECD" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#078ECD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={filter === "hourly" ? "hour" : "day"} // Dynamically choose the key
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
            ticks={
              filter === "hourly"
                ? hourlyData
                    .filter((_, index) => index % 2 === 0)
                    .map((entry) => entry.hour)
                : filter === "monthly"
                  ? monthlyData
                      .filter((_, index) => index % 2 === 0)
                      .map((entry) => entry.day)
                  : undefined
            }
          />
          <YAxis
            domain={[0.5, 1.5]}
            ticks={[0.75, 1, 1.25]}
            tick={{ fill: "#fff", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            labelStyle={{
              color: "transparent",
            }}
            itemStyle={{
              color: "#FFF",
              fontWeight: "semibold",
              fontSize: "15px",
            }}
          />
          <Area
            type="monotone" // Smooth sinusoidal lines
            dataKey="price"
            stroke="#078ECD"
            fill="url(#colorPrice)"
            strokeWidth={4} // Wider stroke for the graph
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default ElectricityCost;
