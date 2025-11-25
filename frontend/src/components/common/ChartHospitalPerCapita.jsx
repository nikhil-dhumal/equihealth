import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ChartHospitalPerCapita = () => {
  const { loaded, districts } = useSelector((state) => state.healthInfra);

  if (!loaded) return <p>Loading chart...</p>;

  if (!districts.allIds?.length) return <p>No data available.</p>;

  const data = districts.allIds.map((districtId) => {
    const district = districts.byId[districtId];
    const hospitalsCount = district.hospitals?.length || 0;
    const population = district.total_persons || 1;
    return {
      name: district.district_name,
      hospitalsPer10k: Number(
        ((hospitalsCount / population) * 10000).toFixed(2)
      ),
    };
  });

  return (
    <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
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
      <Bar dataKey="hospitalsPer10k" fill="#26C6DA" radius={[5, 5, 0, 0]} />
    </BarChart>
  );
};

export default ChartHospitalPerCapita;
