import {push, goBack} from 'connected-react-router';
import {Modal, message} from 'antd';
import {host} from "../../../config/api";
import createAction from "../../common/utils/createAction";

export const prefix = 'ResourceCollector';
export const UPDATE_LIST = `${prefix}/updateList`;
export const UPDATE_FORM_VALUE = `${prefix}/updateFormValue`;
export const TOGGLE_SUBMIT_LOADING = `${prefix}/toggleSubmitLoading`;

const getResourceListWillPublish = ({taskId}) => {
  return (request, dispatch) => {
    request({
      method: 'GET',
      url: `${host}/rest/sys/task/${taskId}`,
    })
      .then((res) => {
        const list = JSON.parse(res.entity.variables.applyResourcces).map(_ => ({..._, type: 'file'}));
        dispatch({type: UPDATE_LIST, list});
      })
      .catch((err) => {
        Modal.error({
          title: '发生错误',
          content: `原因：${err.message}`,
          onOk: () => {
            dispatch(goBack());
          },
        });
      });
  };
};

export const initialList = (type, payload) => {
  return (request, dispatch) => {
    if (!payload.isModify) {
      return;
    }
    switch (type) {
      case 'publish':
        dispatch(getResourceListWillPublish(payload));
        break;
      default:
        dispatch({type: UPDATE_LIST, list: []});
    }
  };
};

/**
 * 将目标资源添加到列表
 * @param {object} target - 目标资源
 * @return {Function}
 */
export const addResourceToList = (target) => {
  return (request, dispatch, getState) => {
    const {list} = getState()[prefix];
    for (let i = 0, l = list.length; i < l; i++) {
      if (target.id === list[i].id) {
        return;
      }
    }
    dispatch({
      type: UPDATE_LIST,
      list: [...list, target],
    });
  };
};

/**
 * 将目标资源从列表移除
 * @param {object} target
 * @return {Function}
 */
export const removeResourceFromList = (target) => {
  return (request, dispatch, getState) => {
    const {list} = getState()[prefix];
    dispatch({
      type: UPDATE_LIST,
      list: list.filter(_ => _.id !== target.id),
    });
  };
};

/**
 * 清空发布列表
 * @return {{type: string, list: Array}}
 */
export const clearList = () => {
  return {
    type: UPDATE_LIST,
    list: [],
  };
};

export const updateFormValue = createAction(UPDATE_FORM_VALUE, 'payload');

/**
 * 发布列表中的资源
 * @param {string} taskId - 资源发布的id
 * @param {array} idArray - 发布的资源id
 * @param {string} description - 发布说明
 * @return {Function}
 */
const publishResource = ({taskId}, idArray, description) => {
  return (request, dispatch) => {
    let url;
    let data = {
      resourceIds: idArray,
      message: description,
    };
    if (taskId) {
      // 如果存在taskId，说明是重新提交资源发布
      url = `${host}/rest/sys/task/complete/${taskId}`;
      data.note = message;
      data.pass = true;
    } else {
      url = `${host}/rest/busi/resourcePublish/start`;
    }
    request({
      url,
      method: 'POST',
      data,
    })
      .then(() => {
        message.success('发布申请已提交');
        dispatch(clearList());
        dispatch({type: TOGGLE_SUBMIT_LOADING, loading: false});
      })
      .catch((err) => {
        dispatch({type: TOGGLE_SUBMIT_LOADING, loading: false});
        message.error(`发布失败`);
        throw err;
      });
  };
};

/**
 * 申请使用列表中的资源
 * @param requestId
 * @param idArray
 * @param description
 * @return {Function}
 */
const requestResource = ({requestId}, idArray, description) => {
  return (request, dispatch) => {
    if (requestId) {
      // TODO 如果存在requestId，说明是重新提交申请
    }
    request({
      method: 'POST',
      url: `${host}/rest/busi/resourceApply/start`,
      data: {resourceIds: idArray, message: description},
    })
      .then(() => {
        message.success('资源使用申请已提交');
        dispatch(clearList());
        dispatch({type: TOGGLE_SUBMIT_LOADING, loading: false});
      })
      .catch((err) => {
        dispatch({type: TOGGLE_SUBMIT_LOADING, loading: false});
        message.error(`提交失败`);
        throw err;
      });
  };
};

/**
 * 以列表中的资源响应目标需求
 * @param {string} demandId - 目标需求的id
 * @param {array} idArray - 响应的资源id
 * @param {string} description - 响应说明
 * @return {Function}
 */
const respondDemand = ({demandId}, idArray, description) => {
  return (request, dispatch) => {
    request({
      method: 'POST',
      url: `${host}/rest/busi/responseNeed/start/${demandId}`,
      data: {resourceIds: idArray, message: description},
    })
      .then(() => {
        message.success('需求响应已提交');
        dispatch(clearList());
        dispatch({type: TOGGLE_SUBMIT_LOADING, loading: false});
      })
      .catch((err) => {
        dispatch({type: TOGGLE_SUBMIT_LOADING, loading: false});
        message.error(`提交失败`);
        throw err;
      });
  };
};

export const apply = (type, payload) => {
  return (request, dispatch, getState) => {
    const {list, description} = getState()[prefix];
    const idArray = list.map(_ => _.id);
    dispatch({type: TOGGLE_SUBMIT_LOADING, loading: true});
    switch (type) {
      case 'publish':
        dispatch(publishResource(payload, idArray, description));
        return;
      case 'request':
        dispatch(requestResource(payload, idArray, description));
        return;
      case 'respond':
        dispatch(respondDemand(payload, idArray, description));
        return;
      default:
        return;
    }
  };
};

/**
 * 作废此申请
 * @return {Function}
 */
export const dropApply = (type, payload) => {
  return (request, dispatch) => {
    if (type !== 'publish') {
      return;
    }
    Modal.confirm({
      title: '确定要作废此资源发布申请吗？',
      onOk: () => {
        request({
          method: 'POST',
          url: `${host}/rest/sys/task/complete/${payload.taskId}`,
          data: {pass: false},
        })
          .then(() => {
            message.success('已将此资源发布申请作废');
            dispatch(push('/task/rejected'));
          })
          .catch((err) => {
            message.error('作废未成功');
          });
      },
    });
  };
};
