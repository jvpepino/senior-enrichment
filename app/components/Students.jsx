'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Students extends Component {

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

export default connect(mapStateToProps)(Students);
