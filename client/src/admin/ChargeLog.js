import { Component } from "react";

import DataTable from "react-data-table-component";

class Creedians extends Component {
  constructor(props) {
    super(props);
    this.state = { table_data: "" };
  }

  fetchTable() {
    fetch("http://localhost:9000/admin/user_creedians_charge_log")
      .then(res => res.json())
      .then(res => this.setState({ table_data: res }));
  }

  componentDidMount() {
    this.fetchTable();
  }

  render() {
    const columns = [
      {
        name: 'User Id',
        selector: row => row.user_id,
        sortable: true,
      },
      {
        name: 'User No',
        selector: row => row.user_no,
        sortable: true,
        width: "10rem",
      },
      {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
      },
      {
        name: 'Character Name',
        selector: row => row.character_name,
        sortable: true,
        width: "10rem",
      },
      {
        name: 'Character No',
        selector: row => row.character_no,
        sortable: true,
        width: "12rem",
      },
      {
        name: 'Charge Type',
        selector: row => row.charge_type,
        sortable: true,
        width: "10rem",
      },
      {
        name: 'Map',
        selector: row => row.map,
        sortable: true,
      },
      {
        name: 'X',
        selector: row => row.x,
        sortable: true,
      },
      {
        name: 'Y',
        selector: row => row.y,
        sortable: true,
      },
      {
        name: 'Item Tag',
        selector: row => row.item_tag,
        sortable: true,
      },
      {
        name: 'Item Index',
        selector: row => row.item_index,
        sortable: true,
        width: "8rem",
      },
      {
        name: 'Log Date',
        selector: row => row.log_date,
        sortable: true,
        width: "12rem",
      },
      {
        name: 'Log Index',
        selector: row => row.log_idx,
        sortable: true,
      },
    ];

    return (
      <DataTable title="Charge Log" columns={columns} data={this.state.table_data} pagination />
    );
  }
};

export default Creedians;
