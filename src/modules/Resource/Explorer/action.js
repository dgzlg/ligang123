import {message} from 'antd';
import {host} from "../../../config/api";
import createAction from "../../common/utils/createAction";
import storeKey from './constants/storeKey.ts';

export const prefix = storeKey;
export const INITIALIZE = `${prefix}/initialize`;
export const TOGGLE_RESOURCE_LOADING = `${prefix}/toggleResourceLoading`;
export const UPDATE_RESOURCE_LIST = `${prefix}/updateResourceList`;

/* 更新路径 */
export const UPDATE_PATH = `${prefix}/updatePath`;

/* 文件类资源（FR）编辑 */
export const START_FRE = `${prefix}/startFRE`;
export const CANCEL_FRE = `${prefix}/cancelFRE`;
export const FINISH_FRE = `${prefix}/finishFRE`;
export const UPDATE_FRE_STEP = `${prefix}/updateFREStep`;
export const UPDATE_FRE_VALUE = `${prefix}/updateFREFormValue`;

/* API类资源（AR）编辑 */
export const START_CREATE_AR = `${prefix}/startCreateAR`;
export const START_MODIFY_AR = `${prefix}/startModifyAR`;
export const LOADED_ARE = `${prefix}/loadedAREdit`;
export const FAILED_LOAD_ARE = `${prefix}/failedLoadAREdit`;
export const CANCEL_AR_EDIT = `${prefix}/cancelAREdit`;
export const SAVING_AR = `${prefix}/savingAR`;
export const FAILED_SAVE_AR = `${prefix}/failedSaveAR`;
export const SAVED_AR = `${prefix}/savedAR`;
export const UPDATE_ARE_STEP = `${prefix}/updateAREStep`;
export const PREV_ITEM_AR_EDIT = `${prefix}/prevAREditItem`;
export const NEXT_ITEM_AR_EDIT = `${prefix}/nextAREditItem`;
export const TO_ITEM_AR_EDIT = `${prefix}/toAREditItem`;
export const UPDATE_ARE_VALUE = `${prefix}/updateAREFormValue`;

/* API类资源测试 */
export const OPEN_AR_TESTING = `${prefix}/openARTesting`;
export const AR_TEST_SUCCEED = `${prefix}/aRTestSucceed`;
export const AR_TEST_FAILED = `${prefix}/aRTestFailed`;
export const AR_TEST_ERROR = `${prefix}/aRTestError`;
export const CLOSE_AR_TESTING = `${prefix}/closeARTesting`;

/* API类资源查看 */
export const OPEN_ARV = `${prefix}/openARViewer`;
export const CLOSE_ARV = `${prefix}/closeARViewer`;
export const LOADED_ARV = `${prefix}/loadedARViewer`;
export const FAILED_LOAD_ARV = `${prefix}/failedLoadARViewer`;
export const EDIT_AR_FROM_VIEWER = `${prefix}/editARFromViewer`;

/* Map类资源编辑 */
export const START_CREATE_MR = `${prefix}/startCreateMR`;
export const START_MODIFY_MR = `${prefix}/startModifyMR`;
export const CANCEL_MR_EDIT = `${prefix}/cancelMREdit`;
export const SAVING_MR = `${prefix}/savingMR`;
export const FAILED_SAVE_MR = `${prefix}/failedSaveMR`;
export const SAVED_MR = `${prefix}/savedMR`;

export const initialize = () => {
  return (request, dispatch) => {
    dispatch({type: INITIALIZE});
    dispatch(updateResourceList());
  };
};


/**
 * 更新资源列表数据
 */
export const updateResourceList = () => {
  return (request, dispatch, getState) => {
    const {pathArray} = getState()[prefix];
    let directoryId = pathArray.length === 0 ? '-1' : pathArray[pathArray.length - 1].id;
    dispatch({type: TOGGLE_RESOURCE_LOADING, loading: true});
    // 请求自己的资源列表
    request({
      method: 'GET',
      url: `${host}/rest/busi/resource/directory/${directoryId}`,
    })
      .then((res) => {
        const directories = res.directories.map(_ => ({..._, type: 'directory'}));
        const resources = res.resources.map(_ => ({..._, type: _.resourceType.toLowerCase()}));
        dispatch({
          type: UPDATE_RESOURCE_LIST,
          list: [...directories, ...resources],
        });
      })
      .catch((err) => {
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
    dispatch({type: UPDATE_PATH, pathArray});
    dispatch(updateResourceList());
  };
};

/**
 * 删除资源
 * @param resource
 * @return {Function}
 */
export const deleteResource = (resource) => {
  return (request, dispatch) => {
    dispatch({type: TOGGLE_RESOURCE_LOADING, loading: true});
    request({
      method: 'DELETE',
      url: `${host}/rest/busi/resource/file/${resource.id}`,
    })
      .then(() => {
        message.success('删除成功');
        dispatch(updateResourceList());
      })
      .catch((err) => {
        message.error('删除失败');
        dispatch({type: TOGGLE_RESOURCE_LOADING, loading: false});
        throw err;
      });
  };
};

/**
 * 创建文件类资源
 * @return {object} action
 */
export const createFR = () => ({
  type: START_FRE,
  payload: {
    fEVisible: true,
    fETarget: null,
    fEName: '',
    fEFile: null,
    fEDescription: '',
  },
});

/**
 * 修改文件类资源
 * @param {object} resource - 目标resource
 * @return {object} action
 */
export const modifyFR = (resource) => ({
  type: START_FRE,
  payload: {
    fETarget: resource,
    fEVisible: true,
    fEName: resource.name,
    fEDes: resource.description,
    fEFile: {
      name: resource.name,
      id: resource.resourceId,
    },
  },
});

/**
 * 取消编辑
 * @return {object} action
 */
export const cancelFRE = () => ({type: CANCEL_FRE});

/**
 * 编辑框的值更新
 * @param {object} payload
 * @return {object} action
 */
export const updateFREValue = (payload) => ({type: UPDATE_FRE_VALUE, payload});

/**
 * 更新已选文件
 * @param {object} file - 用户选择的文件
 * @return {Function}
 */
export const updateEditingFile = (file) => {
  return (request, dispatch, getState) => {
    const {fEName} = getState()[prefix];
    let payload = {fEFile: file};
    if (!fEName) {
      payload.fEName = file.name;
    }
    dispatch(updateFREValue(payload));
  };
};

/**
 * 文件上传
 * @param {function} request - 由redux中间件封装过的request方法
 * @param {object} file - 从表单获取到的file
 * @return {*}
 */
const uploadFile = (request, file) => {
  const data = new FormData();
  data.append('uploadFile', file);
  return request({
    method: 'POST',
    url: `${host}/rest/busi/resource/file/upload`,
    data,
  });
};

/**
 * 保存文件类型的资源
 * @return {Function}
 */
export const saveFileResource = () => {
  return (request, dispatch, getState) => {
    const {pathArray, fETarget, fEFile, fEName, fEDescription} = getState()[prefix];
    const length = pathArray.length;
    const directoryId = length > 0 ? pathArray[length - 1].id : '-1';
    const isModify = fETarget !== null;
    let resource = {directoryId, name: fEName, description: fEDescription};
    if (isModify) {
      resource.id = fETarget.id;
    }
    dispatch({type: UPDATE_FRE_STEP, stepIndex: 1, stepProgress: [33, 0], stepDescription: `开始${isModify ? '修改' : '创建'}资源...`});
    new Promise((resolve) => {
      if (!fEFile.id) {
        dispatch({type: UPDATE_FRE_STEP, stepIndex: 2, stepProgress: [66, 33], stepDescription: '上传文件中...'});
        uploadFile(request, fEFile)
          .then((res) => {
            resource.resourceId = res.entity.id;
            resolve(resource);
          })
          .catch((err) => {
            dispatch({type: UPDATE_FRE_STEP, stepIndex: 5, stepProgress: [66, 33], stepDescription: '文件上传失败'});
            throw err;
          });
        return;
      }
      resource.resourceId = fEFile.id;
      resolve(resource);
    })
      .then((data) => {
        dispatch({type: UPDATE_FRE_STEP, stepIndex: 3, stepProgress: [100, 66], stepDescription: '保存资源中...'});
        request({
          method: isModify ? 'PUT' : 'POST',
          url: `${host}/rest/busi/resource/file`,
          data,
        })
          .then(() => {
            dispatch({type: UPDATE_FRE_STEP, stepIndex: 4, stepProgress: [100, 100], stepDescription: `资源${isModify ? '修改' : '创建'}成功`});
            setTimeout(() => {
              dispatch(finishFRE());
            }, 800);
            dispatch(updateResourceList());
          })
          .catch((err) => {
            dispatch({type: UPDATE_FRE_STEP, stepIndex: 5, stepProgress: [100, 66], stepDescription: `资源${isModify ? '修改' : '创建'}失败`});
            dispatch({type: UPDATE_FRE_VALUE, payload: {fEFile: {name: data.name, id: data.resourceId}}});
            throw err;
          });
      });
  };
};

/**
 * 完成文件类资源编辑
 * @type {Function}
 */
export const finishFRE = createAction(FINISH_FRE);

/**
 * 查询API类资源详情
 * @param {function} request
 * @param {string|number} id
 * @return {*}
 */
const queryAR = (request, id) => {
  return request({
    method: 'GET',
    url: `${host}/rest/busi/resource/interface/${id}`
  });
};

/**
 * 创建API类资源
 * @return {{type: string}}
 */
export const createAR = () => ({type: START_CREATE_AR});

/**
 * 修改API类资源
 * @param target
 * @return {{type: string, target: *}}
 */
export const modifyAR = (target) => {
  return (request, dispatch) => {
    dispatch({type: START_MODIFY_AR, target: {id: target.id, name: target.name}});
    queryAR(request, target.id)
      .then(({entity = {interface: {}}}) => {
        dispatch({
          type: LOADED_ARE,
          name: entity.name,
          description: entity.description,
          interface: {
            ...entity.interface,
            params: JSON.parse(entity.interface.params),
          },
        });
      })
      .catch(() => {
        message.error('资源数据获取失败');
        dispatch({type: FAILED_LOAD_ARE});
      });
  };
};

export const prevAREditItem = () => ({type: PREV_ITEM_AR_EDIT});
export const nextAREditItem = () => ({type: NEXT_ITEM_AR_EDIT});
export const toAREditItem = (index) => ({type: TO_ITEM_AR_EDIT, index});

/**
 * 保存API类资源
 * @return {Function}
 */
export const saveAPIResource = () => {
  return (request, dispatch, getState) => {
    const {
      pathArray, aRETarget, aREName, aREDescription,
      aREIName, aREIMethod, aREIUrl, aREIResponseType, aREIPreInterface, aREIParams,
    } = getState()[prefix];
    const length = pathArray.length;
    const directoryId = length > 0 ? pathArray[length - 1].id : '-1';
    const data = {
      name: aREName,
      description: aREDescription,
      directoryId,
      resourceType: 'API',
      interface: {
        name: aREIName,
        url: aREIUrl,
        method: aREIMethod,
        responseType: aREIResponseType,
        preInterface: aREIPreInterface,
        params: aREIParams,
      },
    };
    let method;
    dispatch({type: SAVING_AR});

    if (aRETarget === null) {
      method = 'POST';
    } else {
      method = 'PUT';
      data.id = aRETarget.id;
      data.interface.id = aRETarget.interface.id;
    }
    request({
      method,
      data,
      url: `${host}/rest/busi/resource/interface`,
    }).then(() => {
      dispatch({type: SAVED_AR});
      dispatch(updateResourceList());
      message.success(`资源${aRETarget === null ? '创建' : '修改'}成功`);
    }).catch(() => {
      dispatch({type: FAILED_SAVE_AR});
      message.error(`资源${aRETarget === null ? '创建' : '修改'}失败`);
    });
  };
};

export const cancelARE = () => ({type: CANCEL_AR_EDIT});

export const updateAREValue = (payload) => ({type: UPDATE_ARE_VALUE, payload});

/* 测试api资源 */
const testAR = (request, data) => {
  return request({
    method: 'POST',
    url: `${host}/rest/busi/resource/interface/test`,
    data,
  });
};

/* 测试正在编辑的api资源 */
export const testEditingAR = () => {
  return (request, dispatch, getState) => {
    const {aREIName, aREIMethod, aREIUrl, aREIResponseType, aREIPreInterface, aREIParams} = getState()[prefix];
    dispatch({type: OPEN_AR_TESTING});
    testAR(request, {
      name: aREIName,
      method: aREIMethod,
      url: aREIUrl,
      responseType: aREIResponseType,
      preInterface: aREIPreInterface,
      params: aREIParams,
    })
      .then(({msg, entity}) => {
        dispatch({type: AR_TEST_SUCCEED, result: JSON.stringify(entity) || msg});
      })
      .catch((err) => {
        dispatch({type: AR_TEST_FAILED, result: err.message || '测试失败'});
      });
  };
};

export const closeART = () => ({type: CLOSE_AR_TESTING});

/* 查看api资源 */
export const viewAR = (target) => {
  return (request, dispatch) => {
    dispatch({type: OPEN_ARV});
    queryAR(request, target.id)
      .then(({entity = {interface: { params: ''}}}) => {
        entity.interface.params = JSON.parse(entity.interface.params);
        dispatch({type: LOADED_ARV, target: entity});
      })
      .catch(() => {
        dispatch({type: FAILED_LOAD_ARV});
      });
  };
};

export const testViewingAR = () => {
  return (request, dispatch, getState) => {
    const itf = getState()[prefix].aRVTarget.interface;
    dispatch({type: OPEN_AR_TESTING});
    testAR(request, itf)
      .then(({msg, entity}) => {
        dispatch({type: AR_TEST_SUCCEED, result: JSON.stringify(entity) || msg});
      })
      .catch(err => {
        dispatch({type: AR_TEST_FAILED, result: err.message || '测试失败'});
      });
  };
};

export const closeARV = () => ({type: CLOSE_ARV});

/* 从api查看器跳至编辑 */
export const editARFromViewer = () => {
  return (request, dispatch, getState) => {
    const {aRVTarget} = getState()[prefix];
    dispatch({type: EDIT_AR_FROM_VIEWER, ...aRVTarget});
  };
};
