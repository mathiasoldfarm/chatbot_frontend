import { 
  ANSWER_FETCHING,
  ANSWER_FETCHING_ERROR,
  ANSWER_FETCHING_SUCCESS,
  ADD_USER_ANSWER,
  RESET_MESSAGE_LIST,
  MESSAGE_LIST_UPDATED_HANDLED
} from '../../ActionTypes/Chatbot';

const INITIAL_STATE = {
  messageList: [],
  fetchingMessage: false,
  fetchingMessageError: '',
  currentHistoryId: null,
  currentCourseId: null,
  currentContextId: null,
  messageListUpdated: false
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
        messageList: [...state.messageList, action.message],
        currentHistoryId: action.message.data.historyId,
        currentCourseId: action.message.data.courseId,
        currentContextId: action.message.data.contextId,
        messageListUpdated: true,
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
        messageList: [...state.messageList, action.message],
        //messageListUpdated: true
      }
    case RESET_MESSAGE_LIST:
      return {
        ...state,
        messageList: []
      }
    case MESSAGE_LIST_UPDATED_HANDLED:
      return {
        ...state,
        messageListUpdated: false
      }
    default:
      return state;
  }
}

export default reducer;