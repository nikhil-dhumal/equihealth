import Home from "../pages/Home";
import FileComplaint from "../pages/FileComplaint";
import Complaints from "../pages/Complaints";
import AnalyticsMap from "../pages/AnalyticsMap";
import AnalyticsCharts from "../pages/AnalyticsCharts";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/file-complaint", element: <FileComplaint /> },
  { path: "/complaints", element: <Complaints /> },
  { path: "/analytics/map", element: <AnalyticsMap /> },
  { path: "/analytics/charts", element: <AnalyticsCharts /> },
];

export default routes;
