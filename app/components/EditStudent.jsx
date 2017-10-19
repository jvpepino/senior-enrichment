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
        image: image.value || undefined
      });
    }

    render () {

      return (
        <form id="new-message-form" onSubmit={this.handleSubmit}>
          <h1>UPDATE STUDENT</h1>
          <hr /><hr /><br />
          <div className="input-group input-group-lg">
            <label>NAME: </label>
            <input
              className="form-control"
              type="text"
              name="name"
            />
            <label>IMAGE-URL: </label>
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

  const mapDispatchToProps = function (dispatch, ownProps) {
    const history = ownProps.history;
    return {
      submitCampus: function(campus) {
        dispatch(postCampus(campus, history));
      }
    };
  };

export default connect(null, mapDispatchToProps)(AddCampus);
