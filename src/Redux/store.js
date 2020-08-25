import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(
    thunk
  ), composeWithDevTools()),
);

export default store;