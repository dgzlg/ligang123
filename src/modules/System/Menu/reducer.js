/*action type*/
import {
    UPDATE_LIST, LIST_LOADING, LIST_LOADED, ADD_MENU,
    CANCEL, MENU_SAVING, MENU_SAVED, EDIT_MENU, LIST_ELEMENT, UPDATE_ELEMENT_LIST,
    ADD_ELEMENT, ELEMENT_SAVING, ELEMENT_SAVED, ADD_ELEMENT_CANCEL, EDIT_ELEMENT,
} from './action';

/*初始状态*/
const defaultState = {
    /* list */
    list: [],
    listLoading: false,
    /* edit model */
    menuSaving: false,
    editerVisible: false,
    record: {},
    editMark: '',

    /* element */
    elementVisible: false,
    elementList: [],
    editElementVisible: false,
    elementSaving: false,
    editRecord:{},
    editEleMark: '',

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LIST_LOADING:
            return {...state, listLoading: true};
        case LIST_LOADED:
            return {...state, listLoading: false};
        case UPDATE_LIST:
            return {
                ...state,
                listLoading: false,
                ...action
            };
        case ADD_MENU:
            return {
                ...state,
                editerVisible: true,
                record: {},
                editMark: 'add'
            };
        case CANCEL:
            return {...state, editerVisible: false, elementVisible: false};
        case MENU_SAVING:
            return {...state, menuSaving: action.loading};
        case MENU_SAVED:
            return {...state, editerVisible: false, menuSaving: false};
        case EDIT_MENU:
            return {...state, editerVisible: true, record: action.record, editMark: 'edit'};
        case LIST_ELEMENT:
            return {...state, elementVisible: true, record: action.record};
        case UPDATE_ELEMENT_LIST:
            return {
                ...state,
                listLoading: false,
                elementList: action.elementList,
                current: action.current
            };
        case ADD_ELEMENT:
            return {
                ...state,
                editElementVisible: true,
                record: action.record,
                editEleMark: 'add'
            };
        case ELEMENT_SAVING:
            return {...state, elementSaving: action.loading};
        case ELEMENT_SAVED:
            return {...state, editElementVisible: false, elementSaving: false};
        case ADD_ELEMENT_CANCEL:
            return {...state, editElementVisible: false, editRecord: {}};
        case EDIT_ELEMENT:
            return {...state, editElementVisible: true, editRecord:action.editRecord,editEleMark: 'edit'};
        default :
            return state;
    }
};
