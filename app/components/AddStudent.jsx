'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store';

export class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { name, email, campusId } = evt.target;
    this.props.submitStudent({
      name: name.value,
      email: email.value,
      campusId: campusId.value
    });
  }

  render () {
    const { campuses } = this.props;

    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <h1>ADD STUDENT</h1>
        <hr/><hr/><br/>
        <div className="input-group input-group-lg">
          <label>NAME: </label>
          <input
            className="form-control"
            type="text"
            name="name"
          />
          <label>EMAIL: </label>
          <input
            className="form-control"
            type="text"
            name="email"
          />
          <label>CAMPUS: </label>
          <select
            className="form-control"
            type="text"
            name="campusId"
          >
            {
              campuses.map( campus =>
                <option value={campus.id} key={campus.id}>{campus.name}</option>
              )
            }
          </select>
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Submit</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    students: state.students,
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  const history = ownProps.history;
  return {
    submitStudent: function(student) {
      dispatch(postStudent(student, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);

