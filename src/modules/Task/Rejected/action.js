import {push} from 'connected-react-router';
import {message, Modal} from 'antd';
import {host} from '../../../config/api';
import {getList as commonGetList} from '../../../modules/common/List/list';
import {initialize} from "../../Resource/Collector/action";

/* redux store的key标识位 */
export const prefix = 'TaskRejected';


/**
 * 获取被拒列表
 * @param params 列表请求参数
 * @returns {function(*, *, *)}
 */
export const getList = (params) => {
  return commonGetList({
    url: `${host}/rest/sys/task/reject`,
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
 * 查看详情
 * @param {object} target - 目标对象
 * @return {Function}
 */
export const scanDetail = (target) => {
  return (request, dispatch) => {
    dispatch(push(`/task/scan/publishResource/${target.id || '-1'}/${target.processId}`));
  };
};

export const drop = (taskId) => {
  return (request, dispatch, getState) => {
    Modal.confirm({
      title: '确定要作废此资源发布吗？',
      onOk: () => {
        request({
          method: 'POST',
          url: `${host}/rest/sys/task/complete/${taskId}`,
          data: {pass: false},
        })
          .then(() => {
            message.success('已将此资源发布作废');
            let {list: {records, pageNumber, pageSize}} = getState()[prefix];
            if (records.length === 1) {
              pageNumber = Math.max(pageNumber - 1, 1);
            }
            dispatch(getList({pageNumber, pageSize}));
          })
          .catch(() => {
            message.error('作废未成功');
          });
      },
    });
  };
};

/**
 * 解决
 * @param {object} target - 被拒的对象
 * @return {Function}
 */
export const settle = (target) => {
  return (request, dispatch) => {
    switch (target.processDefinitionId) {
      case 'publishResource':
        dispatch(push(`/resource/publish/1/${target.id}`));
        break;
      default:
    }
  };
};
