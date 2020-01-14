export const selectJogging = (jogging) =>{
    return{ //Return an action
        type: 'JOGGING_SELECTED',
        payload: jogging
    };
};