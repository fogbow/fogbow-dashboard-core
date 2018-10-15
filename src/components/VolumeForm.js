import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createVolume } from '../actions/volumes.actions';

const initialState = {
  name: '',
  volumeSize: 1,
  name: '',
  providingMember: ''
};

class VolumeForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

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
    dispatch(createVolume(body));
    this.resetForm();
  };

  resetForm = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className="modal fade" id="form" tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Volume</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
              <label>Name</label>
              <input className="form-control" type="text" name="name"
                     value={this.state.name} onChange={this.handleChange}/>

              <label>Volume size (in GB)</label>
              <input className="form-control" type="number" name="volumeSize"
                     value={this.state.volumeSize} onChange={this.handleChange} min="1"/>

              <label>Providing Member</label>
              <select name='providingMember' className="form-control"
                      value={this.state.providingMember} onChange={this.handleChange}>
                <option value=''></option>
                { this.props.members.data.map((member, idx) =>
                    <option key={idx} value={member}>{member}</option>
                  )
                }
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal"
                      onClick={this.handleSubmit}>
                Create Volume
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => ({
  members: state.members
});

export default connect(stateToProps)(VolumeForm);
