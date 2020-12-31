import {
  ANSWER_FETCHING,
  ANSWER_FETCHING_ERROR,
  ANSWER_FETCHING_SUCCESS,
  ADD_USER_ANSWER,
  RESET_MESSAGE_LIST
} from '../../ActionTypes/Chatbot';
import { postCourseData } from '../../../Components/CoursesDashboard/request';

const generateMessageObject = (data, type) => {
  return {
    answer: data.answer,
    nextPossibleAnswers: data.nextPossibleAnswers,
    displayData: data.displayData,
    type,
    sessionGroup: data.session_group
  }
}

export const resetMessageList = () => {
  return {
    type: RESET_MESSAGE_LIST
  }
}

export const getAnswer = (question, course_id, user_id, sessionGroup, context_id=null, type=null) => {
  return async dispatch => {
    dispatch({
      type: ANSWER_FETCHING
    });

    try {
      let query = '/sessions/getanswer';
      if ( type ) {
        query += `/${type}`;
      }
      const beginData = await postCourseData(query, { question, course_id, user_id, context_id, sessionGroup });

      dispatch({
        type: ANSWER_FETCHING_SUCCESS,
        message: generateMessageObject(beginData, "bot")
      })

    } catch(error) {
      dispatch({
        type: ANSWER_FETCHING_ERROR,
        error: `Der skete en fejl ved hentning af beskeden: ${error}`
      })
    }
  }
}

export const addUserAnswer = (answer) => {
  return {
    type: ADD_USER_ANSWER,
    message: generateMessageObject(answer, "user")
  }
}