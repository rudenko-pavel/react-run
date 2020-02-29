import myJson from "../apis/json";
import { FETCH_JOGGINGS } from "./types";

export default async function fetchJoggings() {
  console.log("responce2: ");
  const responce = await myJson.get("/joggings.json");
  console.log("responce 3: ", responce.data.joggings);
  return async dispatch => {
    console.log("responce: ",  responce.data.joggings);
    dispatch({ type: FETCH_JOGGINGS, payload: responce.data.joggings });
  };
}
