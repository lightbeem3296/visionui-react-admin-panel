import { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
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
  }
};

export default NavBar;
