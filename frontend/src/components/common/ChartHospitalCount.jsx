import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import ChartCard from "./ChartCard";

const insights = [
  "Pune, Thane, and Nashik have the highest number of hospitals.",
  "Palghar has the lowest hospital count, indicating weaker coverage.",
  "Rural/tribal districts like Gadchiroli and Hingoli have fewer hospitals.",
  "Hospital distribution across Maharashtra is uneven.",
];

const ChartHospitalCount = () => {
  const { loaded } = useSelector((state) => state.healthInfra);
  const districts = useSelector(
    (state) => state.healthInfra?.districts?.byId || {}
  );

  if (!loaded) return <p>Loading chart...</p>;
  if (!districts) return <p>No data available</p>;

  const data = Object.values(districts).map((d) => ({
    name: d.district_name,
    hospitals: d.count,
  }));

  return (
    <ChartCard
      title="Hospitals per District"
      chart={
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hospitals" fill="#26C6DA" radius={[5, 5, 0, 0]} />
        </BarChart>
      }
      insights={insights}
    />
  );
};

export default ChartHospitalCount;
