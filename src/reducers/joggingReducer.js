export default (state=[], action) => { // возможные варианты `action.type` берутся из `src/actions/index.js`
    switch (action.type){ // see to `src/actions/index.js`
        case 'FETCH_JOGGING':
            return action.payload;
        
        default: 
            return state;
    }
}