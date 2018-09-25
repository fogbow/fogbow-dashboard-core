import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../styles/details.css';

import { getComputes } from '../actions/computes.actions';
import { createFloatIp } from '../actions/floatIps.actions';

const initialState = {
    name: '',
    providingMember: '',
    computeOrderId: '',
};

class FloatingIpForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = () => {
        let { dispatch } = this.props;
        if(! this.props.computes.loading) {
            dispatch(getComputes());
        }
    };

    handleChange = (event) => {
        let { name, value } = event.target;
        
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let body = _.pickBy(this.state, _.identity);
        
        let { dispatch } = this.props;
        dispatch(createFloatIp(body));
        this.resetForm();
    };

    resetForm = () => {
        this.setState(initialState);
    };

    render() {
        return (
            <div className="modal fade" id="form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Floating IP</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Name</label>
                            <input value={this.state.name} onChange={this.handleChange}
                            className="form-control" type="text" name="name"/>  
                            
                            <label>Member</label>
                            <select name='providingMember' className="form-control" required 
                                value={this.state.member} onChange={this.handleChange}>
                                <option value=''></option>
                                { this.props.members.data.map((member, idx) => <option key={idx} value={member}>{member}</option>) }
                            </select>

                            <label>Compute</label>
                            <select  name='computeOrderId' className="form-control" required
                                value={this.state.source} onChange={this.handleChange}>
                                <option value=''></option>
                                {
                                    this.props.computes.loading ?
                                    this.props.computes.data
                                        .filter(volume => volume.state === 'READY')
                                        .map((compute, idx) => <option key={idx} value={compute.instanceId}>{compute.instanceId}</option>):
                                    undefined
                                }
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={this.handleSubmit}>Create Attachment</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = state => ({
    members: state.members,
    computes: state.computes
});

export default connect(stateToProps)(FloatingIpForm);