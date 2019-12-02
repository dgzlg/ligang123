/*action type*/
import {
    LIST_LOADING, LIST_LOADED, REQ_LIST
} from './action';

const defaultState = {
    total: 0,
    pageNumber: 1,
    pageSize: 10,
    reqList: [],
    listLoading: false,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LIST_LOADING:
            return {...state, listLoading: true};
        case LIST_LOADED:
            return {...state, listLoading: false};
        case REQ_LIST:
            return {
                ...state,
                listLoading: false,
                reqList: action.reqList,
                total: action.total,
                pageNumber: action.pageNumber,
                pageSize: action.pageSize,
            };
        default :
            return state;
    }
};
