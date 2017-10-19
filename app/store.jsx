import { createStore, applyMiddleware } from 'redux';
//import rootReducer from './reducers';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';


// INITIAL STATE

const intitalState = {
  campuses: [],
  students: []
};


// ACTION TYPES
const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';


// ACTION CREATORS
export function getCampus (campus) {
  return { type: GET_CAMPUS, campus };
}

export function getCampuses (campuses) {
  return { type: GET_CAMPUSES, campuses };
}

export function getStudent (student) {
  return { type: GET_STUDENT, student };
}

export function getStudents (students) {
  return { type: GET_STUDENTS, students };
}

// THUNK CREATORS

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  };
}

export function postCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(getCampus(newCampus));
      });
  };
}

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      });
  };
}

export function postStudent(student) {
  return function thunk(dispatch) {
    return axios.post('api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(getStudent(newStudent));
      });
  };
}

// REDUCER

function reducer (state = intitalState, action) {

  switch (action.type) {

    case GET_CAMPUS:
      return {...state, campuses: [...state.campuses, action.campus]};

    case GET_CAMPUSES:
      return {...state, campuses: action.campuses};

    case GET_STUDENT:
      return {...state, students: [...state.students, action.student]};

    case GET_STUDENTS:
      return {...state, students: action.students};

    default:
      return state;
  }
 }

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger)));


