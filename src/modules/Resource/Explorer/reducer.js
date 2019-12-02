import {
  INITIALIZE,
  TOGGLE_RESOURCE_LOADING,
  UPDATE_PATH,
  UPDATE_RESOURCE_LIST,
  START_FRE,
  CANCEL_FRE,
  FINISH_FRE,
  UPDATE_FRE_VALUE,
  UPDATE_FRE_STEP,
  START_CREATE_AR,
  START_MODIFY_AR,
  CANCEL_AR_EDIT,
  SAVED_AR,
  UPDATE_ARE_STEP,
  UPDATE_ARE_VALUE,
  PREV_ITEM_AR_EDIT,
  NEXT_ITEM_AR_EDIT,
  TO_ITEM_AR_EDIT,
  SAVING_AR,
  FAILED_SAVE_AR,
  LOADED_ARE,
  FAILED_LOAD_ARE,
  OPEN_ARV,
  LOADED_ARV,
  FAILED_LOAD_ARV,
  CLOSE_ARV,
  EDIT_AR_FROM_VIEWER,
  OPEN_AR_TESTING,
  CLOSE_AR_TESTING, AR_TEST_SUCCEED, AR_TEST_FAILED, AR_TEST_ERROR,
} from "./action";
import {mREReducer, defaultState as defaultMREValue} from './reducers/MapResourceEditor.ts';
import {mRVReducer, defaultState as defaultMRVValue} from './reducers/MapResourceViewer.ts';
const defaultAREValue = {
  aREStep: 0,
  aREItemIndex: 0,
  aRETarget: null,
  aREName: '',
  aREDescription: '',
  aREIName: '',
  aREIMethod: '',
  aREIUrl: '',
  aREIResponseType: '',
  aREIPreInterface: '',
  aREIParams: [],
};

const defaultARTesting = {
  aRTState: 0,
  aRTTarget: null,
  aRTResult: '',
};

const defaultARVValue = {
  aRVState: 0,
  aRVTarget: null,
};

const defaultState = {
  /* 资源浏览器 */
  pathArray: [],
  resourceLoading: false,
  resourceList: [],

  /* 文件资源编辑（fE） */
  fETarget: null,
  fEVisible: false,
  fEFile: null,
  fEName: '',
  fEDescription: '',
  fEStep: 0,
  fEStepProgress: [0, 0],
  fEStepDescription: '未开始',

  /* api资源(AR)编辑 */
  ...defaultAREValue,

  /* api测试 */
  ...defaultARTesting,

  /* api资源查看 */
  ...defaultARVValue,

  /* map类资源编辑 */
  ...defaultMREValue,

  /* map资源查看 */
  ...defaultMRVValue,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return defaultState;
    case UPDATE_PATH:
      return {...state, pathArray: action.pathArray};
    case TOGGLE_RESOURCE_LOADING:
      return {...state, resourceLoading: action.loading};
    case UPDATE_RESOURCE_LIST:
      return {...state, resourceLoading: false, resourceList: action.list};
    /* 文件类资源编辑 */
    case START_FRE:
      return {...state, ...action.payload};
    case CANCEL_FRE:
      return {
        ...state,
        fEVisible: false,
        fETarget: null,
        fEFile: null,
        fEStep: 0,
        fEStepProgress: [0, 0],
        fEStepDescription: '未开始',
      };
    case FINISH_FRE:
      return {
        ...state,
        fETarget: null,
        fEVisible: false,
        fEFile: null,
        fEName: '',
        fEDes: '',
        fEStep: 0,
        fEStepProgress: [0, 0],
        fEStepDescription: '未开始',
      };
    case UPDATE_FRE_STEP:
      return {
        ...state,
        fEStep: action.stepIndex,
        fEStepProgress: action.stepProgress,
        fEStepDescription: action.stepDescription
      };
    case UPDATE_FRE_VALUE:
      return {...state, ...action.payload};

    /* API类资源编辑 */
    case START_CREATE_AR:
      return {
        ...state,
        ...defaultAREValue,
        aREStep: 2,
      };
    case START_MODIFY_AR:
      return {
        ...state,
        aRETarget: action.target,
        aREStep: 1,
      };
    case LOADED_ARE:
      return {
        ...state,
        aREStep: 2,
        aRETarget: {...state.aRETarget, interface: {...action.interface}},
        aREName: action.name,
        aREDescription: action.description,
        aREIName: action.interface.name,
        aREIMethod: action.interface.method,
        aREIUrl: action.interface.url,
        aREIResponseType: action.interface.responseType,
        aREIPreInterface: action.interface.preInterface,
        aREIParams: action.interface.params || [],
      };
    case FAILED_LOAD_ARE:
      return {
        ...state,
        aREStep: -1,
      };
    case CANCEL_AR_EDIT:
      return {
        ...state,
        ...defaultAREValue,
      };
    case SAVING_AR:
      return {
        ...state,
        aREStep: 3,
      };
    case FAILED_SAVE_AR:
      return {
        ...state,
        aREStep: 2,
      };
    case SAVED_AR:
      return {
        ...state,
        ...defaultAREValue,
      };
    case PREV_ITEM_AR_EDIT:
      return {
        ...state,
        aREItemIndex: Math.max(state.aREItemIndex - 1, 0),
      };
    case NEXT_ITEM_AR_EDIT:
      return {
        ...state,
        aREItemIndex: Math.min(state.aREItemIndex + 1, 2),
      };
    case TO_ITEM_AR_EDIT:
      return {
        ...state,
        aREItemIndex: action.index,
      };
    case UPDATE_ARE_STEP:
      return {
        ...state,
        aREStep: action.step,
      };
    case UPDATE_ARE_VALUE:
      return {
        ...state,
        ...action.payload,
      };
      /* api资源测试 */
    case OPEN_AR_TESTING:
      return {
        ...state,
        aRTState: 1,
        aRTTarget: action.target,
      };
    case CLOSE_AR_TESTING:
      return {
        ...state,
        aRTState: 0,
        aRTTarget: null,
      };
    case AR_TEST_SUCCEED:
      return {
        ...state,
        aRTState: 2,
        aRTResult: action.result,
      };
    case AR_TEST_FAILED:
      return {
        ...state,
        aRTState: 3,
        aRTResult: action.result,
      };
    case AR_TEST_ERROR:
      return {
        ...state,
        aRTState: -1,
      };
    /* api资源查看 */
    case OPEN_ARV:
      return {
        ...state,
        aRVState: 1,
      };
    case LOADED_ARV:
      return {
        ...state,
        aRVState: 2,
        aRVTarget: action.target,
      };
    case FAILED_LOAD_ARV:
      return {
        ...state,
        aRVState: -1,
      };
    case CLOSE_ARV:
      return {
        ...state,
        aRVState: 0,
        aRVTarget: null,
      };
    case EDIT_AR_FROM_VIEWER:
      return {
        ...state,
        aRVState: 0,
        aRVTarget: null,
        aREStep: 2,
        aRETarget: {...state.aRETarget, interface: {...action.interface}},
        aREName: action.name,
        aREDescription: action.description,
        aREIName: action.interface.name,
        aREIMethod: action.interface.method,
        aREIUrl: action.interface.url,
        aREIResponseType: action.interface.responseType,
        aREIPreInterface: action.interface.preInterface,
        aREIParams: action.interface.params || [],
      };
    default:
      state = mREReducer(state, action);
      state = mRVReducer(state, action);
      return state;
  }
};
