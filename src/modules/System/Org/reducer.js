/*action type*/
import {
    ORG_LIST, LIST_LOADING, LIST_LOADED, ADD_BOX_VISIBLE, EDIT_BOX_VISIBLE, CANCEL_SAVE,
    SAVE_LOADING, SAVE_LOADED,
} from './action';

const defaultState = {
    orgList: [],
    listLoading: false,

    currentRecord: {},
    isAdd: false,
    modalVisible: false,
    saveLoading: false,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LIST_LOADING:
            return {
                ...state,
                listLoading: true,
            };
        case LIST_LOADED:
            return {
                ...state,
                listLoading: false,
            };
        case ORG_LIST:
            return {
                ...state,
                orgList: action.orgList,
            };
        case ADD_BOX_VISIBLE:
            return {
                ...state,
                modalVisible: action.modalVisible,
                isAdd: action.isAdd,
            };
        case EDIT_BOX_VISIBLE:
            return {
                ...state,
                modalVisible: action.modalVisible,
                currentRecord: action.currentRecord,
                isAdd: action.isAdd,
            };
        case CANCEL_SAVE:
            return {
                ...state,
                modalVisible: action.modalVisible,
                saveLoading: action.saveLoading,
                currentRecord: action.currentRecord,
                isAdd: action.isAdd,
            };
        case SAVE_LOADING:
            return {
                ...state,
                saveLoading: true,
            };
        case SAVE_LOADED:
            return {
                ...state,
                saveLoading: false,
            };
        default :
            return state;
    }
};
