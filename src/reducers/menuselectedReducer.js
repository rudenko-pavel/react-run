export default (selectedItem = 1, action) => {
  switch (action.type) {
    // see to `src/actions/index.js`
    case "ITEMMENU_SELECTED":
      return action.payload;
    default:
      return selectedItem;
  }
};
