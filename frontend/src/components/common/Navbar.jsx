import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setActivePage } from "../../redux/features/activePageSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state) => state.activePage);

  return (
    <header id="navbar">
      <ul>
        <li
          onClick={() => dispatch(setActivePage(0))}
          className={activePage === 0 ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>

        <li
          onClick={() => dispatch(setActivePage(1))}
          className={activePage === 1 ? "active" : ""}
        >
          <Link to="/analytics/map">Analytics Map</Link>
        </li>

        <li
          onClick={() => dispatch(setActivePage(2))}
          className={activePage === 2 ? "active" : ""}
        >
          <Link to="/analytics/charts">Analytics Charts</Link>
        </li>

        <li
          onClick={() => dispatch(setActivePage(3))}
          className={activePage === 3 ? "active" : ""}
        >
          <Link to="/complaints">Complaint History</Link>
        </li>

        <li
          onClick={() => dispatch(setActivePage(4))}
          className={activePage === 4 ? "active" : ""}
        >
          <Link to="/file-complaint">File Complaint</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
