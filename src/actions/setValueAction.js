import { SET_VALUE } from "./types";

export default function setValue(name, value) {
  return {
    type: SET_VALUE,
    payload: {
      name,
      value
    }
  };
}
