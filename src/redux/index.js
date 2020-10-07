import { combineReducers } from "redux";
import applicationReducer from "./reducers/applicationReducer";
import { applyMiddleware, compose, createStore } from "redux";

const reducer = combineReducers({
  application: applicationReducer,
});

const initialState = {};

const configureStore = () => {
  const store = createStore(reducer, initialState);

  return store;
};

export default configureStore;
