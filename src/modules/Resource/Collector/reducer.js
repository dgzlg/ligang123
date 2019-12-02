import {TOGGLE_SUBMIT_LOADING, UPDATE_FORM_VALUE, UPDATE_LIST} from "./action";

const defaultState = {
  modal: '',
  submitLoading: false,
  list: [],
  description: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return {...state, list: action.list};
    case UPDATE_FORM_VALUE:
      return {...state, ...action.payload};
    case TOGGLE_SUBMIT_LOADING:
      return {...state, submitLoading: action.loading};
    default:
      return state;
  }
};
