import {Message} from "antd";
import createAction from "../../common/utils/createAction";
import {host} from "../../../config/api";
import {singleCondition} from '../../common/utils/createConditions';
import {toHexString} from "../../common/Search/tools";
import getMenusTree from "../../common/utils/getMenusTree";


export const prefix = 'System_Menu';
/*action Type*/
export const UPDATE_LIST = `${prefix}/updateList`;
export const LIST_LOADING = `${prefix}/listLoading`;
export const LIST_LOADED = `${prefix}/listLoaded`;
export const ADD_MENU = `${prefix}/addMenu`;
export const CANCEL = `${prefix}/addMenuCancel`;
export const MENU_SAVING = `${prefix}/menuSaving`;
export const MENU_SAVED = `${prefix}/menuSaved`;
export const EDIT_MENU = `${prefix}/editMenu`;
export const LIST_ELEMENT = `${prefix}/elementLoading`;
export const UPDATE_ELEMENT_LIST = `${prefix}/updateElementList`;
export const ADD_ELEMENT = `${prefix}/addElement`;
export const ELEMENT_SAVING = `${prefix}/elementSaving`;
export const ELEMENT_SAVED = `${prefix}/elementSaved`;
export const ADD_ELEMENT_CANCEL = `${prefix}/addElementCancel`;
export const EDIT_ELEMENT = `${prefix}/editElement`;

/**
 * 获取菜单列表
 * @param params
 * @returns {Function}
 */
export const getList = (data = {}) => {
    const params = {
        parentId: -1,
        order: 'code'
    };
    return (request, dispatch, getState) => {
        let { order: defaultOrder} = getState().System_Menu.list;
        /* 排序 */
        const queryParams = {};
        queryParams.order = data.order || defaultOrder;

        dispatch({type: LIST_LOADING});
        request({
            method: 'GET',
            url: `${host}/rest/sys/user/menus`,
            params
        }).then((data) => {
            const dataTree = getMenusTree(data, {id: 'code', parentId: 'parentCode'}, '-1');
            dispatch({
                type: UPDATE_LIST,
                list: dataTree,
                order: queryParams.order
            });
        }).catch((err) => {
            Message.error(err.message);
            dispatch({type: LIST_LOADED});
        });
    };
};

/**
 * 查询菜单列表
 * @param value
 * @returns {Function}
 */
export const searchMenu = (value) => {
    return ((request, dispatch) => {
        const conditions = singleCondition(['name', '~']);
        const params = {conditions: conditions};
        request({method: 'GET', url: `${host}/rest/sys/user/menus`, params})
            .then((data) => {
                if (value === ""||value===undefined) {
                    const dataTree = getMenusTree(data, {id: 'code', parentId: 'parentCode'}, '-1');
                    dispatch({type: UPDATE_LIST, list: dataTree});
                } else {
                    let temp = [];
                    data.forEach((item) => {
                        if (item.name.indexOf(value) >= 0) {
                            temp.push(item);
                        }
                    });
                    dispatch({type: UPDATE_LIST, list: temp});
                }
            }).catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED});
        });

    });
};

/**
 * 添加菜单
 */
export const addMenu = createAction(ADD_MENU);


/**
 * 取消添加和编辑菜单、资源列表
 * @type {Function}
 */
export const Cancel = createAction(CANCEL);
export const addElementCancel = createAction(ADD_ELEMENT_CANCEL);

/**
 * 添加提交数据保存
 * @param menu
 * @returns {Function}
 */
export const addMenuSave = (menu) => {
    return (request, dispatch) => {
        dispatch({type: MENU_SAVING, loading: true});
        request({method: 'POST', url: `${host}/rest/sys/menu`, data: menu})
            .then((json) => {
                if (json.ok) {
                    Message.success('新增成功!');
                    dispatch({type: MENU_SAVED});
                    dispatch(getList());
                } else {
                    throw Error('新增失败!');
                }

            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED, loading: false});
            });
    };
};

/**
 * 修改菜单
 * @type {Function}
 */
export const editMenu = createAction(EDIT_MENU, 'record');

/**
 * 编辑数据提交
 * @param menu
 * @returns {Function}
 */
export const editMenuSave = (menu, record) => {
    return ((request, dispatch) => {
        menu.id = record.id;
        dispatch({type: MENU_SAVING, loading: true});
        request({method: 'PUT', url: `${host}/rest/sys/menu`, data: menu})
            .then((json) => {
                if (json.ok) {
                    Message.success('修改成功!');
                    dispatch({type: MENU_SAVED});
                    dispatch(getList({}));
                } else {
                    throw Error('修改失败!');
                }
            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED, loading: false});
            });
    });
};

/**
 * 删除菜单
 * @param record
 * @returns {Function}
 */
export const deleteMenu = (record) => {
    return ((request, dispatch) => {
        dispatch({type: LIST_LOADING});
        request({method: 'DELETE', url: `${host}/rest/sys/menu/${record.id}`})
            .then((json) => {
                if (json.ok) {
                    Message.success('删除成功!');
                    dispatch(getList({}));
                } else {
                    throw Error('删除失败!');
                }
            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    });
};

/**
 * 选择资源展示菜单对应的资源列表
 * @param record
 * @returns {Function}
 */
export const elementVisible = (record) => {
    const condition = 'menuId='+record.code;
    const params = {condition: toHexString(condition)};
    return ((request, dispatch) => {
        dispatch({type: LIST_ELEMENT, record: record});
        request({method: 'GET', url: `${host}/rest/sys/element/pager`, params})
            .then((data) => {
                dispatch({
                    type: UPDATE_ELEMENT_LIST,
                    elementList: data.rows,
                    total: data.total,
                    pageNumber: data.pageNumber
                });
            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    });
};

/**
 * 添加资源
 * @type {Function}
 */
export const addElement = createAction(ADD_ELEMENT, 'record');
/**
 * 修改资源
 * @type {Function}
 */
export const editElement = createAction(EDIT_ELEMENT, 'editRecord');

/**
 * 保存添加资源
 * @param values
 * @param record
 * @returns {Function}
 */
export const addElementSave = (values, record) => {
    return ((request, dispatch) => {
        values.menuId = record.code;
        dispatch({type: ELEMENT_SAVING, loading: true});
        request({method: 'POST', url: `${host}/rest/sys/element`, data: values})
            .then((json) => {
                if (json.ok) {
                    Message.success('新增成功!');
                    dispatch({type: ELEMENT_SAVED});
                    dispatch(elementVisible(record));
                } else {
                    throw Error('新增失败!');
                }
            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    });
};

/**
 * 保存修改资源
 * @param values
 * @param editRecord
 * @returns {Function}
 */
export const editElementSave = (values, editRecord, menuRecord) => {
    return ((request, dispatch) => {
        values.id = editRecord.id;
        values.menuId = menuRecord.code;
        dispatch({type: ELEMENT_SAVING, loading: true});
        request({method: 'PUT', url: `${host}/rest/sys/element`, data: values})
            .then((json) => {
                if (json.ok) {
                    Message.success('修改成功!');
                    dispatch({type: ELEMENT_SAVED});
                    dispatch(elementVisible(menuRecord));
                } else {
                    throw Error('修改失败!');
                }
            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    });
};
/**
 * 删除资源
 * @param editRecord
 * @param record
 * @returns {Function}
 */
export const delElement = (editRecord, record) => {
    return ((request, dispatch) => {
        dispatch({type: LIST_LOADING});
        request({method: 'DELETE', url: `${host}/rest/sys/element/${editRecord.id}`})
            .then((json) => {
                if (json.ok) {
                    Message.success('删除成功!');
                    dispatch(elementVisible(record));
                } else {
                    throw Error('删除失败!');
                }
            })
            .catch((err) => {
                Message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    });
};

