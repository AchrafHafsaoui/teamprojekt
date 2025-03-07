import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";
import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import apiClient, { updateContextValues } from "../api/api";

const ElectricityCost: React.FC = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [hourlyData, setHourlyData] = useState<
    { hour: string; price: number }[]
  >([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const containerRef = useRef<HTMLDivElement | null>(null);

  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  const { setAuth, auth } = useAuth();

  useEffect(() => {
    const fetchElectricityData = async () => {
      updateContextValues(setAuth, auth);
      try {
        setLoading(true);
        const response = await apiClient.get(
          "http://localhost:8000/api/entsoe-data/"
        );

        console.log("Full API Response:", response.data); // Log the API response

        const fetchedData = response.data.prices;
        if (!fetchedData) {
          throw new Error("No data received");
        }

        // Convert fetched data into the required format
        const formattedData = Object.entries(fetchedData).map(
          ([timestamp, price]) => ({
            hour: new Date(timestamp).getHours().toString(), // Extract hour from timestamp
            price: parseFloat(String(price)), // Ensure it's a number
          })
        );

        console.log("Formatted Data for Chart:", formattedData); // Log formatted data

        setHourlyData(formattedData);
        setLoading(false);
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
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e8f4ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e8f4ff" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* ✅ Fix X-Axis Formatting */}
            <XAxis
              dataKey="hour"
              tickFormatter={(tick) => `${tick}`} // Ensure proper time format
              tick={{ fill: "#fff", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
            />

            {/* ✅ Fix Y-Axis Formatting */}
            <YAxis
              domain={["auto", "auto"]} // Auto-scale based on data
              tickFormatter={(tick) => tick.toFixed(2)} // Ensure decimal formatting
              tick={{ fill: "#fff", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.75)",
                borderRadius: "5px",
              }}
              itemStyle={{ color: "#fff", fontSize: "14px" }}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#e8f4ff"
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        )}
      </div>
    </div>
  );
};

export default ElectricityCost;
