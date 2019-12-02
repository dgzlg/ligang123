import {
  UPDATE_TASK_INFO,
  UPDATE_REQUEST_INFO,
  UPDATE_HISTORY,
  UPDATE_FORM_VALUE,
  TOGGLE_APPROVE_LOADING
} from "./action";

const defaultState = {
  processId: '',
  taskType: '',
  taskId: '',
  history: [],
  comment: '',
  approveLoading: false,
  directoryTree: [],
  demand: {},
  fileList: [],
  response: {},
  request: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_TASK_INFO:
      return {...state, processId: action.processId, taskType: action.taskType, taskId: action.taskId};
    case UPDATE_REQUEST_INFO:
      return {...state, ...action.payload};
    case UPDATE_HISTORY:
      return {...state, history: action.list};
    case UPDATE_FORM_VALUE:
      return {...state, ...action.payload};
    case TOGGLE_APPROVE_LOADING:
      return {...state, approveLoading: action.loading};
    default:
      return state;
  }
};
