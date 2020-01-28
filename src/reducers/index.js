import { combineReducers } from "redux";

import citiesReducer from "./citiesReducer";
import headermenuReducer from "./headermenuReducer";
import joggingsReducer from "./joggingsReducer";
import menuselectedReducer from "./menuselectedReducer";

export default combineReducers({
  joggings: joggingsReducer,
  cities: citiesReducer,
  headermenu: headermenuReducer,
  menuselected: menuselectedReducer
});
