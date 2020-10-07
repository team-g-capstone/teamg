import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/combineReducers";
// import middleware from "./middleware";

const initialState = {};

const configureStore = () => {
  const store = createStore(rootReducer, initialState);

  return store;
};

export default configureStore;
