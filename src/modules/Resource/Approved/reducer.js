/* action type */
import {prefix} from './action';
import createReducer from '../../../modules/common/utils/createReducer';
import { createState as createListState, listReducer } from '../../../modules/common/List/list';

/* 初始状态 */
const defaultState = Object.assign(createListState(),{});

export default createReducer(
  prefix,
  defaultState,
  listReducer,
);
