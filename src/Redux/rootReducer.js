import { combineReducers } from 'redux';
import coursesReducer from './Reducers/Courses';

const rootReducer = combineReducers({
  courses: coursesReducer,
});

export default rootReducer;