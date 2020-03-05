import {
  FETCH_CITY,
  FETCH_HEADERMENU,
  FETCH_JOGGINGS,
  SET_VALUE
} from "../actions/types";

export const initialState = {
  theme: "green"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY:
      return action.payload;
    case FETCH_HEADERMENU:
      return action.payload;
    case FETCH_JOGGINGS:
      console.log("FETCH_JOGGINGS");
      const newState = { ...state };
      newState.sss = action.payload;
      return newState;
    case SET_VALUE:
      const { name, value } = action.payload;
      const newItemState = { ...state };
      newItemState[name] = value;
      return newItemState;
    default:
      return state;
  }
};
