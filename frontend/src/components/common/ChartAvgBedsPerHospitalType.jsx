import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

const ChartAvgBedsPerHospitalType = () => {
  const { hospitals, loaded } = useSelector((state) => state.healthInfra);

  if (!loaded) return <p>Loading chart...</p>;

  let counts = { Corporate: 0, Government: 0, Other: 0 };
  let beds = { Corporate: 0, Government: 0, Other: 0 };

  Object.values(hospitals.byId).forEach((h) => {
    const type = h.hospital_type || "Other";
    counts[type] = (counts[type] || 0) + 1;
    beds[type] = (beds[type] || 0) + (h.total_beds || 0);
  });

  const data = [
    {
      type: "Corporate",
      avg: beds.Corporate / counts.Corporate,
      fill: "#1E88E5",
    },
    {
      type: "Government",
      avg: beds.Government / counts.Government,
      fill: "#43A047",
    },
    { type: "Other", avg: beds.Other / counts.Other, fill: "#26C6DA" },
  ];

  const formatDecimal = (num) => num.toFixed(2);

  return (
    <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip formatter={(value) => formatDecimal(value)} />
      <Legend />
      <Bar dataKey="avg" radius={[5, 5, 0, 0]} name="Avg Beds">
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default ChartAvgBedsPerHospitalType;
