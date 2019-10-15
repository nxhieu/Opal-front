/*
    Reducer for image feature (interaction with s3 bucket): dispatch to redux store
*/

import { GETURI_FAIL } from "../actions/types";

const initialState = {
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETURI_FAIL:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};
