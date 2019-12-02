/*action type*/
import {
    LIST_LOADING, LIST_LOADED, PUB_LIST,
} from './action';

const defaultState = {
    total: 0,
    pageNumber: 1,
    pageSize: 10,
    pubList: [],
    listLoading: false,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LIST_LOADING:
            return {...state, listLoading: true};
        case LIST_LOADED:
            return {...state, listLoading: false};
        case PUB_LIST:
            return {
                ...state,
                listLoading: false,
                pubList: action.pubList,
                total: action.total,
                pageNumber: action.pageNumber,
                pageSize: action.pageSize,
            };
        default :
            return state;
    }
};
