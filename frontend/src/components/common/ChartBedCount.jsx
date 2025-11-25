import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import ChartCard from "./ChartCard";

const insights = [
  "Pune, Mumbai, Thane, and Nashik have the highest bed capacity.",
  "Palghar, Gadchiroli, Hingoli, and Nandurbar have very low bed availability.",
  "Rural and tribal districts consistently have weaker infrastructure.",
  "Large gap between Pune and Palghar highlights inequality.",
];

const ChartBedCount = () => {
  const { districts, hospitals, loaded } = useSelector(
    (state) => state.healthInfra
  );

  if (!loaded) return <p>Loading chart...</p>;
  if (!districts?.allIds?.length) return <p>No data available.</p>;

  const data = districts.allIds.map((districtId) => {
    const district = districts.byId[districtId];
    const totalBeds = (district.hospitals || [])
      .map((hid) => hospitals.byId[hid]?.total_beds || 0)
      .reduce((a, b) => a + b, 0);

    return { name: district.district_name, beds: totalBeds };
  });

  return (
    <ChartCard
      title="Total Beds per District"
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
          <Bar dataKey="beds" fill="#00897B" radius={[5, 5, 0, 0]} />
        </BarChart>
      }
      insights={insights}
    />
  );
};

export default ChartBedCount;
