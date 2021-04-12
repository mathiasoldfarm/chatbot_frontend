import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_LOGGED_IN,
  SET_LOGGED_OUT
} from '../../ActionTypes/Users';

import { post } from '../../../Components/CoursesDashboard/request';

export const createUser = (email, password) => {
  return async dispatch => {
    dispatch({
      type: CREATE_USER
    });

    try {
      const payload = await post('/users/create', { email, password });

      dispatch({
        type: CREATE_USER_SUCCESS,
        payload
      })

    } catch(error) {
      if (error.response) {
        dispatch({
          type: CREATE_USER_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: CREATE_USER_ERROR,
          error: error.toString()
        })
      }
    }
  }
}

export const login = (email, password) => {
  return async dispatch => {
    dispatch({
      type: LOGIN
    });

    try {
      const payload = await post('/users/login', { email, password });
      const { message, token } = payload;
      localStorage.setItem('JWTtoken', token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: message
      })

      window.location.reload();

    } catch(error) {
      if (error.response) {
        dispatch({
          type: LOGIN_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          error: error.toString()
        })
      }
    }
  }
}

export const logout = () => {
  localStorage.removeItem("JWTtoken");
  window.location.reload();
  return {
    type: LOGOUT
  }
}

export const checkIfLoggedIn = () => {
  if (localStorage.getItem("JWTtoken") === null) {
    return {
      type: SET_LOGGED_OUT
    }
  }
  return {
    type: SET_LOGGED_IN
  }
}