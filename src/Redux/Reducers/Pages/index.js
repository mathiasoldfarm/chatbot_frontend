import { 
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_ERROR,
  FETCH_PAGE_DATA_SUCCESS
} from '../../ActionTypes/Pages';

const INITIAL_STATE = {
  data: {},
  fetching: false,
  fetchingError: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_PAGE_DATA:
      return {
        ...state,
        data: {},
        fetching: true,
        fetchingError: false
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
    default:
      return state;
  }
}

export default reducer;

