import { combineReducers } from 'redux';
import coursesReducer from './Reducers/Courses';
import chatbotReducer from './Reducers/Chatbot';
import pagesReducer from './Reducers/Pages';
import userReducer from './Reducers/Users';

const rootReducer = combineReducers({
  courses: coursesReducer,
  chatbot: chatbotReducer,
  pages: pagesReducer,
  users: userReducer
});

export default rootReducer;