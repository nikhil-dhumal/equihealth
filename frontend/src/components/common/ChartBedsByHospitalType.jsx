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

const ChartBedsByHospitalType = () => {
  const { hospitals, loaded } = useSelector((state) => state.healthInfra);

  if (!loaded) return <p>Loading chart...</p>;

  const beds = { Corporate: 0, Government: 0, Other: 0 };

  Object.values(hospitals.byId).forEach((h) => {
    const type = h.hospital_type || "Other";
    beds[type] = (beds[type] || 0) + (h.total_beds || 0);
  });

  const data = [
    { type: "Corporate", beds: beds.Corporate, fill: "#1E88E5" },
    { type: "Government", beds: beds.Government, fill: "#43A047" },
    { type: "Other", beds: beds.Other, fill: "#26C6DA" },
  ];

  return (
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="beds" radius={[5, 5, 0, 0]} name="Total Beds">
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default ChartBedsByHospitalType;
