import { combineReducers } from 'redux';
import joggingsReducer from './joggingsReducer';
import citiesReducer from './citiesReducer';

export default combineReducers({
    joggings: joggingsReducer,
    cities: citiesReducer
});