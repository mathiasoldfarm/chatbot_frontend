import { 
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_ERROR,
  FETCH_PAGE_DATA_SUCCESS,
  UPDATE_FIELD_DATA,
  UPDATE_FIELD_DATA_ERROR,
  UPDATE_FIELD_DATA_SUCCESS,
  TOGGLE_LOG_IN_MODAL,
} from '../../ActionTypes/Pages';

import {
  ANSWER_FETCHING_SUCCESS,
} from '../../ActionTypes/Chatbot';

const INITIAL_STATE = {
  data: {},
  fetching: false,
  fetchingError: false,
  showLogInModal: false
};

const setSectionDone = (sections, sectionId) => {
  if ( sectionId !== -1) {
    sections.forEach(section => {
      if ( section.id === sectionId ) {
        section.done = true;
      } else if ( section.children.length > 0 ) {
        setSectionDone(section.children, sectionId);
      }
    });
  }

  return sections;
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_PAGE_DATA:
      return {
        ...state,
        data: {},
        fetching: true,
        fetchingError: false,
        updating: false,
        updatingError: false,
        updatingSuccess: false
      }
    case FETCH_PAGE_DATA_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case FETCH_PAGE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
      }
    case UPDATE_FIELD_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value
        },
        updating: true,
        updatingError: false,
        updatingSuccess: false
      }
    case UPDATE_FIELD_DATA_ERROR:
      return {
        ...state,
        updating: false,
        updatingError: action.error
      }
    case UPDATE_FIELD_DATA_SUCCESS:
      return {
        ...state,
        updating: false,
        updatingSuccess: true
      }
    case TOGGLE_LOG_IN_MODAL:
      return {
        ...state,
        showLogInModal: !state.showLogInModal
      }
    case ANSWER_FETCHING_SUCCESS:
      return {
        ...state,
        data: setSectionDone([...state.data], action.id)
      }
    default:
      return state;
  }
}

export default reducer;

