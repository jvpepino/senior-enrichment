'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus, removeStudent, postStudent } from '../store';

export function SingleCampus (props) {

  function handleSubmit(evt, selectedCampus) {
    evt.preventDefault();

    const { name, email } = evt.target;
    const cid = selectedCampus.id;
    props.submitStudent({
      name: name.value,
      email: email.value,
      campusId: cid
    });
  }

  const { students, campuses, deleteCampus, deleteStudent } = props;
  const campusId = Number(props.match.params.campusId);
  const selectedCampus = campuses.length ? campuses.find(campus => campus.id === campusId) : {};
  const filteredStudents = students.filter(student => student.campusId === campusId);

  return (
    <div>
      <h1>CAMPUS</h1>
      <hr/><hr/>
      <h2>{selectedCampus.name} </h2>
      <hr/>
      <Link to={`/campuses/${selectedCampus.id}/edit`}>
        <button className="btn btn-default">Edit Campus</button>
      </Link>
      <button
        className="btn btn-default"
        onClick={() => deleteCampus(selectedCampus)}
        >Delete Campus
      </button>
      <hr/>
      <img src={ selectedCampus.image } />
      <form id="new-message-form" onSubmit={(evt) => handleSubmit(evt, selectedCampus)}>
      <hr/>
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
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Add Student</button>
        </span>
      </div>
      <hr/>
    </form>
      <h3>ENROLLMENT:</h3>
      <ul>
        {
          filteredStudents && filteredStudents.map(student => (
            <div key={student.id}>
              <Link to={`/students/${student.id}`}>
                <h3>#{student.id} - {student.name}</h3>
              </Link>
              <button
                className="btn btn-default"
                onClick={() => deleteStudent(student)}
                >Delete Student
              </button>
            </div>
          ))
        }
      </ul>
    </div>
  );
}

const mapDispatchToProps = function (dispatch, ownProps) {
  const history = ownProps.history;
  return {
    deleteCampus: function (campus) {
      dispatch(removeCampus(campus, history));
    },
    deleteStudent: function(student) {
      dispatch(removeStudent(student, history));
    },
    submitStudent: function(student) {
      dispatch(postStudent(student, history));
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



