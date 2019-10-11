import { GETURI_FAIL, GETURI_SUCCESS } from "../actions/types";

const initialState = {
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETURI_SUCCESS:
      return {
        ...state,
        message: action.payload.url
      };
    case GETURI_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};
