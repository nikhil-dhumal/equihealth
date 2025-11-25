import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import complaintsApi from "../api/modules/complaintsApi";

import ComplaintRow from "../components/common/ComplaintRow";
import SelectFilters from "../components/common/SelectFilters";

import { setActivePage } from "../redux/features/activePageSlice";

const Complaints = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    district: null,
    hospital: null,
    search: "",
  });
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderDir, setOrderDir] = useState("desc");

  const fetchComplaints = async () => {
    setLoading(true);
    const { res, err } = await complaintsApi.getComplaints({
      districtId: filters.district?.value,
      hospitalId: filters.hospital?.value,
      search: filters.search,
      page,
      pageSize,
      orderBy: "created_at",
      orderDir,
    });
    if (res && res.data) {
      setComplaints(res.data || []);
    }
    if (res && res.pagination) {
      setTotalPages(res.pagination.total_pages || 1);
    }
    if (err) {
      console.error(err);
      setComplaints([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, [filters, page, orderDir]);

  useEffect(() => {
    dispatch(setActivePage(3));
  }, [dispatch]);

  return (
    <div id="complaints-list">
      <div className="filters">
        <SelectFilters selected={filters} setSelected={setFilters} />
        <input
          type="text"
          placeholder="Search complaints"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </div>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="complaints-grid paper">
          <div className="complaints-header grid">
            <div>Title</div>
            <div>District</div>
            <div>Hospital</div>
            <div className="created-at-header">
              Created At
              <div>
                <span
                  className={`arrow ${orderDir === "desc" ? "active" : ""}`}
                  onClick={() => setOrderDir("desc")}
                >
                  ▼
                </span>
                <span
                  className={`arrow ${orderDir === "asc" ? "active" : ""}`}
                  onClick={() => setOrderDir("asc")}
                >
                  ▲
                </span>
              </div>
            </div>
          </div>
          {complaints.map((c) => (
            <ComplaintRow key={c.complaint_id} complaint={c} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="paper-1"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          className="paper-1"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Complaints;
