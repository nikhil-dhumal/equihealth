import { ResponsiveContainer } from "recharts";

const ChartCard = ({ title, chart, insights }) => {
  return (
    <div className="chart">
      <h2 className="chart-title">{title}</h2>

      <ResponsiveContainer width="100%" height={350}>
        {chart}
      </ResponsiveContainer>

      <div className="chart-insights">
        <p>
          <strong>Key Insights:</strong>
        </p>
        <ul>
          {insights.map((point, idx) => (
            <li key={idx} className="paper">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartCard;
