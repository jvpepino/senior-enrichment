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
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

////////////////////////////////////////////////

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';


// ACTION CREATORS
export function getCampus (campus) {
  return { type: GET_CAMPUS, campus };
}

export function getCampuses (campuses) {
  return { type: GET_CAMPUSES, campuses };
}

export function editCampus (campus) {
  return { type: EDIT_CAMPUS, campus};
}

export function deleteCampus (campus) {
  return { type: DELETE_CAMPUS, campus};
}

///////////////////////////////////////////////

export function getStudent (student) {
  return { type: GET_STUDENT, student };
}

export function getStudents (students) {
  return { type: GET_STUDENTS, students };
}

export function editStudent (student) {
  return { type: EDIT_STUDENT, student};
}

export function deleteStudent (student) {
  return { type: DELETE_STUDENT, student};
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

export function updateCampus(campus, history) {
  return function thunk(dispatch) {
    return axios.put(`api/campuses/${campus.id}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        dispatch(editCampus(updatedCampus));
        history.push(`/campuses/${updatedCampus.id}`);
      })
      .catch(console.error.bind(console));
  };
}

export function removeCampus(campus, history) {
  return function thunk(dispatch) {
    axios.delete(`api/campuses/${campus.id}`, campus)
    .then(() => {
        dispatch(deleteCampus(campus));
        history.push(`/campuses`);
      })
      .catch(console.error.bind(console));
  };
}

//////////////////////////////////////////////////////////////

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
        dispatch(getStudent(newStudent));
        history.push(`/students/${newStudent.id}`);
      })
      .catch(console.error.bind(console));
  };
}

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

export function removeStudent(student, history) {
  return function thunk(dispatch) {
    axios.delete(`api/students/${student.id}`, student)
    .then(() => {
        dispatch(deleteStudent(student));
        console.log("TEST");
        history.push(`/students`);
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

    case EDIT_CAMPUS: {
      const modCampusId = action.campus.id;
      console.log(modCampusId);
      const newState = {...state};
      const mapCampusesArr = newState.campuses.map(campus => {
        if (campus.id !== modCampusId) {
          return campus;
        } else return action.campus
      });
      console.log(mapCampusesArr);
      newState.campuses = mapCampusesArr;
      return newState;
    }

    case DELETE_CAMPUS: {
      const filteredCampusArr = state.campus.filter(campus => campus.id !== action.campus.id );
      return {...state, students: filteredCampusArr};
    }

    /////////////////////////////////////////////////////////////

    case GET_STUDENT:
      return {...state, students: [...state.students, action.student]};

    case GET_STUDENTS:
      return {...state, students: action.students};

    case EDIT_STUDENT: {
      const modStudentId = action.student.id;
      const newState = {...state};
      const mapStudentsArr = newState.students.map(student => {
        if (student.id !== modStudentId) {
          return student;
        } else return action.student
      });
      newState.students = mapStudentsArr;
      return newState;
    }

    case DELETE_STUDENT: {
      const filteredStudentArr = state.students.filter(student => student.id !== action.student.id );
      return {...state, students: filteredStudentArr};
    }

    default:
      return state;
  }
 }

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger)));

  // const modStudentId = action.student.id;
  // const newState = {...state};
  // const filteredStudentArr = newState.students.filter(student => student.id !== modStudentId);
  // filteredStudentArr.push(action.student);
  // newState.students = filteredStudentArr;
  // return newState;
