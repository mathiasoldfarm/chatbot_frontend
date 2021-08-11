import { 
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_ERROR,
  FETCH_PAGE_DATA_SUCCESS,
  UPDATE_FIELD_DATA,
  UPDATE_FIELD_DATA_ERROR,
  UPDATE_FIELD_DATA_SUCCESS,
  TOGGLE_LOG_IN_MODAL,
  COURSE_CREATION_ADD_SECTION,
  COURSE_CREATION_ADD_SECTION_ERROR,
  COURSE_CREATION_ADD_SECTION_SUCCESS,
  COURSE_CREATION_ADD_QUESTION,
  COURSE_CREATION_ADD_QUESTION_ERROR,
  COURSE_CREATION_ADD_QUESTION_SUCCESS,
  COURSE_CREATION_ADD_ANSWER,
  COURSE_CREATION_ADD_ANSWER_ERROR,
  COURSE_CREATION_ADD_ANSWER_SUCCESS,
  COURSE_CREATION_QUESTION_CHANGE_HANDLER,
  COURSE_CREATION_QUESTION_CHANGE_HANDLER_ERROR,
  COURSE_CREATION_QUESTION_CHANGE_HANDLER_SUCCESS,
  COURSE_CREATION_ANSWER_CHANGE_HANDLER,
  COURSE_CREATION_ANSWER_CHANGE_HANDLER_ERROR,
  COURSE_CREATION_ANSWER_CHANGE_HANDLER_SUCCESS,
  COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER,
  COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_ERROR,
  COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_SUCCESS,
  COURSE_CREATION_SET_SELECTED_ANSWER,
  COURSE_CREATION_SET_SELECTED_ANSWER_ERROR,
  COURSE_CREATION_SET_SELECTED_ANSWER_SUCCESS,
  COURSE_CREATION_SET_SECTION_TYPE_INFORMATION,
  COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_ERROR,
  COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_SUCCESS,
  COURSE_CREATION_SET_SECTION_TYPE_QUIZ,
  COURSE_CREATION_SET_SECTION_TYPE_QUIZ_ERROR,
  COURSE_CREATION_SET_SECTION_TYPE_QUIZ_SUCCESS,
  COURSE_CREATION_SET_QUESTION_INDEX,
  COURSE_CREATION_SET_QUESTION_INDEX_ERROR,
  COURSE_CREATION_SET_QUESTION_INDEX_SUCCESS,
  COURSE_CREATION_DELETE_SECTION,
  COURSE_CREATION_DELETE_SECTION_ERROR,
  COURSE_CREATION_DELETE_SECTION_SUCCESS,
  COURSE_CREATION_DELETE_QUESTION,
  COURSE_CREATION_DELETE_QUESTION_ERROR,
  COURSE_CREATION_DELETE_QUESTION_SUCCESS,
  COURSE_CREATION_DELETE_ANSWER,
  COURSE_CREATION_DELETE_ANSWER_ERROR,
  COURSE_CREATION_DELETE_ANSWER_SUCCESS,
} from '../../ActionTypes/Pages';

import {
  ANSWER_FETCHING_SUCCESS,
} from '../../ActionTypes/Chatbot';

const INITIAL_STATE = {
  data: {},
  fetching: false,
  fetchingError: false,
  showLogInModal: false,
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
        updatingSuccess: false,
        feedback: ""
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
    case COURSE_CREATION_ADD_SECTION:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: [...state.data.sections, {
            information: true,
            quiz: false,
            informationText: '',
            questions: [],
            questionId: -1,
            sectionId: action.sectionId
          }]
        }
      }
    case COURSE_CREATION_ADD_SECTION_SUCCESS:
        return {
          ...state,
          fetching: false,
        }
    case COURSE_CREATION_ADD_SECTION_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_ADD_QUESTION:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
      }
    case COURSE_CREATION_ADD_QUESTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questionIndex: section.questions.length,
                questions: [...section.questions, { question: "", questionId: action.questionId, answers: [{answer: "", answerId: action.answerId}], selected: 0 }]
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_ADD_QUESTION_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_ADD_ANSWER:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
      }
    case COURSE_CREATION_ADD_ANSWER_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questions: section.questions.map(question => {
                  if (action.questionId === question.questionId) {
                    return {
                      ...question,
                      answers: [...question.answers, {answer: "", answerId: action.answerId}]
                    }
                  }
                  return question;
                })
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_ADD_ANSWER_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_QUESTION_CHANGE_HANDLER:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questions: section.questions.map(question => {
                  if (action.questionId === question.questionId) {
                    return {
                      ...question,
                      question: action.newQuestion
                    }
                  }
                  return question;
                })
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_QUESTION_CHANGE_HANDLER_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_QUESTION_CHANGE_HANDLER_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_ANSWER_CHANGE_HANDLER:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questions: section.questions.map(question => {
                  if (action.questionId === question.questionId) {
                    return {
                      ...question,
                      answers: question.answers.map(answer => {
                        if (action.answerId === answer.answerId) {
                          return action.newAnswer
                        }
                        return answer;
                      })
                    }
                  }
                  return question;
                })
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_ANSWER_CHANGE_HANDLER_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_ANSWER_CHANGE_HANDLER_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                informationText: action.newText
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_SET_SELECTED_ANSWER:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questions: section.questions.map(question => {
                  if (action.questionId === question.questionId) {
                    return {
                      ...question,
                      selected: action.answerId
                    }
                  }
                  return question;
                })
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_SET_SELECTED_ANSWER_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_SET_SELECTED_ANSWER_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_SET_SECTION_TYPE_INFORMATION:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                information: true,
                quiz: false
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_SET_SECTION_TYPE_QUIZ:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
      }
    case COURSE_CREATION_SET_SECTION_TYPE_QUIZ_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                information: false,
                quiz: true
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_SET_SECTION_TYPE_QUIZ_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_SET_QUESTION_INDEX:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questionIndex: action.questionIndex
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_SET_QUESTION_INDEX_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_SET_QUESTION_INDEX_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_DELETE_SECTION:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.filter(section => section.sectionId !== action.sectionId)
        }
      }
    case COURSE_CREATION_DELETE_SECTION_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_DELETE_SECTION_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_DELETE_QUESTION:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questions: section.questions.filter(question => question.questionId !== action.questionId),
                questionId: section.questions.length === 1 ? 0 : section.questions.length - 2
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_DELETE_QUESTION_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    case COURSE_CREATION_DELETE_ANSWER:
      return {
        ...state,
        fetching: true,
        fetchingError: false,
        data: {
          ...state.data,
          sections: state.data.sections.map(section => {
            if ( action.sectionId === section.sectionId ) {
              return {
                ...section,
                questions: section.questions.map(question => {
                  if (action.questionId === question.questionId) {
                    return {
                      ...question,
                      answers: question.answers.filter(answer => answer.answerId !== action.answerId)
                    }
                  }
                  return question;
                })
              }
            }
            return section;
          })
        }
      }
    case COURSE_CREATION_DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case COURSE_CREATION_DELETE_ANSWER_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingError: action.error
      }
    default:
      return state;
  }
}

export default reducer;

