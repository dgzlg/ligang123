import {push} from 'connected-react-router';
import {host} from '../../../config/api';
import {getList as commonGetList} from '../../../modules/common/List/list';

/* redux store的key标识位 */
export const prefix = 'Task_Done';

/**
 * 获取所属机构列表
 * @param params 列表请求参数
 * @returns {function(*, *, *)}
 */
export const getList = (params) => {
  return commonGetList({
    url: `${host}/rest/sys/task/done`,
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
 * 浏览审批详情
 * @param {object} target - 审批目标
 * @return {Function}
 */
export const scan = (target) => {
  return (request, dispatch) => {
    dispatch(push(`/task/scan/${target.processDefinitionId}/${target.id}/${target.processId}`));
  };
};
