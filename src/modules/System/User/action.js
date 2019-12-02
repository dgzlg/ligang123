import createAction from '../../common/utils/createAction';
import {host} from '../../../config/api';
import {makeSearchCondition} from '../../../modules/common/Search/tools.js';
import {Modal, message} from "antd";
import {singleCondition} from "../../../modules/common/utils/createConditions";
import {deleteListRecord, getList as commonGetList} from '../../../modules/common/List/list';
import getMenusTree from "../../../modules/common/utils/getMenusTree";

const componentName = '用户';

/* redux store的key标识位 */
export const prefix = 'System_User';
/* action type */
export const UPDATE_LIST = `${prefix}/updateList`;
export const LIST_LOADING = `${prefix}/listLoading`;
export const LIST_LOADED = `${prefix}/listLoaded`;
export const SELECT_NAME = `${prefix}/selectName`;
export const SHOW_MODAL = `${prefix}/showModal`;
export const CLOSE_MODAL = `${prefix}/closeModal`;
export const SAVING_MODAL = `${prefix}/savingModal`;
export const SAVED_MODAL = `${prefix}/savedModal`;
export const INIT_TRANSFER = `${prefix}/getRoleList`;
export const CHANGE_TRANSFER = `${prefix}/changeTransfer`;
export const SAVE_BASICINFO = `${prefix}/saveBasicInfo`;
export const CHANGE_STEP = `${prefix}/changeStep`;


/**
 * 获取机构总列表
 * @param params 列表请求参数
 * @returns {function(*, *, *)}
 */
export const getOrgList = (data = {}) => {

    const conditions = singleCondition(['name', '~']);
    const params = {
        parentId: toString(conditions),
        order: 'name'
    };
    return (request, dispatch, getState) => {
        let {order: defaultOrder} = getState().System_User.list;
        /* 排序 */
        const queryParams = {};
        queryParams.order = data.order || defaultOrder;
        request({
            method: 'GET',
            url: `${host}/rest/sys/org`,
            params
        }).then((data) => {
            const tree = getMenusTree(data, undefined, '-1');
            //const dataTree = getMenusTree(data, {id: 'id', parentId: 'parentId'}, '-1');
            dispatch({
                type: UPDATE_LIST,
                orgRecords: tree,
                order: queryParams.order
            });
        }).catch((err) => {
            message.error(err.message);
            dispatch({type: LIST_LOADED});
        });
    };
};

/**
 * 获取所属机构列表
 * @param params 列表请求参数
 * @returns {function(*, *, *)}
 */
export const getList = (params) => {
    return commonGetList({
        url: `${host}/rest/sys/user/pager`,
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
 * 打开modal，默认为add
 * @type {Function}
 */
export const showModal = (key, record) => {
    return (request, dispatch, getState) => {
        const {selectedName} = getState().System_User;
        let modal = {
            state: '',
            formTitle: '',
            /* 两个参数 : basicInfo, role */
            activeKey: '',
            fields: {}
        };
        switch (key) {
            case 'add':
                modal = {
                    state: key,
                    formTitle: `新增${componentName}`,
                    activeKey: 'basicInfo',
                    fields: {}
                };
                break;
            case 'edit':
                modal = {
                    state: key,
                    formTitle: `编辑${componentName}`,
                    activeKey: 'basicInfo',
                    fields: record
                };
                dispatch(getUserRole(record));
                break;
            case 'allocate':
                modal = {
                    state: key,
                    formTitle: `分配角色`,
                    activeKey: 'role',
                    fields: record
                };
                dispatch(getUserRole(record));
                break;
            default :
                message.error('非法modal类型！');
        }

        dispatch({type: SHOW_MODAL, selectedName: selectedName, ...modal});
        dispatch(getRoleList());

    };
};
/**
 * 关闭modal
 * @type {Function}
 */
export const closeModal = createAction(CLOSE_MODAL);

/**
 * 获取角色列表
 * */
export const getRoleList = () => {
    return (request, dispatch) => {
        request({
            method: 'get',
            url: `${host}/rest/sys/role`
        }).then((roles) => {
            if (roles && roles.length > 0) {
                for (let i = 0; i < roles.length; i++) {
                    roles[i].key = roles[i].id;
                }
                dispatch({
                    type: INIT_TRANSFER,
                    roleList: roles
                });
            }
        }).catch((error) => {
            message.error(error.message);
        });
    };
};

/**
 * 获取用户已有角色
 * */
export const getUserRole = (record) => {
    return (request, dispatch) => {
        const params = {};
        params.condition = makeSearchCondition([{key: 'id', value: record.id, type: 'keyword'}]);
        /* get the roles of current user */
        request({
            method: 'get',
            url: `${host}/rest/sys/user/${record.id}`,
            params
        }).then((json) => {
            const roles = [];
            if (json && json.length > 0) {
                for (let i = 0; i < json.length; i++) {
                    roles.push(json[i].roleId);
                }
            }
            dispatch({
                type: CHANGE_TRANSFER,
                selectedRoles: json.roleIds
            });
        }).catch((error) => {
            message.error(error.message);
        });
    };
};

/**
 * 选择其中一个机构
 * */
export const selectOrganization = (id) => {
    return (request, dispatch) => {
        request({
            url: `${host}/rest/sys/org/${id}`,
            method: 'get'
        }).then((json) => {
            const orgName = json.name;
            const orgId = json.id;
            dispatch({
                type: SELECT_NAME,
                orgNames: orgName,
                orgIds: orgId
            });
        }).catch((err) => {
            message.error(err.message);
        });
    };
};

/**
 * 保存新增用户
 * @returns {function(*, *)} thunk
 */
export const addSave = () => {
    return (request, dispatch, getState) => {
        const {pageSize, basicInfo} = getState()[prefix];
        dispatch({type: SAVING_MODAL});
        request({
            method: 'post',
            url: `${host}/rest/sys/user`,
            data: basicInfo
        })
            .then((json) => {
                dispatch({type: SAVED_MODAL});
                dispatch({type: CLOSE_MODAL});
                if (json.ok) {
                    message.success(`${componentName}添加成功!`);
                    /* 重新获取列表 */
                    dispatch(getList({pageSize, pageNumber: 1}));
                } else {
                    message.error('添加失败！原因：' + json.msg);
                }
            }).catch((error) => {
            dispatch({type: SAVED_MODAL});
            dispatch({type: CLOSE_MODAL});
            message.error(error.message);
        });
    };
};

/**
 * 保存编辑用户
 * */
export const editSave = () => {
    return (request, dispatch, getState) => {
        const {pageSize, basicInfo} = getState()[prefix];
        const username = basicInfo.username;
        dispatch({type: SAVING_MODAL});
        request({
            method: 'put',
            url: `${host}/rest/sys/user`,
            data: basicInfo
        }).then(({ok}) => {
            dispatch({type: SAVED_MODAL});
            dispatch({type: CLOSE_MODAL});
            if (ok) {
                dispatch({type: CLOSE_MODAL});
                message.success(`${componentName}:${username}修改成功!`);
                dispatch(getList({pageSize, pageNumber: 1}));
            } else {
                message.error(`${componentName}:${username}修改失败!`);
            }
        }).catch((error) => {
            dispatch({type: SAVED_MODAL});
            dispatch({type: CLOSE_MODAL});
            message.error(error.message);
        });
    };
};

/**
 * 穿梭框改变
 * */
export const transferHandle = createAction(CHANGE_TRANSFER, 'selectedRoles');

/**
 * delete a user by id
 * */
export const deleteRecord = (record) => {
    return deleteListRecord({
        url: `${host}/rest/sys/user/${record.id}`,
        keyOfStore: prefix,
        successAction: getList
    });
};

/**
 * save the data from basicInfo
 * TODO question:'for in' is a implement way that is too complex,let's try to make it easier.
 * */
export const saveBasicInfo = (values) => {
    return {
        type: SAVE_BASICINFO,
        basicInfo: values
    };
};

/**
 * 激活，禁用用户
 * */
export const activate = (key, record) => {
    return (request, dispatch, getState) => {
        const {pageSize} = getState()[prefix];
        const username = record.username;
        const state = key === 'activate' ? '激活' : '禁用';
        if (key === 'activate') {
            record.enabled = true;
        } else {
            record.enabled = false;
        }

        Modal.confirm({
            title: `你确定要${state}此用户吗？`,
            content: `${state}的用户：${record.username}`,
            onOk: () => {
                request({
                    method: 'put',
                    url: `${host}/rest/sys/user`,
                    data: record
                }).then(({ok}) => {
                    if (ok) {
                        dispatch({type: CLOSE_MODAL});
                        message.success(`${componentName}:${username}${state}成功!`);
                        dispatch(getList({pageSize, pageNumber: 1}));
                    } else {
                        message.error(`${componentName}:${username}${state}失败!`);
                    }
                }).catch((error) => {
                    message.error(error.message);
                });
            }
        });


    };
};

/* 改变当前的编辑步骤 */
export const changeStep = (step) => {
    return {
        type: CHANGE_STEP,
        step
    };
};
