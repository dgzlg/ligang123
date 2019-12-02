import {push} from 'connected-react-router';
import {message} from 'antd';
import {host} from "../../../config/api";
import {getList as commonGetList} from "../../common/List/list";
import createAction from "../../common/utils/createAction";


export const prefix = 'Demand_Center';
export const START_DEMAND_EDIT = `${prefix}/startDemandEdit`;
export const UPDATE_FORM_VALUE = `${prefix}/updateFormValue`;
export const TOGGLE_PUBLISH_LOADING = `${prefix}/togglePublishLoading`;
export const FINISH_DEMAND_EDIT = `${prefix}/finishDemandEdit`;
export const CANCEL_DEMAND_EDIT = `${prefix}/cancelDemandEdit`;

/**
 * 获取需求列表
 * @param {object} params - 查询参数
 * @return {function(*, *, *)}
 */
export const getList = (params) => {
  return commonGetList({
    url: `${host}/rest/busi/need/pager`,
    params,
    keyOfStore: prefix
  });
};

/**
 * 查询需求
 * @param {string} condition - 查询关键字
 * @return {Function}
 */
export const searchDemand = (condition) => {
  return (request, dispatch) => {
    dispatch(getList({pageNumber: 1, condition: condition}));
  };
};

/**
 * 响应需求
 * @param {object} record - 需求对象
 */
export const handleResponse = (record) => {
  return (request, dispatch) => {
    dispatch(push(`/demand/respond/${record.id}`));
  };
};

/**
 * 创建需求
 * @return {object} action
 */
export const createDemand = () => ({
  type: START_DEMAND_EDIT,
  payload: {
    demandModalVisible: true,
    demandEditModal: 0,
    demandTitle: '',
    demandDescription: '',
    demandPublishLoading: false,
  },
});

/**
 * 更新表单值
 * @type {Function}
 */
export const updateFormValue = createAction(UPDATE_FORM_VALUE, 'payload');

/**
 * 取消需求编辑
 * @type {Function}
 */
export const cancelDemandEdit = createAction(CANCEL_DEMAND_EDIT);

/**
 * 保存（提交）需求编辑
 * @return {Function}
 */
export const saveDemandEdit = () => {
  return (request, dispatch, getState) => {
    const {demandEditModal, demandId, demandTitle, demandDescription} = getState()[prefix];
    dispatch({type: TOGGLE_PUBLISH_LOADING, loading: true});
    if (demandEditModal === 0) {
      request({
        method: 'POST',
        url: `${host}/rest/busi/publishNeed/start`,
        data: {
          name: demandTitle,
          description: demandDescription,
          message: '',
        },
      })
        .then(() => {
          message.success('发布成功');
          dispatch({type: FINISH_DEMAND_EDIT});
        })
        .catch((err) => {
          message.error('发布失败');
          dispatch({type: TOGGLE_PUBLISH_LOADING, loading: false});
          throw err;
        });
    }
  };
};
