'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus } from '../store';

export class Campuses extends Component {

  render () {

    const { students, campuses, deleteCampus } = this.props;

    return (
      <div>
      <h1>CAMPUS LIST</h1>
      <hr/><hr/>
      <ul>
        {
          campuses && campuses.map(campus => (
            <div key={campus.id}>
              <Link to={`/campuses/${campus.id}`}>
                <h3>#{campus.id} - {campus.name}</h3>
                <img src={campus.image} />
              </Link>
              <button
                className="btn btn-default"
                onClick={() => deleteCampus(campus)}
                >Delete
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);

