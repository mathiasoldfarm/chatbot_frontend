import {
  FETCH_PAGE_DATA,
  FETCH_PAGE_DATA_SUCCESS,
  FETCH_PAGE_DATA_ERROR
} from '../../ActionTypes/Pages';

import { get } from '../../../Components/CoursesDashboard/request';

export const fetchPageData = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PAGE_DATA
    });

    try {
      const payload = await get(`/${window.location.href}`);

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