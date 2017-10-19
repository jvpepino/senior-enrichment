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
// const EDIT_CAMPUS = 'EDIT_CAMPUS';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';


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

export function editStudent (student) {
  return { type: EDIT_STUDENT, student};
}

// THUNK CREATORS

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      })
      .catch(console.error.bind(console));
  };
}

export function postCampus(campus, history) {
  return function thunk(dispatch) {
    return axios.post('api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(getCampus(newCampus))
        history.push(`/campuses/${newCampus.id}`);
      })
      .catch(console.error.bind(console));
  };
}

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      })
      .catch(console.error.bind(console));
  };
}

export function postStudent(student, history) {
  return function thunk(dispatch) {
    return axios.post('api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(getStudents(newStudent));
        history.push(`/students/${newStudent.id}`);
      })
      .catch(console.error.bind(console));
  };
}

// export function updateStudent(student, history) {
//   return function thunk(dispatch) {
//     return axios.put(`api/students/${student.id}`, student)
//       .then(res => axios.get('api/students'))
//       .then(res => res.data)
//       .then(students => {
//         dispatch(getStudents(students));
//         history.push(`/students/${student.id}`);
//       })
//       .catch(console.error.bind(console));
//   };
// }

export function updateStudent(student, history) {
  return function thunk(dispatch) {
    return axios.put(`api/students/${student.id}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        dispatch(editStudent(updatedStudent));
        history.push(`/students/${updatedStudent.id}`);
      })
      .catch(console.error.bind(console));
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

    case EDIT_STUDENT: {
      const modStudentId = action.student.id;
      const newState = {...state};
      const filteredStudentArr = newState.students.filter(student => student.id !== modStudentId)
      filteredStudentArr.push(action.student)
      newState.students = filteredStudentArr;
      return newState;
    }


    default:
      return state;
  }
 }

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger)));


