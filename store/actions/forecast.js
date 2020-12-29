import * as keys from "../../constants/keys";

export const SET_DATA = "SET_DATA";

export const fetchForecast = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://api.darksky.net/forecast/${keys.FORECASTKEY}/44.20,27.32?exclude=hourly&lang=ro&units=si`
      );

      if (!response.ok) {
        throw new Error("Error while fetching forecast.");
      }

      const resData = await response.json();
      dispatch({ type: SET_DATA, data: resData });
    } catch (err) {
      throw err;
    }
  };
};
