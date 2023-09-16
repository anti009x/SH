import {createStore} from 'redux';

const initialState = {
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  return state;
};

const store = createStore(rootReducer);

export default store;
