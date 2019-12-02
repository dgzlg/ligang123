import {message} from 'antd';
import {find} from 'lodash';
import {host} from "../../../config/api";
import getMenusTree from "../../common/utils/getMenusTree";
import createAction from "../../common/utils/createAction";

export const prefix = 'ShareCenter';
export const SHOW_ORGANIZATION_SELECT = `${prefix}/showOrganizationList`;
export const TOGGLE_ORGANIZATION_LOADING = `${prefix}/toggleOrganizationLoading`;
export const UPDATE_ORGANIZATION_LIST = `${prefix}/updateOrganizationList`;
export const UPDATE_ORGANIZATION_SELECTED = `${prefix}/updateOrganizationSelected`;
export const SHOW_SOURCE_LIST = `${prefix}/showSourceList`;
export const TOGGLE_SOURCE_LOADING = `${prefix}/toggleSourceLoading`;
export const UPDATE_SOURCE_LIST = `${prefix}/updateSourceList`;
export const UPDATE_PATH_ARRAY = `${prefix}/updatePathArray`;

export const showOrganizationSelect = createAction(SHOW_ORGANIZATION_SELECT);

/**
 * 更新组织机构列表
 * @return {Function}
 */
export const updateOrganizationList = () => {
  return (request, dispatch) => {
    dispatch({type: TOGGLE_ORGANIZATION_LOADING, loading: true});
    request({
      method: 'GET',
      url: `${host}/rest/sys/org/all`,
    })
      .then((res) => {
        const tree = getMenusTree(res, undefined, '-1');
        dispatch({type: UPDATE_ORGANIZATION_LIST, list: res, tree});
      })
      .catch((err) => {
        message.error('组织机构查询失败');
        dispatch({type: TOGGLE_ORGANIZATION_LOADING, loading: false});
        throw err;
      });
  };
};

export const selectOrganization = createAction(UPDATE_ORGANIZATION_SELECTED, 'id');

/**
 * 打开目标组织的资源列表
 * @return {Function}
 */
export const showSourceList = () => {
  return (request, dispatch, getState) => {
    const {organizationSelected, organizationList} = getState()[prefix];
    const organizationId = organizationSelected.replace(/^.*,/g, '');
    const organization = find(organizationList, _ => _.id === organizationId);
    dispatch({type: SHOW_SOURCE_LIST, organization});
  };
};

/**
 * 更新资源列表
 * @return {Function}
 */
export const updateSourceList = () => {
  return (request, dispatch, getState) => {
    const {currentOrganization, pathArray} = getState()[prefix];
    const length = pathArray.length;
    const directoryId = length > 0 ? pathArray[length - 1].id : '-1';
    dispatch({type: TOGGLE_SOURCE_LOADING, loading: true});
    request({
      method: 'GET',
      url: `${host}/rest/busi/resource/directory/published/${directoryId}`,
      params: {orgId: currentOrganization.id}
    })
      .then((res) => {
        dispatch({
          type: UPDATE_SOURCE_LIST,
          list: [...res.directories.map(_ => ({..._, type: 'directory'})), ...res.resources.map(_ => ({..._, type: 'file'}))]
        });
      })
      .catch((err) => {
        message.error('资源获取失败');
        dispatch({type: TOGGLE_SOURCE_LOADING, loading: false});
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
    dispatch(updateSourceList());
  };
};
