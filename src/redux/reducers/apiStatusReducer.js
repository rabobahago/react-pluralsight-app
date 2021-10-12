import * as types from "../actions/actionTypes";
import initialState from "./initialState";
const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) === "success";
};
const apiCallStatusReducer = (
  state = initialState.apiCallInProgress,
  action
) => {
  if (action.types === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
};
export default apiCallStatusReducer;
