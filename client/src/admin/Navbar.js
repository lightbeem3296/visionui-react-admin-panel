import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/creedians">Current Creedians</Link>
      </li>
      <li>
        <Link to="/charge_log">Charge Log</Link>
      </li>
      <li>
        <Link to="/use_log">Use Log</Link>
      </li>
    </ul>
  );
};

export default NavBar;
