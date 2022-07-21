export const GoodsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_GOOD": {
      return [...state, action.payload];
    }
    case "UPDATE_GOOD": {
      const { id, key, value } = action;
      const newState = [...state];
      newState.find((good: any) => good.id === id)[key] = value;
      return newState;
    }
    case "SET_SEARCH_SCORES": {
      const { key, id_value_map } = action;
      const newState = [...state];
      newState.forEach((good: any) => {
        good[key] = id_value_map[good.id] || 1;
      });
      newState.sort((a: any, b: any) => a[key] - b[key]);
      return newState;
    }
    case "SET_ALL_GOODS": {
      return action.payload;
    }
    case "SORT": {
      const { sort_function } = action;
      const newState = [...state];
      newState.sort(sort_function);
      return newState;
    }
  }
  return state;
};
