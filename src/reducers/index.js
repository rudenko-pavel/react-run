import { combineReducers } from 'redux';

// возможные варианты `action.type` берутся из `src/actions/index.js`
const selectedJoggingReducer = (selectedJogging=null, action) => {
    if( action.type ==='JOGGING_SELECTED'){
        return action.payload;
    }
    
    return selectedJogging;
};

export default combineReducers({
    selectedJogging: selectedJoggingReducer
});