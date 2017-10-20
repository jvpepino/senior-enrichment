import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';


////////////////////////////// INITIAL STATE ///////////////////////////////////

const intitalState = {
  campuses: [],
  students: []
};

//////////////////////////////// ACTION TYPES //////////////////////////////////

const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

////////////////////////////////////////////////////////////////////////////////

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';


/////////////////////////////// ACTION CREATORS ////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////// THUNK CREATORS ////////////////////////////////

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      })
      .catch(console.error.bind(console));
  };
}

export function postCampus(campus, history) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
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
    return axios.put(`/api/campuses/${campus.id}`, campus)
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
    return axios.delete(`/api/campuses/${campus.id}`)
    .then(() => {
      history.push('/campuses');
      dispatch(deleteCampus(campus));
    })
    .catch(console.error.bind(console));
  };
}

////////////////////////////////////////////////////////////////////////////////

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      })
      .catch(console.error.bind(console));
  };
}

export function postStudent(student, history) {
  return function thunk(dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(({student, bool}) => {
        if (bool) {
          dispatch(getStudent(student));
        }
        history.push(`/students/${student.id}`);
      })
      .catch(console.error.bind(console));
  };
}

export function updateStudent(student, history) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
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
    return axios.delete(`/api/students/${student.id}`, student)
    .then(() => {
      history.push('/students');
      dispatch(deleteStudent(student));
    })
    .catch(console.error.bind(console));
  };
}

////////////////////////////////// REDUCERS ////////////////////////////////////

function reducer (state = intitalState, action) {

  switch (action.type) {

    case GET_CAMPUS:
      return {...state, campuses: [...state.campuses, action.campus]};

    case GET_CAMPUSES:
      return {...state, campuses: action.campuses};

    case EDIT_CAMPUS: {
      const mappedCampusesArr = state.campuses.map(campus => {
        if (campus.id === action.campus.id) {
          return action.campus;
        } else return campus;
      });
      const mappedStudentsArr = state.students.map(student => {
        if (student.campusId === action.campus.id) {
          student.campus = action.campus;
        }
        return student;
      });
      return {...state, campuses: mappedCampusesArr, students: mappedStudentsArr };
    }

    case DELETE_CAMPUS: {
      function sortObjId(a,b) {
          return a.id - b.id;
      }
      const filteredCampusesArr = state.campuses.filter(campus => campus.id !== action.campus.id).sort(sortObjId);
      const filteredStudentsArr = state.students.filter(student => student.campusId !== action.campus.id).sort(sortObjId);
      return {...state, campuses: filteredCampusesArr, students: filteredStudentsArr};
    }

////////////////////////////////////////////////////////////////////////////////

    case GET_STUDENT:
      return {...state, students: [...state.students, action.student]};

    case GET_STUDENTS:
      return {...state, students: action.students};

    case EDIT_STUDENT: {
      const mappedStudentsArr = state.students.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        } else return student;
      });
      return {...state, students: mappedStudentsArr}
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
