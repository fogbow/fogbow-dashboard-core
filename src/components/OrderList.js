import React, { Component } from 'react';

import OrderComponent from './OrderComponent';
import { connect } from 'react-redux';

const headers = [
    'ID', 'Name', 'Provider', 'State', 'Actions'
];

class OrderList extends Component {
    constructor(props) {
        super(props);

        let hds = this.props.disableProvider ? headers.filter(h => h !== 'Provider'): headers;
        this.state = {
            headers: hds,
            orderName: '',
            rows: []
        };
    }

    getHeaders = () => {
        return(
            <tr>
                {this.state.headers
                    .map(header => {
                        return <th key={header}>{header}</th>
                })}
            </tr>
        );
    };

    filteredOrders = () => {
        let filter = this.state.orderName;
        return this.props.orders.filter(order => {
            return order.id.includes(filter) ||
                order.provider.includes(filter) ||
                order.state.includes(filter);
        });
    };

    getLines = (orders) => {
      return orders.map(order => {
          return(
            <OrderComponent key={order.instanceId} order={order} type={this.props.type}
                            disableProvider={this.props.disableProvider}
                            handleShow={() => this.props.handleShow(order.instanceId)}/>
          );
      });
    };

    handleChange = (event) => {
      let { name, value } = event.target;

      this.setState({
          [name]: value
      });
    };

    componentWillReceiveProps(props) {
      let lns = this.getLines(props.orders);
      this.setState((state, props) => ({
        rows: lns
      }));
    }

    render() {
        return (
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                  <form className="form-inline ml-auto my-2 my-lg-0">
                    <input value={this.state.orderName} type="search" onChange={this.handleChange}
                           name="orderName" placeholder="Search"
                           className="form-control mr-sm-2 my-2"/>

                    <button type="button" className="btn btn-btn-dark my-2 my-sm-0"
                            data-toggle="modal" data-target="#form">Create</button>

                    <div>
                        {this.props.form}
                    </div>
                  </form>
                  </div>
                </nav>
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                      {this.getHeaders()}
                  </thead>
                  <tbody>
                      {this.state.rows}
                  </tbody>
                </table>
            </div>
        );
    }
}

export default connect()(OrderList);
