import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getImages, createCompute, getComputes } from '../actions/computes.actions';
import { getNetworks } from '../actions/networks.actions';


import '../styles/order-form.css';

const scriptTypes = [
    'text/x-shellscript',
    'text/x-include-url',
    'text/upstart-job',
    'text/cloud-config',
    'text/cloud-boothook'    
];

const initialState = {
    member: '',
    imageId: '',
    vCPU: 1,
    disk: 30,
    memory: 1024,
    networkId: '',
    fednetId: '',
    file: '',
    scriptType: scriptTypes[0],
    publicKey: '',
    showError: false
};

class ComputeForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = () => {
        let { dispatch } = this.props;
        if(! this.props.images.loading) {
            dispatch(getImages());
        }
        if(! this.props.networks.loading) {
            dispatch(getNetworks());
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
        this.setState((props) => {
            return { showError: false }
        });
        let body = _.pickBy(this.state, _.identity);

        if(!body.file)
            delete body.scriptType;
        
        let { dispatch } = this.props;
        dispatch(createCompute(body));
    };

    render() {
        return (
            <div className="modal fade" id="form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Compute</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            {this.state.showError && <div className="error-message">Please, check your requirements!</div>}
                        </div>
                        <label>Minimal number of vCPUs</label>
                        <input value={this.state.vCPU} onChange={this.handleChange}
                            className="form-control" type="number" name="vCPU" min="1"/>

                        <label>Minimal amount of RAM in MB</label>
                        <input value={this.state.memory} onChange={this.handleChange}
                            className="form-control" type="number" name="memory" min="1"/>

                        <label>Member</label>
                        <select value={this.state.member} onChange={this.handleChange} 
                            name='member' className="form-control">
                            <option value=''>Choose a member</option>
                            {   
                                this.props.members.loading ?
                                this.props.members.data.map((member, idx) => <option key={idx} value={member}>{member}</option>):
                                undefined
                            }
                        </select>

                        <label>Image</label>
                        <select value={this.state.image} onChange={this.handleChange}
                            name='imageId' className="form-control">
                            <option value=''>Choose an image</option>
                            {
                                this.props.images.loading ?
                                Object.keys(this.props.images.data)
                                    .map((image, idx) => <option key={idx} value={image}>{this.props.images.data[image]}</option>):
                                undefined
                            }
                        </select>

                        <label>Network id</label>
                        <select value={this.state.network} onChange={this.handleChange} 
                            name='networkId' className="form-control">
                            <option value=''>Choose a network</option>
                            { 
                                this.props.networks.loading ?
                                this.props.networks.data.map((network, idx) => <option key={idx} value={network.instanceId}>{network.instanceId}</option>):
                                undefined
                            }
                        </select>

                        <label>Federated network id</label>
                        <select value={this.props.fednetId} onChange={this.handleChange}
                            name='fednetId' className="form-control">
                            <option value=''>Choose a federated network</option>
                            { 
                                this.props.members.loading ?
                                this.props.members.data.map((member, idx) => <option key={idx} value={member}>{member}</option>):
                                undefined
                            }
                        </select>

                        <label>Extra user file</label>
                        <input value={this.state.file} onChange={this.handleChange}
                            type="file" className="form-control" name="file"/>

                        <label>Extra user data file type</label>
                        <select value={this.state.scriptType} onChange={this.handleChange}
                            name='scriptType' className="form-control">
                            <option value=''></option>
                            { scriptTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>) }
                        </select>

                        <label>Public key</label>
                        <textarea value={this.state.publicKey} onChange={this.handleChange} 
                            className="form-control" name="publicKey"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Create Compute</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = state => ({
    members: state.members,
    images: state.images,
    networks: state.networks
});

export default connect(stateToProps)(ComputeForm);