import _ from "lodash";

import myJson from "../apis/json";

// for JoggingsList
export const fetchJoggings = () => async dispatch => {
  const responce = await myJson.get("/joggings.json");
  // console.log("responce: ",responce);
  dispatch({ type: "FETCH_JOGGINGS", payload: responce.data.joggings });
};

// eslint-disable-next-line no-underscore-dangle
const _fetchCity = _.memoize(async (id, dispatch) => {
  const responce = await myJson.get(`/cities.json`);
  // eslint-disable-next-line no-shadow
  const el = responce.data.cities.find(el => el.id === id);
  dispatch({ type: "FETCH_CITY", payload: el });
});

export const fetchCity = id => dispatch => {
  _fetchCity(id, dispatch);
};

// for HeaderMenu
export const fetchHeaderMenu = () => async dispatch => {
  const responce = await myJson.get("/headermenu.json");
  dispatch({ type: "FETCH_HEADERMENU", payload: responce.data.headermenu });
};

export const selectItemMenu = id => {
  return {
    // Return an action
    type: "ITEMMENU_SELECTED",
    payload: id
  };
};
