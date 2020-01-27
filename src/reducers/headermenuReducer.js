export default (state=[], action) => {
    switch (action.type){ // see to `src/actions/index.js`
        case 'FETCH_HEADERMENU':
            return action.payload;
        
        default: 
            return state;
    }
}