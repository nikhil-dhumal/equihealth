import { useSelector } from "react-redux";

const ComplaintRow = ({ complaint }) => {
  const { districts, hospitals, loaded } = useSelector(
    (state) => state.healthInfra
  );

  if (!loaded) return null;

  const district = districts.byId[complaint.district_id];
  const hospital = hospitals.byId[complaint.hospital_id];

  return (
    <div className="complaint-row grid">
      <div>{complaint.title}</div>

      <div>{district?.district_name || "-"}</div>

      <div>{hospital?.hospital_name || "-"}</div>

      <div>
        {complaint.created_at
          ? new Date(complaint.created_at + "Z").toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })
          : "-"}
      </div>
    </div>
  );
};

export default ComplaintRow;
