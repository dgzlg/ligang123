/* action type */
import {
    prefix,
    MULTIPLE_UPDATE,
    ADD_ROLE, ADD_ROLE_CANCEL, ROLE_SAVING, ROLE_SAVED,
    POWER_ROLE, POWER_ROLE_CANCEL
} from './action';
import createReducer from '../../common/utils/createReducer';
import { createState as createListState, listReducer } from '../../common/List/list';
import { createState as createValueTestState, valueTestReducer } from '../../common/formValueTest';

/* 初始状态 */
const defaultState = Object.assign(createListState(), createValueTestState(), {
    /* 当前操作角色 */
    operatingRole: null,
    /* 添加角色 */
    roleAdding: false,
    roleSaving: false,
    /* 角色赋权 */
    powerIng: false,
    menusLoading: false,
    menusAll: [],
    menusTree: [],
    menusPower: [],
    powerSaving: false
});

const customReducer = (state, action) => {
    switch (action.type) {
        case MULTIPLE_UPDATE:
            return { ...state, ...action };
        case ADD_ROLE:
            return {
                ...state,
                roleAdding: true,
                cachedValues: action.cachedValues,
                valueTestStatus: action.valueTestStatus
            };
        case ADD_ROLE_CANCEL:
            return {
                ...state,
                roleAdding: false
            };
        case ROLE_SAVING:
            return {
                ...state,
                roleSaving: action.loading
            };
        case ROLE_SAVED:
            return {
                ...state,
                roleSaving: false,
                roleAdding: false
            };
        case POWER_ROLE:
            return {
                ...state,
                powerIng: action.powerIng,
                operatingRole: action.operatingRole
            };
        case POWER_ROLE_CANCEL:
            return {
                ...state,
                powerIng: false,
                operatingRole: null
            };
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
