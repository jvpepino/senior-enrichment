'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeStudent } from '../store';

export function Students (props) {

  const { students, deleteStudent } = props;

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
              <button
                className="btn btn-default"
                onClick={() => deleteStudent(student)}
                >Delete
              </button>
            </div>
          ))
        }
      </ul>
    </div>
  );
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
