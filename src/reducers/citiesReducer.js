export default (state = [], action) => {
  switch (action.type) {
    // see to `src/actions/index.js`
    case "FETCH_CITY":
      return [...state, action.payload];
    default:
      return state;
  }
};
