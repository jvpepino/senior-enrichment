'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Campuses extends Component {

  render () {

    const { students, campuses } = this.props;

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

export default connect(mapStateToProps)(Campuses);

