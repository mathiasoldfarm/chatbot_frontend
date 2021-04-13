import {
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_SUCCESS,
  FETCH_PAGE_DATA_ERROR,
  UPDATE_FIELD_DATA,
  UPDATE_FIELD_DATA_ERROR,
  UPDATE_FIELD_DATA_SUCCESS
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
      const payload = await get(url);

      dispatch({
        type: FETCH_PAGE_DATA_SUCCESS,
        payload
      })

    } catch(error) {
      if ( error.response && error.response.status === 401 ) {
        dispatch({
          type: FETCH_PAGE_DATA_ERROR,
          error: `You don't have access to this. Try to login`
        })
      } else if (error.response && error.response.status === 404 ) {
        dispatch({
          type: FETCH_PAGE_DATA_SUCCESS,
          payload: {}
        })
      } else {
        dispatch({
          type: FETCH_PAGE_DATA_ERROR,
          error: `An error occured while fetching data: ${error}`
        })
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