/* eslint-disable no-case-declarations */
import { SET_VALUE } from "../actions/types";

export const initialState = {
  theme: "green"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE:
      const { name, value } = action.payload;
      const newItemState = { ...state };
      newItemState[name] = value;
      return { ...state, newItemState };
    default:
      return state;
  }
};
