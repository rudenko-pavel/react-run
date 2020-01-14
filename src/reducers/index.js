import { combineReducers } from 'redux';
import joggingReducer from './joggingReducer';

export default combineReducers({
    joggings: joggingReducer
});