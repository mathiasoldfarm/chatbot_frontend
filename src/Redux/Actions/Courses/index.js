import { UPDATE_TITLE } from '../../ActionTypes/Courses';

export const updateTitle = (value, index) => {
  return {
    type: UPDATE_TITLE,
    value,
    index
  };
}