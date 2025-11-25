import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import ChartCard from "./ChartCard";

const insights = [
  "Mumbai has the highest beds-per-10k ratio, showing very strong medical capacity.",
  "Sindhudurg, Kolhapur, Wardha, and Pune also perform well.",
  "Palghar and Mumbai Suburban have extremely low beds-per-population.",
  "Gadchiroli, Hingoli, Buldhana, and Chandrapur fall below ideal healthcare thresholds.",
  "Huge inequality: some districts have 10× more beds per person than others.",
];

const ChartBedsPerPopulation = () => {
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

    const population = district.total_persons || 0;

    return {
      name: district.district_name,
      bedsPer10k: population
        ? Number(((totalBeds / population) * 10000).toFixed(2))
        : 0,
    };
  });

  return (
    <ChartCard
      title="Beds per 10,000 People"
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
          <Bar dataKey="bedsPer10k" fill="#1976D2" radius={[5, 5, 0, 0]} />
        </BarChart>
      }
      insights={insights}
    />
  );
};

export default ChartBedsPerPopulation;
