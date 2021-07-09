export default function (state, action) {
  switch (action.type) {
    case "ADD_LOCATION":
      return { ...state, location: action.payload.location };
    
      case "ADD_POST":
      return { ...state, postList: [...state.postList, action.payload.post] };

    default:
      return state;
  }
}