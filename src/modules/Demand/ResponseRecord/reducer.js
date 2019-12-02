/*action type*/
import {
    LIST_LOADING, LIST_LOADED, RES_LIST
} from './action';

const defaultState = {
    total: 0,
    pageNumber: 1,
    pageSize: 10,
    resList: [],
    listLoading: false,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LIST_LOADING:
            return {...state, listLoading: true};
        case LIST_LOADED:
            return {...state, listLoading: false};
        case RES_LIST:
            return {
                ...state,
                listLoading: false,
                resList: action.resList,
                total: action.total,
                pageNumber: action.pageNumber,
                pageSize: action.pageSize,
            };
        default :
            return state;
    }
};
