import {
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_SUCCESS,
  FETCH_PAGE_DATA_ERROR
} from '../../ActionTypes/Pages';

import { get } from '../../../Components/CoursesDashboard/request';

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
      dispatch({
        type: FETCH_PAGE_DATA_ERROR,
        error: `An error occured while fetching data: ${error}`
      })
    }
  }
}