import * as types from "../actions/actionTypes";
import initialState from "./initialState";
const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) === "_SUCCESS";
};
const apiCallStatusReducer = (
  state = initialState.apiCallsInProgress,
  action
) => {
  if (action.types === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.types === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
};
export default apiCallStatusReducer;
