import React from 'react';
import { Component } from 'react';
import { Space, Table, Tag, theme, ConfigProvider } from 'antd';

export default class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = { table_data: [] };
  }

  fetchTable() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(res => this.setState({ table_data: res }));
  }

  componentDidMount() {
    this.fetchTable();
  }

  render() {
    const { darkAlgorithm } = theme;

    return (
      <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
        <Table columns={this.props.columns} dataSource={this.state.table_data} style={{ overflowX: "hidden" }} />
      </ConfigProvider>
    );
  }
}
