import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";
import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import { updateContextValues } from "../api/api";
import axios from "axios";

// Define the type for each data point
type ElectricityDataPoint = {
  timestamp: string; // The timestamp as a string
  price: number; // The price as a number
};

// Define the type for selectedData
type SelectedDataType = "yesterday" | "today";

const ElectricityCost: React.FC = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [data, setData] = useState<{ yesterday: any[]; today: any[] }>({
    yesterday: [],
    today: [],
  });
  const [selectedData, setSelectedData] = useState<SelectedDataType>("today");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        const response = await axios.get(
          "http://localhost:8000/api/entsoe-data/"
        );
        console.log("Full API Response:", response.data);

        // Ensure the 'prices' key exists and contains both 'yesterday' and 'today'
        if (
          !response.data.prices ||
          !response.data.prices.yesterday ||
          !response.data.prices.today
        ) {
          throw new Error("Incomplete data received");
        }

        // Transform the data to extract the hour from the timestamp
        const transformedData = {
          yesterday: response.data.prices.yesterday.map(
            (item: ElectricityDataPoint) => ({
              hour: new Date(item.timestamp).getHours().toString(),
              price: item.price,
            })
          ),
          today: response.data.prices.today.map(
            (item: ElectricityDataPoint) => ({
              hour: new Date(item.timestamp).getHours().toString(),
              price: item.price,
            })
          ),
        };

        setData(transformedData);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching electricity data:", err.message || err);
        setError(`Failed to fetch data. Details: ${err.message || err}`);
        setLoading(false);
      }
    };

    fetchElectricityData();
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

  const toggleData = () => {
    setSelectedData((prev) => (prev === "yesterday" ? "today" : "yesterday"));
  };

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
        <button
          className="px-4 py-2 bg-secondaryColor text-black rounded-md font-semibold"
          onClick={toggleData}
        >
          Show {selectedData === "yesterday" ? "Today" : "Yesterday"}
        </button>
      </div>
      <div className="mt-2 flex justify-center">
        {loading ? (
          <p className="text-secondaryColor">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data[selectedData].length === 0 ? (
          <p className="text-secondaryColor">No data available.</p>
        ) : (
          <AreaChart
            width={chartWidth}
            height={200}
            data={data[selectedData]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e8f4ff" stopOpacity={0.8} />
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
              domain={["auto", "auto"]}
              tickFormatter={(tick) => tick.toFixed(2)}
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
