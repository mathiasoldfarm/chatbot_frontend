import {
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_SUCCESS,
  FETCH_PAGE_DATA_ERROR,
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

import { get, post } from '../../../Components/CoursesDashboard/request';

export const fetchPageData = (dependingData) => {
  return async dispatch => {
    dispatch({
      type: FETCH_PAGE_DATA
    });

    try {
      let url = '/views';
      const location = window.location.href.split("http://localhost:3000/")[1];
      if (location) {
        url += '/';
        url += location;
      }
      if ( dependingData ) {
        for(let i = 0; i < dependingData.length; i++) {
          url += '/'
          url += dependingData[i]
        }
      }

      console.log(url);

      const payload = await get(url);

      dispatch({
        type: FETCH_PAGE_DATA_SUCCESS,
        payload
      })

    } catch(error) {
      if ( error.response ) {
        if ( error.response.status === 401 ) {
          dispatch({
            type: FETCH_PAGE_DATA_ERROR,
            error: `You don't have access to this. Try to login`
          });
        } else if (error.response.status === 404 ) {
          dispatch({
            type: FETCH_PAGE_DATA_SUCCESS,
            payload: {}
          });
        } else {
          dispatch({
            type: FETCH_PAGE_DATA_ERROR,
            error: error.response.data
          });
        }
      } else {
        dispatch({
          type: FETCH_PAGE_DATA_ERROR,
          error: `An error occured while fetching data: ${error}`
        });
      }
    }
  }
}

export const updateUserField = (field, value) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_FIELD_DATA,
      field,
      value
    });

    try {
      await post('/users/field/update', { field, value });

      dispatch({
        type: UPDATE_FIELD_DATA_SUCCESS,
      });

    } catch(error) {
      if (error.response) {
        dispatch({
          type: UPDATE_FIELD_DATA_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: UPDATE_FIELD_DATA_ERROR,
          error: error.toString()
        })
      }
    }
  }
}

export const toggleLogInModal = () => {
  return {
    type: TOGGLE_LOG_IN_MODAL
  }
}

export const addSection = () => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_ADD_SECTION,
    });

    try {
      await post('/coursecreation/add_section');

      dispatch({
        type: COURSE_CREATION_ADD_SECTION_SUCCESS,
      });
      window.scrollTo({
        top: (window.innerHeight - 56) * this.state.sections.length - 1,
        left: 0,
        behavior: 'smooth'
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_ADD_SECTION_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_ADD_SECTION_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const addQuestion = (sectionId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_ADD_QUESTION
    });

    try {
      const response = await post('/coursecreation/add_question', { sectionId });
      const { questionId, answerId } = response;

      dispatch({
        type: COURSE_CREATION_ADD_QUESTION_SUCCESS,
        sectionId,
        questionId,
        answerId
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_ADD_QUESTION_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_ADD_QUESTION_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const addAnswer = (sectionId, questionId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_ADD_ANSWER,
    });

    try {
      await post('/coursecreation/add_answer', { sectionId, questionId });

      dispatch({
        type: COURSE_CREATION_ADD_ANSWER_SUCCESS,
        sectionId,
        questionId
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_ADD_ANSWER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_ADD_ANSWER_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const questionChangeHandler = (sectionId, questionId, newQuestion) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_QUESTION_CHANGE_HANDLER,
      sectionId,
      questionId,
      newQuestion
    });

    try {
      await post('/coursecreation/question_change_handler', { sectionId, questionId, newQuestion });

      dispatch({
        type: COURSE_CREATION_QUESTION_CHANGE_HANDLER_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_QUESTION_CHANGE_HANDLER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_QUESTION_CHANGE_HANDLER_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const answerChangeHandler = (sectionId, questionId, answerId, newAnswer) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_ANSWER_CHANGE_HANDLER,
      sectionId,
      questionId,
      answerId,
      newAnswer
    });

    try {
      await post('/coursecreation/answer_change_handler', { sectionId, questionId, answerId, newAnswer });

      dispatch({
        type: COURSE_CREATION_ANSWER_CHANGE_HANDLER_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_ANSWER_CHANGE_HANDLER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_ANSWER_CHANGE_HANDLER_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const informationTextChangeHandler = (informationTextId, sectionId, newText) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER,
      sectionId,
      newText
    });

    try {
      await post('/coursecreation/information_text_change_handler', { informationTextId, newText });

      dispatch({
        type: COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_INFORMATION_TEXT_CHANGE_HANDLER_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const setSelectedAnswer = (sectionId, questionId, answerId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_SET_SELECTED_ANSWER,
      sectionId,
      questionId,
      answerId
    });

    try {
      await post('/coursecreation/set_selected_answer', { sectionId, questionId, answerId });

      dispatch({
        type: COURSE_CREATION_SET_SELECTED_ANSWER_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_SET_SELECTED_ANSWER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_SET_SELECTED_ANSWER_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const setSectionTypeInformation = (sectionId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_SET_SECTION_TYPE_INFORMATION,
      sectionId
    });

    try {
      await post('/coursecreation/set_section_type_information', { sectionId });

      dispatch({
        type: COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_SET_SECTION_TYPE_INFORMATION_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const setSectionTypeQuiz = (sectionId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_SET_SECTION_TYPE_QUIZ,
    });

    try {
      await post('/coursecreation/set_section_type_quiz', { sectionId });

      dispatch({
        type: COURSE_CREATION_SET_SECTION_TYPE_QUIZ_SUCCESS,
        sectionId
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_SET_SECTION_TYPE_QUIZ_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_SET_SECTION_TYPE_QUIZ_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const setQuestionIndex = (sectionId, questionIndex) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_SET_QUESTION_INDEX,
      sectionId,
      questionIndex
    });

    try {
      await post('/coursecreation/set_question_index', { sectionId, questionIndex });

      dispatch({
        type: COURSE_CREATION_SET_QUESTION_INDEX_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_SET_QUESTION_INDEX_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_SET_QUESTION_INDEX_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const deleteSection = (sectionId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_DELETE_SECTION,
      sectionId
    });

    try {
      await post('/coursecreation/delete_section', { sectionId });

      dispatch({
        type: COURSE_CREATION_DELETE_SECTION_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_DELETE_SECTION_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_DELETE_SECTION_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const deleteQuestion = (sectionId, questionId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_DELETE_QUESTION,
      sectionId,
      questionId
    });

    try {
      await post('/coursecreation/delete_question', { sectionId, questionId });

      dispatch({
        type: COURSE_CREATION_DELETE_QUESTION_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_DELETE_QUESTION_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_DELETE_QUESTION_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}

export const deleteAnswer = (sectionId, questionId, answerId) => {
  return async dispatch => {
    dispatch({
      type: COURSE_CREATION_DELETE_ANSWER,
      sectionId,
      questionId,
      answerId
    });

    try {
      await post('/coursecreation/delete_answer', { sectionId, questionId, answerId });

      dispatch({
        type: COURSE_CREATION_DELETE_ANSWER_SUCCESS,
      });

    } catch(error) {
      if ( error.response ) {
        dispatch({
          type: COURSE_CREATION_DELETE_ANSWER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: COURSE_CREATION_DELETE_ANSWER_ERROR,
          error: `Unexpexted error happened: ${error}`
        });
      }
    }
  }
}