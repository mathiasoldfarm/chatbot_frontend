import { UPDATE_TITLE } from '../../ActionTypes/Courses';
import courses_data from '../../../course.json';

const INITIAL_STATE = {
  data: courses_data.courses,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_TITLE:
      const new_data = [...state.data];
      new_data[action.index]["title"] = action.value;
      courses_data.courses = new_data;
      return {
        ...state,
        data: new_data
      }
    default:
      return state;
  }
}

export default reducer;