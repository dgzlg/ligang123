/* action type */
import {
    prefix,
    LIST_LOADING,
    LIST_LOADED,
    UPDATE_LIST,
    SELECT_NAME,
    SHOW_MODAL,
    CLOSE_MODAL,
    SAVING_MODAL,
    SAVED_MODAL,
    INIT_TRANSFER,
    CHANGE_TRANSFER,
    SAVE_BASICINFO,
    CHANGE_STEP
} from './action';
import createReducer from '../../../modules/common/utils/createReducer';
import { createState as createListState, listReducer } from '../../../modules/common/List/list';
import { createState as createValueTestState, valueTestReducer } from '../../common/formValueTest';

/* 初始状态 */
const defaultState = Object.assign(createListState(),createValueTestState(),{
    /* list状态 */
    orgRecords: [],
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    orgListLoading: false,
    listLoading: false,

    /* Modal状态 */
    state: '',
    formTitle:'',
    visible: false,
    saving: false,
    saveDisabled:false,
    organizationSelected: '',
    /* 编辑步骤 */
    orgNames: '',
    orgIds:'',
    currentStep: 0,
    /* Modal中的表单状态 */
    fields:{},
    basicInfo:{},
    existed:'success',
    help: undefined,
    /* Modal中的穿梭框状态 */
    roleList:[],
    selectedRoles:[]
});

const customReducer = (state, action) => {
    switch (action.type) {
        case LIST_LOADING:
            return {...state, orgListLoading: true};
        case LIST_LOADED:
            return {...state, orgListLoading: false};
        case UPDATE_LIST:
            return {
                ...state,
                orgListLoading: false,
                ...action
            };
        case SELECT_NAME:
            return {
                ...state,
                orgIds: action.orgIds,
                orgNames: action.orgNames
            };
        case 'updateOrgList':
            return {
                ...state,
                orgListLoading: false,
                orgRecords: action.orgRecords,
                order: action.order
            };
        case SHOW_MODAL:
            return {
                ...state,
                visible: true,
                state: action.state,
                formTitle: action.formTitle,
                activeKey: action.activeKey,
                fields: action.fields,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                visible: false,
                fields:{},
                selectedRoles:[]
            };
        case SAVING_MODAL:
            return {
                ...state,
                saving: true,
            };
        case SAVED_MODAL:
            return {
                ...state,
                saving: false,
            };
        case INIT_TRANSFER:
            return {
                ...state,
                roleList:action.roleList
            };
        case CHANGE_TRANSFER:
            return {
                ...state,
                selectedRoles:action.selectedRoles
            };
        case SAVE_BASICINFO:
            return {
                ...state,
                basicInfo:action.basicInfo
            };
        case CHANGE_STEP:
            return {
                ...state,
                currentStep: action.step
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
