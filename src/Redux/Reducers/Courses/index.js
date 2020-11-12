import {
  COURSES_FETCHING,
  COURSES_FETCHING_ERROR,
  COURSES_FETCHING_SUCCESS
} from '../../ActionTypes/Courses';

const INITIAL_STATE = {
  data: {},
  coursesFetching: false,
  coursesFetchingError: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case COURSES_FETCHING:
      return {
        ...state,
        coursesFetching: true,
        coursesFetchingError: ''
      }
    case COURSES_FETCHING_ERROR:
      return {
        ...state,
        coursesFetching: false,
        coursesFetchingError: action.error
      }
    case COURSES_FETCHING_SUCCESS:
      return {
        ...state,
        coursesFetching: false,
      }
    default:
      return state;
  }
}

export default reducer;