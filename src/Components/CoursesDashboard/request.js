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
  return (await axios.get(`${backend_base}${url}`)).data;
}