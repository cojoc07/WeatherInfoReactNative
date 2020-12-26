import { SET_DATA } from "../actions/forecast";

const initialState = {
  forecast: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return {
        forecast: action.data,
      };
    }
  }

  return state;
};
