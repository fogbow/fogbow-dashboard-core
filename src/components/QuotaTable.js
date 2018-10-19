import React, { Component } from 'react';

import { env } from '../defaults/api.config';

const columns = [
  { label: 'Instance', key: 'instances'},
  { label: 'vCPU', key: 'vCPU'},
  { label: 'RAM', key: 'ram'},
  { label: 'Volume', key: 'volumes'},
  { label: 'Storage', key: 'storages'},
  { label: 'FIP', key: 'fips'},
  { label: 'Network', key: 'networks' }
];

const rows = [
  { label: 'Shared quota',  key: 'totalQuota' },
  { label: 'Available quota',  key: 'availableQuota' },
  { label: 'Quota used by me',  key: 'usedQuota' },
];

class QuotaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows,
      columns,
      vendor: ''
    }
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({
        [name]: value
    });
  };

  vendorChange = (event) => {
    this.handleChange(event);
    this.props.vendorChange(event);
  };

  getFirstLabel = () => {
    let label = this.props.label;
    let vendors = this.props.vendors;
    if (label) {
      return <th key={label}>{label}</th>
    } else {
      return(
        <th>
          <select value={this.state.vendor} onChange={this.vendorChange} name='vendor'>
            <option value=''>Select a Remote Member</option>
            {
              vendors.map((vendor, idx) => {
                if (vendor === env.local) {
                  return undefined;
                }
                return <option key={idx} value={vendor}>{vendor}</option>;
              })
            }
          </select>
        </th>
      );
    }
  };

  getHeaders = () => {
    let columns = this.state.columns.map(col => col.label);

    return (
      <tr>
        {this.getFirstLabel()}
        {columns.map(header => <th key={header}>{header}</th>)}
      </tr>
    );
  };

  getRows = () => {
    let data = this.props.data;
    return this.state.rows
      .map(row => {
        return(
          <tr key={row.label}>
            <td key={row.label}>{row.label}</td>
            {this.getCells(data[row.key])}
          </tr>
        );
    });
  };

  getCells = (row) => {
    let cells = this.state.columns.map(col => col.key);
    return cells.map((key, index) => {
      return row[key] ? <td key={key}>{row[key]}</td> : <td key={index}>-</td>
    });
  };

  render() {
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          {this.getHeaders()}
        </thead>
        <tbody>
          {this.getRows()}
        </tbody>
      </table>
    );
  }
}

export default QuotaTable;
