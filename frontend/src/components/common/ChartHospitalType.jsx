import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const ChartHospitalType = () => {
  const { loaded, hospitals } = useSelector((state) => state.healthInfra);

  if (!loaded) return <p>Loading chart...</p>;

  const typesCount = { Corporate: 0, Government: 0, Other: 0 };

  Object.values(hospitals.byId).forEach((h) => {
    if (h.hospital_type === "Corporate") typesCount.Corporate++;
    else if (h.hospital_type === "Government") typesCount.Government++;
    else typesCount.Other++;
  });

  const data = [
    { name: "Corporate", value: typesCount.Corporate },
    { name: "Government", value: typesCount.Government },
    { name: "Other", value: typesCount.Other },
  ];

  const COLORS = ["#42A5F5", "#43A047", "#FFB300"];

  return (
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={120}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ChartHospitalType;
