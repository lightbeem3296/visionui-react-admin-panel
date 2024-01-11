import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from 'primereact/card';

import "primereact/resources/themes/lara-light-cyan/theme.css";

class Creedians extends Component {
  constructor(props) {
    super(props);
    this.state = { table_data: [] };
  }

  fetchTable() {
    fetch("http://localhost:9000/admin/user_creedians")
      .then(res => res.json())
      .then(res => this.setState({ table_data: res }));
  }

  componentDidMount() {
    this.fetchTable();
  }

  render() {
    return (
      <Card title="Creedians">
        <div className="card">
          <DataTable value={this.state.table_data} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
            <Column field="user_id" header="User Id" sortable></Column>
            <Column field="user_no" header="User No" sortable></Column>
            <Column field="creedian" header="Creedian" sortable></Column>
            <Column field="log_date" header="Log Date" sortable></Column>
          </DataTable>
        </div>
      </Card>
    );
  }
};

export default Creedians;
