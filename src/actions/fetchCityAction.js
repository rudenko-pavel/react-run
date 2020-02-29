import _ from "lodash";

import myJson from "../apis/json";

// eslint-disable-next-line no-underscore-dangle
const _fetchCity = _.memoize(async (id, dispatch) => {
  const responce = await myJson.get(`/cities.json`);
  const elem = responce.data.cities.find(el => el.id === id);
  dispatch({ type: "FETCH_CITY", payload: elem });
});

export default function fetchCity(id) {
  return dispatch => {
    _fetchCity(id, dispatch);
  };
}
