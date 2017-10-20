'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeStudent } from '../store';

export class SingleStudent extends Component {
  constructor (props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete (student) {
    this.props.deleteStudent(student);
  }

  render () {

    const { students, campuses } = this.props;
    const studentId = Number(this.props.match.params.studentsId);
    const selectedStudent = students.length ? students.find(student => student.id === studentId) : {};

    return (
      <div>
        <h1>STUDENT</h1>
        <hr/><hr/>
        <h3>ID#: {selectedStudent.id} </h3>
        <h3>NAME: {selectedStudent.name}</h3>
        <Link to={`/campuses/${selectedStudent.campusId}`}>
          <h3>CAMPUS: {selectedStudent.campus && selectedStudent.campus.name}</h3>
        </Link>
        <h3>E-MAIL: {selectedStudent.email}</h3>
        <Link to={`/students/${selectedStudent.id}/edit`}>
          <button className="btn btn-default">Edit</button>
        </Link>
        <button
          className="btn btn-default"
          onClick={() => this.handleDelete(selectedStudent)}
          >Delete
        </button>
      </div>
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
    deleteStudent: function(student) {
      dispatch(removeStudent(student, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
