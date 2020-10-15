import { combineReducers } from "redux";
import applicationReducer from "./reducers/applicationReducer";
import colorSortReducer from './reducers/colorSortReducer'
import audioReducer from './reducers/audioReducer'
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
  application: applicationReducer,
  colorSort: colorSortReducer,
  audio: audioReducer,
});

const initialState = {};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)

const configureStore = () => {
  const store = createStore(reducer, initialState, middleware);

  return store;
};

export default configureStore;
