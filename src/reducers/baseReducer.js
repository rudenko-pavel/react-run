import { FETCH_CITY, FETCH_HEADERMENU, FETCH_JOGGINGS } from "../actions/types";

export const initialState = {
  theme: "green",
  headermenu: [
    { id: 1, name: "about", link: "/" },
    { id: 2, name: "joggings", link: "/joggings" },
    { id: 3, name: "strava", link: "/strava" }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY:
      return action.payload;
    case FETCH_HEADERMENU:
      return action.payload;
    case FETCH_JOGGINGS:
      console.log("FETCH_JOGGINGS")
      const newState = { ...state };
      newState.sss = action.payload;
      return newState;
    default:
      return state;
  }
};
