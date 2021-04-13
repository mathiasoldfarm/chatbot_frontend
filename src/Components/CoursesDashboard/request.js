import {
  coursesFetching,
  coursesFetchingError,
  coursesFetchingSuccess
} from '../../Redux/Actions/Courses';
import store from '../../Redux/store';
import axios from 'axios';
import { backend_base } from '../../constants';

const POST = 'POST';
const GET = 'GET';

const courseDataRequestBase = async (type, request_url, body=null) => {
  store.dispatch(coursesFetching());
  const url = `${backend_base}${request_url}`;
  try {
    const response = type === POST ? await axios.post(url, body) :
      type === GET ? await axios.get(url) :
      null;
    store.dispatch(coursesFetchingSuccess());
    return response.data;
  } catch(error) {
    store.dispatch(coursesFetchingError(String(error)));
  }
}

export const getCourseData = async (request_url) => {
  return courseDataRequestBase(GET, request_url);
}

export const postCourseData = async (request_url, body) => {
  return courseDataRequestBase(POST, request_url, body);
}

export const get = async(url) => {
  return (await axios.get(`${backend_base}${url}`, {
    headers: {
      'Authorization': localStorage.getItem("JWTtoken")
    }
  })).data;
}

export const post = async(url, body) => {
  return (await axios.post(`${backend_base}${url}`, body, {
    headers: {
      'Authorization': localStorage.getItem("JWTtoken")
    }
  })).data;
}

export const generateUrl = (base, params) => {
  let url = base;
  let counter = 0;
  const keys = Object.keys(params);
  keys.forEach(key => {
    if ( counter === 0 ) {
      url += "?";
      counter += 1;
    }
    url += key;
    url += "=";
    url += params[key];

    const isLast = key === keys[keys.length - 1];
    if ( !isLast ) {
      url += "&";
    }
  });

  return url;
}