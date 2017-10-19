'use strict';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import AddCampus from './AddCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import EditCampus from './EditCampus';
import { fetchStudents, fetchCampuses } from '../store';

export class Main extends Component {

  componentDidMount () {
    this.props.getAllStudents();
    this.props.getAllCampuses();
  }

  render () {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <hr/><hr/><hr/>
        <br/>
        <div>
          <Switch>
            <Route exact path='/campuses' component={Campuses} />
            <Route exact path='/campuses/add' component={AddCampus} />
            <Route exact path='/campuses/:campusId' component={SingleCampus} />
            <Route path='/campuses/:campusesId/edit' component={EditCampus} />
            <Route exact path='/students' component={Students} />
            <Route exact path='/students/add' component={AddStudent} />
            <Route exact path='/students/:studentsId' component={SingleStudent} />
            <Route path='/students/:studentsId/edit' component={EditStudent} />
            <Route component={Campuses} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    getAllStudents: function() {
      dispatch(fetchStudents());
    },
    getAllCampuses: function() {
      dispatch(fetchCampuses());
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Main));
