import {host} from '../../../config/api';
import {getList as commonGetList} from '../../../modules/common/List/list';

/* redux store的key标识位 */
export const prefix = 'ResourceApproved';


/**
 * 获取资源列表
 * @param params 列表请求参数
 * @returns {function(*, *, *)}
 */
export const getList = (params) => {
  return commonGetList({
    url: `${host}/rest/busi/resource/my-apply-pager`,
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
 * 下载文件类型的资源
 * @param {string} fileId - 资源id
 */
export const downloadFile = (fileId) => {
  window.open(`${host}/rest/busi/resource/file/download/${fileId}`);
};
