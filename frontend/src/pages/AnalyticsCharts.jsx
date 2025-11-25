import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ChartCard from "../components/common/ChartCard.jsx";
import ChartHospitalType from "../components/common/ChartHospitalType.jsx";
import ChartBedsByHospitalType from "../components/common/ChartBedsByHospitalType.jsx";
import ChartAvgBedsPerHospitalType from "../components/common/ChartAvgBedsPerHospitalType.jsx";
import ChartHospitalPerCapita from "../components/common/ChartHospitalPerCapita.jsx";

import { setActivePage } from "../redux/features/activePageSlice.js";
import ChartBedsByDistrictType from "../components/common/ChartBedsByDistrictType.jsx";

const AnalyticsCharts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage(2));
  }, [dispatch]);

  return (
    <div id="analytics-charts">
      <div className="charts">
        <ChartCard
          title="Hospital Type Distribution"
          chart={<ChartHospitalType />}
          insights={[
            "Corporate hospitals have the largest number of beds, showing they handle most patients.",
            "Government hospitals provide a significant number of beds.",
            "Other types of hospitals are very few and contribute only a small number of beds overall.",
          ]}
        />
        <ChartCard
          title="Beds Distribution by Hospital Type"
          chart={<ChartBedsByHospitalType />}
          insights={[
            "Corporate hospitals have the most beds, so they handle the majority of patients.",
            "Government hospitals have fewer hospitals but still provide a lot of beds.",
            "Other types of hospitals are very few and add only a small number of beds.",
          ]}
        />
        <ChartCard
          title="Average Beds per Hospital Type"
          chart={<ChartAvgBedsPerHospitalType />}
          insights={[
            "On average, government hospitals have the most beds per hospital.",
            "Corporate hospitals have moderate bed counts on average.",
            "Other types of hospitals are smaller and have fewer beds on average.",
          ]}
        />
        <ChartCard
          title="Hospitals per 10,000 People by District"
          chart={<ChartHospitalPerCapita />}
          insights={[
            "Urban districts generally have more hospitals for their population.",
            "Rural and tribal districts often have very few hospitals per person.",
            "There are large differences in hospital access across districts.",
          ]}
        />
        <ChartCard
          title="Beds Distribution by District and Hospital Type"
          chart={<ChartBedsByDistrictType />}
          insights={[
            "Shows total beds in each district broken down by hospital type.",
            "Corporate hospitals have most beds in urban districts.",
            "Government hospitals have more beds in rural and tribal areas.",
            "Other or unknown hospital types add very few beds overall.",
          ]}
        />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
