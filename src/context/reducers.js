export default function (state, action) {
  switch (action.type) {
    case "ADD_LOCATION":
      const { location } = action.payload;
      return { ...state, location: location};

    default:
      return state;
  }
}