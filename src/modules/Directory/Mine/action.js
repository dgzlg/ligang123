import {message} from 'antd';
import createAction from "../../common/utils/createAction";
import {host} from "../../../config/api";
import getMenusTree from "../../common/utils/getMenusTree";

export const prefix = 'DirectoryMine';

export const TOGGLE_DIRECTORY_LOADING = `${prefix}/toggleDirectoryLoading`;
export const UPDATE_DIRECTORY_LIST = `${prefix}/updateDirectoryList`;
export const UPDATE_PATH_ARRAY = `${prefix}/updatePathArray`;
export const START_DIRECTORY_EDIT = `${prefix}/startDirectoryEdit`;
export const CANCEL_DIRECTORY_EDIT = `${prefix}/cancelDirectoryEdit`;
export const FINISH_DIRECTORY_EDIT = `${prefix}/finishDirectoryEdit`;
export const UPDATE_EDITING_VALUE = `${prefix}/updateEditingName`;
export const TOGGLE_EDIT_SAVING_STATE = `${prefix}/updateEditSavingState`;
export const TOGGLE_EDIT_ABLE = `${prefix}/updateEditAble`;
export const TOGGLE_PUBLIC_DIRECTORY_LOADING = `${prefix}/togglePublicDirectoryLoading`;
export const UPDATE_PUBLIC_DIRECTORY = `${prefix}/updatePublicDirectory`;

/**
 * 更新文件夹列表
 * @return {Function}
 */
export const updateDirectoryList = () => {
  return (request, dispatch, getState) => {
    const {pathArray} = getState()[prefix];
    const length = pathArray.length;
    const directoryId = length > 0 ? pathArray[length - 1].id : '-1';
    dispatch({type: TOGGLE_DIRECTORY_LOADING, loading: true});
    request({
      method: 'GET',
      url: `${host}/rest/busi/directory/children/${directoryId}`,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_DIRECTORY_LIST,
          list: res.map(_ => ({..._, type: 'directory'}))
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

/**
 * 删除文件夹
 * @param target
 * @return {Function}
 */
export const deleteDirectory = (target) => {
  return (request, dispatch) => {
    dispatch({type: TOGGLE_DIRECTORY_LOADING, loading: true});
    request({
      method: 'DELETE',
      url: `${host}/rest/busi/directory/${target.id}`,
    })
      .then((res) => {
        message.success('删除成功');
        dispatch(updateDirectoryList());
      })
      .catch((err) => {
        message.error(`删除失败（原因：${err.message}）`);
        throw err;
      });
  };
};

/**
 * 目录导航至
 * @param {array} pathArray 路径数组 - 数组元素为目录对象
 * @return {Function}
 */
export const navTo = (pathArray) => {
  return (request, dispatch) => {
    dispatch({type: UPDATE_PATH_ARRAY, pathArray});
    dispatch(updateDirectoryList());
  };
};

/**
 * 创建目录
 * @return {object} action
 */
export const createDirectory = () => ({
  type: START_DIRECTORY_EDIT,
  payload: {
    editModal: 0,
    editModalVisible: true,
    editingName: '',
    editSaving: false,
  },
});

/**
 * 修改目录
 * @return {object} action
 */
export const modifyDirectory = (target) => ({
  type: START_DIRECTORY_EDIT,
  payload: {
    editModal: 1,
    editingTarget: target,
    editModalVisible: true,
    editingName: target.name,
    editSaving: false,
  },
});

/**
 * 更新表单正在编辑的值
 * @type {Function}
 */
export const updateEditingValue = createAction(UPDATE_EDITING_VALUE, 'payload');

/**
 * 取消目录编辑
 * @type {Function}
 */
export const cancelDirectoryEdit = createAction(CANCEL_DIRECTORY_EDIT);

/**
 * 保存目录编辑
 * @return {Function}
 */
export const saveDirectoryEdit = () => {
  return (request, dispatch, getState) => {
    const {pathArray, editModal, editingTarget, editingName} = getState()[prefix];
    const length = pathArray.length;
    dispatch({type: TOGGLE_EDIT_SAVING_STATE, state: true});
    if (editModal === 0) {
      request({
        method: 'POST',
        url: `${host}/rest/busi/directory`,
        data: {
          name: editingName,
          parentId: length > 0 ? pathArray[length - 1].id : '-1',
        },
      })
        .then((res) => {
          message.success('创建成功');
          dispatch({type: FINISH_DIRECTORY_EDIT});
          dispatch(updateDirectoryList());
        })
        .catch((err) => {
          throw err;
        });
      return;
    }
    request({
      method: 'PUT',
      url: `${host}/rest/busi/directory`,
      data: {
        id: editingTarget.id,
        name: editingName,
        parentId: length > 0 ? pathArray[length - 1].id : '-1',
      },
    })
      .then((res) => {
        message.success('修改成功');
        dispatch({type: FINISH_DIRECTORY_EDIT});
        dispatch(updateDirectoryList());
      })
      .catch((err) => {
        throw err;
      });
  };
};

/**
 * 发布目录
 * @return {Function}
 */
export const publishDirectory = () => {
  return (request, dispatch) => {
    dispatch({type: TOGGLE_EDIT_ABLE, editable: false});
    request({
      method: 'POST',
      url: `${host}/rest/busi/directory/commit`,
      data: {description: ''},
    })
      .then((res) => {
        dispatch({type: TOGGLE_EDIT_ABLE, editable: true});
        message.success('已成功提交发布申请');
      })
      .catch((err) => {
        dispatch({type: TOGGLE_EDIT_ABLE, editable: true});
        throw err;
      });
  };
};

export const updatePublicDirectory = () => {
  return (request, dispatch) => {
    dispatch({type: TOGGLE_PUBLIC_DIRECTORY_LOADING, loading: true});
    request({
      method: 'GET',
      url: `${host}/rest/busi/directory/published`,
    })
      .then((res) => {
        dispatch({type: UPDATE_PUBLIC_DIRECTORY, tree: getMenusTree(res, undefined, '-1')});
      })
      .catch(() => {});
  };
};
