/* action type */
import {
  CANCEL_DEMAND_EDIT, FINISH_DEMAND_EDIT,
  prefix, START_DEMAND_EDIT, UPDATE_FORM_VALUE,
} from './action';
import createReducer from '../../common/utils/createReducer';
import {createState as createListState, listReducer} from '../../common/List/list';
import {createState as createValueTestState, valueTestReducer} from '../../common/formValueTest';

/* 初始状态 */
const defaultState = Object.assign(createListState(), createValueTestState(), {
  demandModalVisible: false,
  demandEditModal: 0,
  demandId: '',
  demandTitle: '',
  demandDescription: '',
  demandPublishLoading: false,
});

const customReducer = (state, action) => {
  switch (action.type) {
    case START_DEMAND_EDIT:
      return {...state, ...action.payload};
    case UPDATE_FORM_VALUE:
      return {...state, ...action.payload};
    case CANCEL_DEMAND_EDIT:
      return {...state, demandModalVisible: false};
    case FINISH_DEMAND_EDIT:
      return {...state, demandModalVisible: false, demandTitle: '', demandDescription: ''};
    default:
      return state;
  }
};

export default createReducer(
  prefix,
  defaultState,
  listReducer,
  valueTestReducer,
  customReducer,
);
