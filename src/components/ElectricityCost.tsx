import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

const ElectricityCost: React.FC = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [hourlyData, setHourlyData] = useState<{ hour: string; price: number }[]>(
    [],
  ); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchElectricityData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:8000/api/entsoe-data/"); // Update to your backend URL
        const fetchedData = response.data;

        // Map the data to match the expected format
        const formattedData = Object.entries(fetchedData).map(([hour, price]) => ({
          hour: hour.split(" ")[1], // Extract the hour part from the timestamp
          price: parseFloat(price), // Convert price to a number
        }));

        setHourlyData(formattedData);
        setLoading(false); // End loading
      } catch (err) {
        console.error("Error fetching electricity data:", err);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchElectricityData(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
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
      className="h-full bg-opacity-90 flex flex-col border border-borderColor shadow-md rounded-3xl p-4 flex-1"
      style={{
        background:
          "linear-gradient(315deg, rgba(0, 0, 0, 1) 40%, rgba(7, 68, 84, 1) 90%)",
      }}
    >
      <div className="flex justify-between items-center px-4">
        <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-2 text-secondaryColor">
          Electricity Cost
        </h2>
      </div>
      <div className="mt-2 flex justify-center">
        {loading ? (
          <p className="text-secondaryColor">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <AreaChart
            width={chartWidth}
            height={200}
            data={hourlyData}
            margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e8f4ff" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#e8f4ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              tick={{ fill: "#fff", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
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
              type="monotone"
              dataKey="price"
              stroke="#e8f4ff"
              fill="url(#colorPrice)"
              strokeWidth={4}
            />
          </AreaChart>
        )}
      </div>
    </div>
  );
};

export default ElectricityCost;
