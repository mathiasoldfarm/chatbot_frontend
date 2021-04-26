import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  REQUESTING_NEW_PASSWORD,
  REQUESTING_NEW_PASSWORD_ERROR,
  REQUESTING_NEW_PASSWORD_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS
} from '../../ActionTypes/Users';

import { post } from '../../../Components/CoursesDashboard/request';

export const createUser = (email, password, password2) => {
  return async dispatch => {
    dispatch({
      type: CREATE_USER
    });

    try {
      const payload = await post('/users/create', { email, password, password2 });

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
      console.log(error.response);
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

export const requestNewPasswordLink = (email) => {
  return async dispatch => {
    dispatch({
      type: REQUESTING_NEW_PASSWORD
    });

    try {
      const payload = await post('/users/send-password-reset-link', { email });

      dispatch({
        type: REQUESTING_NEW_PASSWORD_SUCCESS,
        payload
      })

    } catch(error) {
      if (error.response) {
        dispatch({
          type: REQUESTING_NEW_PASSWORD_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: REQUESTING_NEW_PASSWORD_ERROR,
          error: error.toString()
        })
      }
    }
  }
}

export const resetPassword = (userId, password, password2, verificationCode) => {
  return async dispatch => {
    dispatch({
      type: RESET_PASSWORD
    });

    try {
      const payload = await post('/users/reset-password', { userId, password, password2, verificationCode });

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload
      });

    } catch(error) {
      console.log(error.response);
      if (error.response) {
        dispatch({
          type: RESET_PASSWORD_ERROR,
          error: error.response.data
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_ERROR,
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