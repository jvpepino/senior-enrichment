'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../store';

export class EditStudent extends Component {

  handleSubmit(evt, selectedStudent) {
    evt.preventDefault();

    const { name, email, campusId } = evt.target;
    const sid = selectedStudent.id;
    this.props.modStudent({
      name: name.value,
      email: email.value,
      campusId: Number(campusId.value),
      id: sid
    });
  }

  render () {
    const { students, campuses } = this.props;
    const studentId = Number(this.props.match.params.studentsId);
    const selectedStudent = students.length ? students.find(student => student.id === studentId) : {};

    return (
      <form id="new-message-form" onSubmit={(evt) => this.handleSubmit(evt, selectedStudent)}>
        <h1>EDIT STUDENT</h1>
        <hr /><hr /><br />
        <div className="input-group input-group-lg">
          <label>NAME: </label>
          <input
            className="form-control"
            type="text"
            name="name"
            defaultValue={selectedStudent.name}
          />
          <label>EMAIL: </label>
          <input
            className="form-control"
            type="text"
            name="email"
            defaultValue={selectedStudent.email}
          />
          <label>CAMPUS: </label>
          <select
          className="form-control"
          type="text"
          name="campusId"
          defaultValue={selectedStudent.campusId}
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
    modStudent: function(student) {
      dispatch(updateStudent(student, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);
