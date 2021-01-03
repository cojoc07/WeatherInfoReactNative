import { SET_LOCATION } from "../actions/location";

const initialState = {
  location: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION: {
      return {
        location: action.data,
      };
    }
  }

  return state;
};
