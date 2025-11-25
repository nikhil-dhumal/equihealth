import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartBedsByDistrictType = () => {
  const { loaded, districts, hospitals } = useSelector(
    (state) => state.healthInfra
  );

  if (!loaded) return <p>Loading chart...</p>;
  if (!districts.allIds?.length) return <p>No data available.</p>;

  const data = districts.allIds.map((districtId) => {
    const district = districts.byId[districtId];
    const bedsByType = { Corporate: 0, Government: 0, Other: 0 };

    (district.hospitals || []).forEach((hid) => {
      const hospital = hospitals.byId[hid];
      if (!hospital) return;
      const type = hospital.hospital_type || "Other";
      bedsByType[type] += hospital.total_beds || 0;
    });

    return {
      name: district.district_name,
      ...bedsByType,
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
      <Legend />
      <Bar
        dataKey="Corporate"
        stackId="a"
        fill="#42A5F5"
        radius={[5, 5, 0, 0]}
      />
      <Bar
        dataKey="Government"
        stackId="a"
        fill="#66BB6A"
        radius={[5, 5, 0, 0]}
      />
      <Bar dataKey="Other" stackId="a" fill="#FFA726" radius={[5, 5, 0, 0]} />
    </BarChart>
  );
};

export default ChartBedsByDistrictType;
