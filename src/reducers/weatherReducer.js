export default function weatherReducer(state, action) {
  switch (action.type) {
    case 'GET_CURRENT_LOCATION':
      return {
        ...state,
        data: action.payload
      };
    case 'SET_CITY_QUERY':
      return {
        ...state,
        currentCity: action.payload
      }
    default:
      return state;
  }
}
