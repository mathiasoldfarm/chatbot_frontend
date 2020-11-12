import {
  COURSES_FETCHING,
  COURSES_FETCHING_ERROR,
  COURSES_FETCHING_SUCCESS
} from '../../ActionTypes/Courses';

export const coursesFetching = () => {
  return {
    type: COURSES_FETCHING
  }
}

export const coursesFetchingError = (error) => {
  return {
    type: COURSES_FETCHING_ERROR,
    error
  }
}

export const coursesFetchingSuccess = () => {
  return {
    type: COURSES_FETCHING_SUCCESS
  }
}