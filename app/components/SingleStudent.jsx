'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class SingleStudent extends Component {

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

export default connect(mapStateToProps)(SingleStudent);
