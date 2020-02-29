import myJson from "../apis/json";
import { FETCH_HEADERMENU } from "./types";

export default function fetchHeaderMenu() {
  return async dispatch => {
    const responce = await myJson.get("/headermenu.json");
    dispatch({ type: FETCH_HEADERMENU, payload: responce.data.headermenu });
  };
}
