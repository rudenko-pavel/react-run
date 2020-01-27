import { combineReducers } from 'redux';
import joggingsReducer from './joggingsReducer';
import citiesReducer from './citiesReducer';
import headermenuReducer from './headermenuReducer';

export default combineReducers({
    joggings: joggingsReducer,
    cities: citiesReducer,
    headermenu: headermenuReducer
});