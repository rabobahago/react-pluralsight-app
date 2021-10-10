import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "./reducers";
const configureStore = (initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //This will add support redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
export default configureStore;
