import {push} from 'connected-react-router';
import {host} from '../../../config/api';
import {getList as commonGetList} from '../../../modules/common/List/list';

/* redux store的key标识位 */
export const prefix = 'Task_Waiting';


/**
 * 获取所属机构列表
 * @param params 列表请求参数
 * @returns {function(*, *, *)}
 */
export const getList = (params) => {
  return commonGetList({
    url: `${host}/rest/sys/task/waiting`,
    params,
    keyOfStore: prefix
  });
};

export const search = (condition) => {
  return (request, dispatch) => {
    dispatch(getList({pageNumber: 1, condition: condition}));
  };
};

/**
 * 办理审批
 * @param {object} target - 审批的对象
 * @return {Function}
 */
export const approve = (target) => {
  return (request, dispatch) => {
    dispatch(push(`/task/approve/${target.processDefinitionId}/${target.id}/${target.processId}`));
  };
};
