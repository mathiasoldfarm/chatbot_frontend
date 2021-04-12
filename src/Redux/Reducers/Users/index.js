import { 
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOGGED_IN,
  SET_LOGGED_OUT
} from '../../ActionTypes/Users';

const INITIAL_STATE = {
  user: {},
  creatingUser: false,
  creatingUserError: false,
  creatingUserSucces: false,
  loggingin: false,
  loginError: false,
  loginSuccess: false,
  loggedIn: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: {},
        creatingUser: true,
        creatingUserError: false,
        creatingUserSucces: false
      }
    case CREATE_USER_ERROR:
      return {
        ...state,
        creatingUser: false,
        creatingUserError: action.error
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        creatingUser: false,
        creatingUserSucces: action.payload
      }
    case LOGIN:
      return {
        ...state,
        user: {},
        loggingin: true,
        loginError: false,
        loginSuccess: false,
        loggedIn: false
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loggingin: false,
        loginError: action.error
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingin: false,
        loginSuccess: action.payload,
        loggedIn: true
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        loggedIn: false
      }
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      }
    case SET_LOGGED_OUT:
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state;
  }
}

export default reducer;

