'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus } from '../store';

export class SingleCampus extends Component {

  render () {
    const { students, campuses, deleteCampus } = this.props;
    const campusId = Number(this.props.match.params.campusId);
    const selectedCampus = campuses.length ? campuses.find(campus => campus.id === campusId) : {};
    const filteredStudents = students.filter(student => student.campusId === campusId);

    return (
      <div>
        <h1>CAMPUS</h1>
        <hr/><hr/>
        <h2>{selectedCampus.name} </h2>
        <Link to={`/campuses/${selectedCampus.id}/edit`}>
          <button className="btn btn-default">Edit</button>
        </Link>
        <button
          className="btn btn-default"
          onClick={() => deleteCampus(selectedCampus)}
          >Delete
        </button>
        <img src={ selectedCampus.image } />
        <h3>ENROLLMENT:</h3>
        <ul>
          {
            filteredStudents && filteredStudents.map(student => (
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                  <h3>#{student.id} - {student.name}</h3>
                </Link>
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  const history = ownProps.history;
  return {
    deleteCampus: function (campus) {
      dispatch(removeCampus(campus, history));
    }
  };
};

const mapStateToProps = function (state) {
  return {
    students: state.students,
    campuses: state.campuses
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
