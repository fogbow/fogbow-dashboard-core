import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderList from '../components/OrderList';
import { getNetworks } from '../actions/networks.actions';

class FederetedNetworksPage extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(getNetworks())
    };

    get networks() {
        return this.props.networks.loading ? this.props.networks.data: [];
    } 

    render() {
        return (
            <OrderList orders={this.networks} disableProvider={true}/>
        );
    }
}

const stateToProps = state => ({
    networks: state.networks
});

export default connect(stateToProps)(FederetedNetworksPage);