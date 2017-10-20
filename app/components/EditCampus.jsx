'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { updateCampus } from '../store';

export function EditCampus (props) {

  function handleSubmit(evt, selectedCampus) {
    evt.preventDefault();

    const { name, image } = evt.target;
    const cid = selectedCampus.id;
    props.modCampus({
      name: name.value,
      image: image.value,
      id: cid
    });
  }

  const { campuses } = props;
  const campusId = Number(props.match.params.campusesId);
  const selectedCampus = campuses.length ? campuses.find(campus => campus.id === campusId) : {};

  return (
    <form id="new-message-form" onSubmit={(evt) => handleSubmit(evt, selectedCampus)}>
      <h1>EDIT CAMPUS</h1>
      <hr /><hr /><br />
      <div className="input-group input-group-lg">
        <label>NAME: </label>
        <input
          className="form-control"
          type="text"
          name="name"
          defaultValue={selectedCampus.name}
        />
        <label>IMAGE-URL: </label>
        <input
          className="form-control"
          type="text"
          name="image"
          defaultValue={selectedCampus.image}
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Submit</button>
        </span>
      </div>
    </form>
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
    modCampus: function(campus) {
      dispatch(updateCampus(campus, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus);
