import axios from 'axios';
import {baseUrl} from '../../../utils';

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataRequest());

    axios
      .get(`${baseUrl.url}/master/artikel`)
      .then(response => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        dispatch(fetchDataFailure());
      });
  };
};

export const fetchDataRequest = () => {
  return {
    type: 'FETCH_DATA_REQUEST',
  };
};

export const fetchDataSuccess = data => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  };
};

export const fetchDataFailure = () => {
  return {
    type: 'FETCH_DATA_FAILURE',
  };
};
