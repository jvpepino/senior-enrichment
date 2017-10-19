'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeStudent } from '../store';

export class Students extends Component {

  constructor (props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete (student) {
    this.props.deleteStudent(student);
  }

  render () {

    const { students, campuses } = this.props;

    return (
      <div>
        <h1>STUDENT LIST</h1>
        <hr/><hr/>
        <ul>
          {
            students && students.map(student => (
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                  <h3>#{student.id} - {student.name} - {student.campus.name}</h3>
                </Link>
                <button className="btn btn-default"
                onClick={() => this.handleDelete(student)}>Delete</button>
              </div>
            ))
          }
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Students);
