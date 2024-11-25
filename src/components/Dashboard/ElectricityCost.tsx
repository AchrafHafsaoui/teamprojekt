import React, { useState, useEffect, useRef } from "react";
import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

const ElectricityCost: React.FC = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Day");

  const data = [
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
    { hour: "10", price: 1.10 },
    { hour: "11", price: 1.12 },
    { hour: "12", price: 0.97 },
    { hour: "13", price: 1.05 },
    { hour: "14", price: 1.00 },
    { hour: "15", price: 0.98 },
    { hour: "16", price: 0.95 },
    { hour: "17", price: 1.00 },
    { hour: "18", price: 0.97 },
    { hour: "19", price: 0.94 },
    { hour: "20", price: 0.85 },
    { hour: "21", price: 0.82 },
    { hour: "22", price: 0.80 },
    { hour: "23", price: 0.78 },
    { hour: "24", price: 0.75 },
  ];

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

  const getFilteredData = () => {
    if (selectedPeriod === "Day") {
      return data; // First 24 hours (default data)
    } else if (selectedPeriod === "Week") {
      return [
        { day: "Mo", price: 0.95 },
        { day: "Tu", price: 1.02 },
        { day: "We", price: 0.88 },
        { day: "Th", price: 1.15 },
        { day: "Fr", price: 0.97 },
        { day: "Sa", price: 0.78 },
        { day: "Su", price: 0.82 },
      ]; // Example weekly data
    } else if (selectedPeriod === "Month") {
      return Array.from({ length: 31 }, (_, i) => ({
        day: `${i}/11`,
        price: (Math.random() * (1.2 - 0.7) + 0.7).toFixed(2), // Generate random data for 30 days
      }));
    }
    return data;
  };

  const filteredData = getFilteredData();


  return (
    <div
      ref={containerRef}
      className="relative w-full h-full text-white bg-black bg-opacity-90 shadow-lg rounded-3xl flex flex-col pt-4"
      style={{
        backgroundImage: `url('/src/assets/panel_background_flipped.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Centered Heading */}
      <p className="text-2xl font-semibold ml-16">Today’s Electricity Price</p>

      {/* Buttons for time period */}
      <div className="flex mt-3 space-x-4 ml-16">
        <button
          onClick={() => setSelectedPeriod("Day")}
          className={`py-1 px-4 text-sm font-semibold rounded-full transition ${selectedPeriod === "Day"
            ? "border border-black bg-[#078ECD] text-white"
            : "text-white border border-gray-400 hover:bg-[#078ECD] hover:text-white"
            }`}
        >
          Day
        </button>
        <button
          onClick={() => setSelectedPeriod("Week")}
          className={`py-1 px-4 text-sm font-semibold rounded-full transition ${selectedPeriod === "Week"
            ? "border border-black bg-[#078ECD] text-white"
            : "text-white border border-gray-400 hover:bg-[#078ECD] hover:text-white"
            }`}
        >
          Week
        </button>
        <button
          onClick={() => setSelectedPeriod("Month")}
          className={`py-1 px-4 text-sm font-semibold rounded-full transition ${selectedPeriod === "Month"
            ? "border border-black bg-[#078ECD] text-white"
            : "text-white border border-gray-400 hover:bg-[#078ECD] hover:text-white"
            }`}
        >
          Month
        </button>
      </div>


      {/* Graph */}
      <div className="mt-2 flex justify-center">
        <AreaChart
          width={chartWidth}
          height={170}
          data={filteredData}
          margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#078ECD" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#078ECD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={selectedPeriod === "Day" ? "hour" : "day"} // Dynamically choose the key
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
            ticks={
              selectedPeriod === "Day"
                ? data.filter((_, index) => index % 2 === 0).map((entry) => entry.hour) // Filter to skip every 2 hours
                : undefined // For "Week" or "Month", use default ticks
            }
          />
          <YAxis
            domain={[0.5, 1.5]}
            ticks={[1, 1.5]}
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
