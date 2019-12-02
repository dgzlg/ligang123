import { message } from 'antd';
import { makeSearchCondition } from '../Search/tools';


/////////////////////////////////////////////////////////////////////////////////////////////////
//************************************** reducer **********************************************//
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 创建通用的列表state
 * @param [list]{object} 自定义的列表state
 * @returns {{list: {records: Array, total: number, pageSize: number, pageNumber: number, keyword: string, order: string, filters: {}, listLoading: boolean}}}
 */
export const createState = (list) => {
    return {
        list: {
            records: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            order: '',
            condition: [],
            listLoading: false,
            ...list
        }
    };
};

/**
 * 通用的列表reducer
 * @param state
 * @param action
 * @param keyOfStore
 * @returns {*}
 */
export const listReducer = (state, action, keyOfStore) => {
    switch (action.type) {
        case `@@${keyOfStore}/listLoadStart`:
            return { ...state, list: { ...state.list, listLoading: true } };
        case `@@${keyOfStore}/listLoadEnd`:
            return { ...state, list: { ...state.list, listLoading: false } };
        case `@@${keyOfStore}/updateList`:
            return {
                ...state,
                list: {
                    ...state.list,
                    listLoading: false,
                    records: action.records,
                    total: action.total,
                    pageNumber: action.pageNumber,
                    order: action.order,
                    condition: action.condition
                }
            };
        default:
            return state;
    }
};


/////////////////////////////////////////////////////////////////////////////////////////////////
//************************************** action ***********************************************//
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 列表获取公共方法
 * @param url{string} 列表获取地址
 * @param params{object} 列表请求参数
 * @param keyOfStore{string} 状态仓库名
 * @param [paginationAble]{bool} 默认启用分页
 * @param [preConditionBuilder]{function} 前置条件生成器（返回条件数组，条件最小单元为{ key: string, value: string|object, type: 'keyword'|'range' }）
 * @returns {function(*, *, *)}
 */
export const getList = ({
    url, params = {}, keyOfStore, paginationAble = true, preConditionBuilder
}) => {
    return (request, dispatch, getState) => {
        let { pageNumber: defaultPageNumber, pageSize: defaultPageSize, order: defaultOrder, condition: defaultCondition } = getState()[keyOfStore].list;

        const queryParams = {};

        /* 搜索条件 */
        let condition = [];
        if (typeof preConditionBuilder === 'function') {
            condition = preConditionBuilder(getState);
        }
        condition = condition.concat(params.condition === undefined ? defaultCondition : params.condition);
        queryParams.condition = makeSearchCondition(condition);

        /* 排序 */
        queryParams.order = params.order || defaultOrder;

        /* 分页 */
        if (paginationAble) {
            queryParams.pageNumber = params.pageNumber || defaultPageNumber;
            queryParams.pageSize = params.pageSize || defaultPageSize;
        }

        /* 更新loading */
        dispatch({ type: `@@${keyOfStore}/listLoadStart` });

        /* 请求列表数据 */
        request({
            method: 'get',
            url,
            params: queryParams
        })
        .then((json) => {
            /* 更新列表数据 */
            dispatch({
                type: `@@${keyOfStore}/updateList`,
                records: json.rows,
                total: json.total,
                pageNumber: json.pageNumber,
                order: queryParams.order,
                condition: params.condition === undefined ? defaultCondition : params.condition
            });
        })
        .catch((err) => {
            /* 错误提示 */
            message.error(err.message);

            /* 更新loading */
            dispatch({ type: `@@${keyOfStore}/listLoadEnd` });
        });
    };
};

/**
 * 删除单条列表记录
 * @param url 删除请求url
 * @param keyOfStore 状态仓库名
 * @param successAction{function} 删除成功后发起的action
 * @returns {function(*, *)}
 */
export const deleteListRecord = ({ url, keyOfStore, successAction }) => {
    return (request, dispatch) => {
        /* 更改列表loading状态 */
        dispatch({ type: `@@${keyOfStore}/listLoadStart` });

        /* 发起角色删除请求 */
        request({
            method: 'delete',
            url,
        })
        .then((data) => {
            if(data && data.ok){
                /* 删除成功，重新获取列表 */
                message.success('删除成功！');
                dispatch(successAction());
            } else {
                message.error(data.msg);
                dispatch({ type: `@@${keyOfStore}/listLoadEnd` });
            }

        })
        .catch((err) => {
            /* 错误提示 */
            message.error(err.message);

            /* 更新loading */
            dispatch({ type: `@@${keyOfStore}/listLoadEnd` });
        });
    };
};
