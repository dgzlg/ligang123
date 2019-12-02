import {push} from 'connected-react-router';
import {message} from 'antd';
import {host} from "../../../config/api";
import createAction from "../../common/utils/createAction";
import getMenusTree from "../../common/utils/getMenusTree";

export const prefix = 'TaskApprove';

export const UPDATE_TASK_INFO = `${prefix}/updateApproveInfo`;
export const UPDATE_REQUEST_INFO = `${prefix}/updateRequestInfo`;
export const UPDATE_HISTORY = `${prefix}/updateHistory`;
export const UPDATE_FORM_VALUE = `${prefix}/updateFormValue`;
export const TOGGLE_APPROVE_LOADING = `${prefix}/toggleApproveLoading`;


/**
 * 更新初始数据
 * @param {string} type - 审批类型
 * @param {string} taskId - 审批id
 * @param {string} processId - 流程id
 * @return {Function}
 */
export const updateData = (type, taskId, processId) => {
  return (request, dispatch) => {
    dispatch({type: UPDATE_TASK_INFO, taskType: type, taskId, processId});
    dispatch(updateRequestInfo());
    dispatch(updateHistory());
  };
};

/**
 * 更新信息
 * @return {Function}
 */
const updateRequestInfo = () => {
  return (req, dispatch, getState) => {
    const {taskType, taskId, processId} = getState()[prefix];
    let url;
    if (taskId === '-1') {
      url = `${host}/rest/sys/task/process/${processId}`;
    } else {
      url = `${host}/rest/sys/task/${taskId}`;
    }
    req({
      method: 'GET',
      url,
    })
      .then((res) => {
        try {
          let demand = {},
            fileList = [],
            directoryTree = [],
            response = {},
            request = {};
          switch (taskType) {
            case 'directoryProcess':
              directoryTree = getMenusTree(JSON.parse(res.entity.variables.data).all, undefined, '-1');
              break;
            case 'publishResource':
              fileList = JSON.parse(res.entity.variables.applyResourcces).map(_ => ({..._, type: 'file'}));
              break;
            case 'publishNeed':
              demand = JSON.parse(res.entity.variables.need) || {};
              break;
            case 'responseNeed':
              response = {
                demandCreator: res.entity.variables.needCreator,
                demandTitle: res.entity.variables.needTitle,
                demandDescription: res.entity.variables.needDescription,
                creator: res.entity.variables.applyUser,
                description: res.entity.variables.message,
                resources: JSON.parse(res.entity.variables.applyResourcces || '[]').map(_ => ({..._, type: 'file'})),
              };
              break;
            case 'applyResource':
              request = {
                creator: res.entity.variables.creator,
                description: res.entity.variables.message,
                resources: JSON.parse(res.entity.variables.applyResourcces).map(_ => ({..._, type: 'file'})),
              };
              break;
            default:
              return;
          }
          dispatch({type: UPDATE_REQUEST_INFO, payload: {directoryTree, demand, fileList, response, request}});
        } catch (err) {
          throw err;
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};

/**
 * 更新审批历史
 * @return {Function}
 */
const updateHistory = () => {
  return (request, dispatch, getState) => {
    const {processId} = getState()[prefix];
    request({
      method: 'GET',
      url: `${host}/rest/sys/task/process-history/${processId}`,
    })
      .then((res) => {
        const list = res.map((
          {approver, note, pass, status: note2}
        ) => {
          let status;
          switch (pass) {
            case undefined:
              status = 'process';
              break;
            case true:
              status = 'finish';
              break;
            case false:
              status = 'error';
              break;
            default:
              status = 'wait';
          }
          return {
            user: approver,
            description: note || note2,
            status,
          };
        });
        dispatch({
          type: UPDATE_HISTORY,
          list,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

/**
 * 更新表单值
 * @type {Function}
 */
export const updateFormValue = createAction(UPDATE_FORM_VALUE, 'payload');

/**
 * 提交审批
 * @param {boolean} pass - 是否通过审批
 * @return {Function}
 */
export const approve = (pass) => {
  return (request, dispatch, getState) => {
    const {taskId, comment} = getState()[prefix];
    dispatch({type: TOGGLE_APPROVE_LOADING, loading: true});
    request({
      method: 'POST',
      url: `${host}/rest/sys/task/complete/${taskId}`,
      data: {pass, note: comment},
    })
      .then(() => {
        message.success('审批已提交');
        dispatch({type: TOGGLE_APPROVE_LOADING, loading: false});
        dispatch(push('/task/waiting'));
      })
      .catch((err) => {
        message.error('审批失败');
        dispatch({type: TOGGLE_APPROVE_LOADING, loading: false});
        throw err;
      });
  };
};

