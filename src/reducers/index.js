import { combineReducers } from 'redux';
import joggingsReducer from './joggingsReducer';

export default combineReducers({
    joggings: joggingsReducer
});