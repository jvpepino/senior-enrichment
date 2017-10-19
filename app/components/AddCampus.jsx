'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../store';


export class AddCampus extends Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
      evt.preventDefault();

      const { name, image } = evt.target;
      this.props.submitCampus({
        name: name.value,
        image: image.value
      });
      this.props.history.push('/campuses');
    }

    render () {
      const { campuses, students } = this.props;

      return (
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <h1>ADD CAMPUS</h1>
          <div className="input-group input-group-lg">
            <label>NAME: </label>
            <input
              className="form-control"
              type="text"
              name="name"
            />
            <label>IMAGE: </label>
            <input
              className="form-control"
              type="text"
              name="image"
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Submit</button>
            </span>
          </div>
        </form>
      );
    }
  }

  const mapStateToProps = function (state) {
    return {
      students: state.students,
      campuses: state.campuses
    };
  };

  const mapDispatchToProps = function (dispatch) {
    return {
      submitCampus: function(campus) {
        dispatch(postCampus(campus));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddCampus);

