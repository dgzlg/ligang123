import {message} from 'antd';
import {host} from "../../../config/api";
import {push} from 'connected-react-router';

export const prefix = 'Demand_Pub_Record';
export const LIST_LOADING = `${prefix}/listLoading`;
export const LIST_LOADED = `${prefix}/listLoaded`;
export const PUB_LIST = `${prefix}/pubList`;

export const getList = (params) => {
    return (request, dispatch, getState) => {
        let { pageNumber: defaultPageNumber, pageSize: defaultPageSize, order: defaultOrder, condition: defaultCondition } = getState().Demand_Pub_Record.pubList;
        const queryParams = {};
        /* 条件 */
        queryParams.condition = params.condition || defaultCondition;
        /* 排序 */
        queryParams.order = params.order || defaultOrder;
        /* 分页 */
        queryParams.pageNumber = params.pageNumber || defaultPageNumber;
        queryParams.pageSize = params.pageSize || defaultPageSize;
        /* 额外参数 */
        queryParams.processDefinitionId = 'publishNeed';

        dispatch({type: LIST_LOADING});
        request({
            method: 'GET',
            url: `${host}/rest/sys/task/my-processes`,
            params: queryParams
        })
            .then((json) => {
                dispatch({
                    type: PUB_LIST,
                    pubList: json.rows,
                    total: json.total,
                    pageNumber: json.pageNumber,
                    pageSize: 10,
                });
            })
            .catch((err) => {
                message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    };
};

/**
 * 查看详情
 * @param {object} target - 查看的目标
 * @return {Function}
 */
export const handleDetails = (target) => {
    return (request, dispatch) => {
        dispatch(push(`/task/scan/publishNeed/-1/${target.id}`));
    };
};
