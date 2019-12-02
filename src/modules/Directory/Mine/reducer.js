import {
  CANCEL_DIRECTORY_EDIT,
  FINISH_DIRECTORY_EDIT,
  START_DIRECTORY_EDIT,
  TOGGLE_DIRECTORY_LOADING, TOGGLE_EDIT_ABLE, TOGGLE_EDIT_SAVING_STATE, TOGGLE_PUBLIC_DIRECTORY_LOADING,
  UPDATE_DIRECTORY_LIST, UPDATE_EDITING_VALUE,
  UPDATE_PATH_ARRAY, UPDATE_PUBLIC_DIRECTORY,
} from "./action";

const defaultState = {
  editable: true,
  directoryLoading: false,
  pathArray: [],
  directoryList: [],
  publicDirectoryLoading: false,
  publicDirectory: [],
  editModal: 0,
  editingTarget: null,
  editModalVisible: false,
  editingName: '',
  editSaving: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_DIRECTORY_LOADING:
      return {...state, directoryLoading: action.loading};
    case UPDATE_DIRECTORY_LIST:
      return {...state, directoryList: action.list, directoryLoading: false};
    case UPDATE_PATH_ARRAY:
      return {...state, pathArray: action.pathArray};
    case START_DIRECTORY_EDIT:
      return {...state, ...action.payload};
    case UPDATE_EDITING_VALUE:
      return {...state, ...action.payload};
    case CANCEL_DIRECTORY_EDIT:
      return {...state, editModalVisible: false, editSaving: false};
    case FINISH_DIRECTORY_EDIT:
      return {...state, editModalVisible: false, editSaving: false};
    case TOGGLE_EDIT_SAVING_STATE:
      return {...state, editSaving: action.state};
    case TOGGLE_EDIT_ABLE:
      return {...state, editable: action.editable};
    case TOGGLE_PUBLIC_DIRECTORY_LOADING:
      return {...state, publicDirectoryLoading: action.loading};
    case UPDATE_PUBLIC_DIRECTORY:
      return {...state, publicDirectory: action.tree, publicDirectoryLoading: false};
    default:
      return state;
  }
};
