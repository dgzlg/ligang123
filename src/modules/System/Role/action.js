/* global Promise */
import createAction from '../../common/utils/createAction';
import {message} from 'antd';
import {host} from '../../../config/api';
import getFormData from '../../common/utils/getFormData';
import getMenusTree from '../../common/utils/getMenusTree';
import {getList as commonGetList, deleteListRecord} from '../../common/List/list';
import {testValue as testValueUsability} from '../../common/formValueTest';

export const prefix = 'System_Role';
/* action type */
export const MULTIPLE_UPDATE = `${prefix}/multipleUpdate`;
export const ADD_ROLE = `${prefix}/addRole`;
export const ADD_ROLE_CANCEL = `${prefix}/addRoleCancel`;
export const ROLE_SAVING = `${prefix}/roleSaving`;
export const ROLE_SAVED = `${prefix}/roleSaved`;
export const POWER_ROLE = `${prefix}/powerRole`;
export const POWER_ROLE_CANCEL = `${prefix}/powerRoleCancel`;

/**
 * * 获取角色列表
 * @param params 列表请求参数
 */
export const getList = (params) => {
    return commonGetList({
        url: `${host}/rest/sys/role/pager`,
        params,
        keyOfStore: prefix
    });
};

/**
 * 按条件搜索角色
 * @param condition
 * @returns {function(*, *)}
 */
export const searchRole = (condition) => {
    return (request, dispatch) => {
        dispatch(getList({pageNumber: 1, condition: condition}));
    };
};

/**
 * 删除一个角色
 * @param role{object} 角色数据
 */
export const deleteRole = (role) => {
    return deleteListRecord({
        url: `${host}/rest/sys/role/${role.id}`,
        keyOfStore: prefix,
        successAction: getList
    });
};


/**
 * 添加角色
 * 打开模态框，初始化值检测（注意：若未使用值检测，无需初始化）
 * @type {Function}
 */
export const addRole = () => {
    return (request, dispatch, getState) => {
        const {records} = getState()[prefix].list;
        const cachedNames = {usable: [], unusable: records.map(_ => _.name)};
        dispatch({
            type: ADD_ROLE,
            cachedValues: {name: cachedNames},
            valueTestStatus: {name: 0}
        });
    };
};

/**
 * 取消角色添加
 * @type {Function}
 */
export const addRoleCancel = createAction(ADD_ROLE_CANCEL);


/**
 * 查询角色名是否可用（可用时resolve的值为true，反之亦然）
 */
const isNameUsable = (roleName, request) => new Promise((resolve) => {
    request({
        method: 'get',
        url: `${host}/rest/sys/role/exists`,
        params: {name: roleName}
    })
        .then((json) => {
            resolve(!json.exists);
        })
        .catch((err) => {
            /* 错误提示 */
            message.error(err.message);
        });
});

/**
 * 角色名校验
 * @param name
 * @param inputState 输入状态（正在输入时为'input'，输入完成为'finished'）
 */
export const testNameUsability = (name, inputState) => {
    return testValueUsability({
        key: 'name',
        value: name,
        inputState,
        keyOfStore: prefix,
        query: isNameUsable
    });
};

/**
 * 保存新角色
 * @param role{object} 角色数据
 * @returns {function(*, *, *)} thunk
 */
export const addRoleSave = (role) => {
    return (request, dispatch) => {
        /* 更改添加按钮loading */
        dispatch({type: ROLE_SAVING, loading: true});

        /* 请求添加 */
        request({
            method: 'post',
            url: `${host}/rest/sys/role`,
            data: role,
        })
            .then((json) => {
                if (json.ok) {
                    /* 添加成功，更新loading，关闭modal框 */
                    message.success('角色添加成功！');
                    dispatch({type: ROLE_SAVED});
                    /* 重新获取列表 */
                    dispatch(getList({pageNumber: 1}));
                } else {
                    throw Error('添加失败！');
                }
            })
            .catch((err) => {
                /* 错误提示 */
                message.error(err.message);

                /* 更新loading */
                dispatch({type: ROLE_SAVING, loading: false});
            });
    };
};

/**
 * 角色赋权
 * @type {Function}
 */
export const powerRole = (role) => {
    return (request, dispatch) => {
        dispatch({
            type: MULTIPLE_UPDATE,
            powerIng: true,
            operatingRole: role,
            menusLoading: true
        });
        request({
            url: `${host}/rest/sys/role/menu-element-list`,
            method: 'get',
            params: {roleId: role.id}
        })
            .then(({elements, menus, roleElements, roleMenus}) => {
                const menusAll = menus.concat(elements.map(_ => ({..._, nodeType: 'element', parentCode: _.menuId})));
                const menusPower = roleMenus.map(_ => _.menuId).concat(roleElements.map(_ => _.elementId));
                const menusTree = getMenusTree(menusAll, {id: 'code', parentId: 'parentCode'}, '-1');
                dispatch({type: MULTIPLE_UPDATE, menusLoading: false, menusAll, menusPower, menusTree});
            })
            .catch((err) => {
                message.error(err.message);
                dispatch({type: MULTIPLE_UPDATE, powerIng: false, menusLoading: false});
            });
    };
};

/**
 * 取消赋权
 * @type {Function}
 */
export const cancelPowerRole = createAction(POWER_ROLE_CANCEL);

/**
 * 赋权变更
 * @type {Function}
 */
export const powerUpdate = createAction(MULTIPLE_UPDATE, 'menusPower');

/**
 * 保存赋权
 * @returns {function(*, *, *)}
 */
export const savePowerRole = () => {
    return (request, dispatch, getState) => {
        dispatch({type: MULTIPLE_UPDATE, powerSaving: true});
        const {operatingRole, menusAll, menusPower} = getState()[prefix];
        const elementIds = [];
        const menuIds = [];
        const elementsIndex = {};
        menusAll.forEach((menus) => {
            if (menus.nodeType === 'element') {
                elementsIndex[menus.code] = 1;
            }
        });
        menusPower.forEach((code) => {
            if (elementsIndex[code]) {
                elementIds.push(code);
            } else {
                menuIds.push(code);
            }
        });
        request({
            url: `${host}/rest/sys/role/updatePower/${operatingRole.id}`,
            method: 'post',
            data: getFormData({elementIds: elementIds.join(','), menuIds: menuIds.join(',')})
        })
            .then(() => {
                message.success('保存成功');
                dispatch({type: MULTIPLE_UPDATE, operatingRole: null, powerIng: false, powerSaving: false});
            })
            .catch((err) => {
                message.error(err.message);
                dispatch({type: MULTIPLE_UPDATE, powerSaving: false});
            });
    };
};
