import { combineReducers } from 'redux';
import coursesReducer from './Reducers/Courses';
import chatbotReducer from './Reducers/Chatbot';

const rootReducer = combineReducers({
  courses: coursesReducer,
  chatbot: chatbotReducer
});

export default rootReducer;