import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from 'primereact/card';

class ChargeLog extends Component {
  constructor(props) {
    super(props);
    this.state = { table_data: [] };
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
    return (
      <Card title="Creedians Charge Log">
        <div className="card">
          <DataTable value={this.state.table_data} size="small" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
            <Column field="user_id" header="User Id" sortable></Column>
            <Column field="user_no" header="User No" sortable></Column>
            <Column field="amount" header="Amount" sortable></Column>
            <Column field="character_name" header="Name" sortable></Column>
            <Column field="character_no" header="Character No" sortable></Column>
            <Column field="charge_type" header="Charge Type" sortable></Column>
            <Column field="map" header="Map" sortable></Column>
            <Column field="x" header="X" sortable></Column>
            <Column field="y" header="Y" sortable></Column>
            <Column field="item_tag" header="Item Tag" sortable></Column>
            <Column field="item_index" header="Item Index" sortable></Column>
            <Column field="log_date" header="Log Date" sortable></Column>
            <Column field="log_idx" header="Log Index" sortable></Column>
          </DataTable>
        </div>
      </Card>
    );
  }
};

export default ChargeLog;
