import { 
  ANSWER_FETCHING,
  ANSWER_FETCHING_ERROR,
  ANSWER_FETCHING_SUCCESS,
  ADD_USER_ANSWER,
  RESET_MESSAGE_LIST
} from '../../ActionTypes/Chatbot';

const INITIAL_STATE = {
  messageList: [],
  fetchingMessage: false,
  fetchingMessageError: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ANSWER_FETCHING:
      return {
        ...state,
        fetchingMessage: true,
        fetchingMessageError: ''
      }
    case ANSWER_FETCHING_SUCCESS:
      return {
        ...state,
        fetchingMessage: false,
        messageList: [...state.messageList, action.message]
      }
    case ANSWER_FETCHING_ERROR:
      return {
        ...state,
        fetchingMessage: false,
        fetchingMessageError: action.error
      }
    case ADD_USER_ANSWER:
      return {
        ...state,
        messageList: [...state.messageList, action.message]
      }
    case RESET_MESSAGE_LIST:
      return {
        ...state,
        messageList: []
      }
    default:
      return state;
  }
}

export default reducer;