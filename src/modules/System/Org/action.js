import {message} from "antd";
import {host} from "../../../config/api";
import getMenusTree from "../../common/utils/getMenusTree";
import {singleCondition} from "../../common/utils/createConditions";


export const prefix = 'System_Org';
export const ORG_LIST = `${prefix}/orgList`;
export const LIST_LOADING = `${prefix}/listLoading`;
export const LIST_LOADED = `${prefix}/listLoaded`;
export const ADD_BOX_VISIBLE = `${prefix}/addBoxVisible`;
export const EDIT_BOX_VISIBLE = `${prefix}/editBoxVisible`;
export const CANCEL_SAVE = `${prefix}/cancelSave`;
export const SAVE_LOADING = `${prefix}/saveLoading`;
export const SAVE_LOADED = `${prefix}/saveLoaded`;

export const getList = (data = {}) => {
    const params = {
        parentId: -1,
        order: 'name'
    };
    return (request, dispatch, getState) => {
        let { order: defaultOrder} = getState().System_Org.orgList;
        /* 排序 */
        const queryParams = {};
        queryParams.order = data.order || defaultOrder;

        dispatch({type: LIST_LOADING});
        request({
            method: 'GET',
            url: `${host}/rest/sys/org`,
            params
        }).then((data) => {
            const dataTree = getMenusTree(data, {id: 'id', parentId: 'parentId'}, '-1');
            dispatch({
                type: ORG_LIST,
                orgList: dataTree,
                order: queryParams.order
            });
            dispatch({type: LIST_LOADED});
        }).catch((err) => {
            message.error(err.message);
            dispatch({type: LIST_LOADED});
        });
    };
};

export const searchOrg = (value) => {
    return ((request, dispatch) => {
        const conditions = singleCondition(['name', '~']);
        const params = {conditions: conditions};
        request({method: 'GET', url: `${host}/rest/sys/org`, params})
            .then((data) => {
                if (value === ""||value===undefined) {
                    const dataTree = getMenusTree(data, {id: 'id', parentId: 'parentId'}, '-1');
                    dispatch({type: ORG_LIST, orgList: dataTree});
                } else {
                    let temp = [];
                    data.forEach((item) => {
                        if (item.name.indexOf(value) >= 0) {
                            temp.push(item);
                        }
                    });
                    dispatch({type: ORG_LIST, orgList: temp});
                }
            }).catch((err) => {
            message.error(err.message);
            dispatch({type: LIST_LOADED});
        });

    });
}

export const addOrg = () => {
    return(request, dispatch) => {
        dispatch({
            type: ADD_BOX_VISIBLE,
            modalVisible: true,
            isAdd: true,
        });
    };
};

export const editOrg = (record) => {
    return(request, dispatch) => {
        dispatch({
            type: EDIT_BOX_VISIBLE,
            modalVisible: true,
            currentRecord: record,
            isAdd: false,
        });

    };
};
export const handleCancelSave = () => {
    return(request, dispatch) => {
        dispatch({
            type: CANCEL_SAVE,
            modalVisible: false,
            saveLoading: false,
            currentRecord: {},
            parentRecord: {},
            isAdd: false,
        });
    };
};

export const handleAddSave = (values) => {
    return (request, dispatch) => {
        dispatch({type: SAVE_LOADING});
        request({
            method: 'post',
            url: `${host}/rest/sys/org`,
            data: values,
        })
            .then((json) => {
                if (json.ok) {
                    message.success('机构新增成功！');
                    dispatch(handleCancelSave());
                    dispatch(getList());
                } else {
                    throw Error('新增失败！');
                }
            })
            .catch((err) => {
                message.error(err.message);
                dispatch({type: SAVE_LOADED});
            });
    };

};
export const handleEditSave = (values) => {
    return (request, dispatch, getState) => {
        let { currentRecord } = getState().System_Org;
        values.id = currentRecord.id;
        dispatch({type: SAVE_LOADING});
        request({
            method: 'put',
            url: `${host}/rest/sys/org`,
            data: values,
        })
            .then((json) => {
                if (json.ok) {
                    message.success('机构修改成功！');
                    dispatch(handleCancelSave());
                    dispatch(getList());
                } else {
                    throw Error('修改失败！');
                }
            })
            .catch((err) => {
                message.error(err.message);
                dispatch({type: SAVE_LOADED});
            });
    };

};
export const deleteOrg = (record) => {
    return ((request, dispatch) => {
        dispatch({type: LIST_LOADING});
        request({method: 'DELETE', url: `${host}/rest/sys/org/${record.id}`})
            .then((json) => {
                if (json.ok) {
                    message.success('删除成功!');
                    dispatch(getList());
                } else {
                    throw Error('删除失败!');
                }
            })
            .catch((err) => {
                message.error(err.message);
                dispatch({type: LIST_LOADED});
            });
    });
};
