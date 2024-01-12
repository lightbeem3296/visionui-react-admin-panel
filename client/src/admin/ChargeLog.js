import { Component } from "react";

class ChargeLog extends Component {
  constructor(props) {
    super(props);
    this.state = { table_data: "" };
  }

  fetchTable() {
    fetch("http://localhost:9000/admin/user_creedians_charge_log")
      .then(res => res.text())
      .then(res => this.setState({ table_data: res }));
  }

  componentDidMount() {
    this.fetchTable();
  }

  render() {
    return (
        <div>
            {this.state.table_data}
        </div>
    );
  }
};

export default ChargeLog;
