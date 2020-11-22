import { combineReducers } from 'redux';
import coursesReducer from './Reducers/Courses';
import chatbotReducer from './Reducers/Chatbot';
import pagesReducer from './Reducers/Pages';

const rootReducer = combineReducers({
  courses: coursesReducer,
  chatbot: chatbotReducer,
  pages: pagesReducer
});

export default rootReducer;