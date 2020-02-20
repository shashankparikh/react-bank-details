const initialState = {
  FirstData: [],
  isLoading: true
};

const isSelectedData = data => {
  return data.map(obj => {
    return {
      ...obj,
      isSelected: false
    };
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        ...state,
        FirstData: isSelectedData(action.value),
        isLoading: false
      };

    case "SAVED_STAR": {
      const newArr = JSON.parse(JSON.stringify(state.FirstData));
      newArr[action.value].isSelected = true;

      return {
        ...state,
        FirstData: newArr,
        isLoading: false
      };
    }

    case "REMOVED_STAR": {
      const newRemoveArr = JSON.parse(JSON.stringify(state.FirstData));
      newRemoveArr[action.value].isSelected = false;
      return {
        ...state,
        FirstData: newRemoveArr,
        isLoading: false
      };
    }
    default:
      return state;
  }
}
