import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Select, Modal} from 'antd';
import {prefix, getList, deleteMenu, editMenu, elementVisible} from '../action';
import {createHandleTableChange} from '../../../common/utils/handles';
import InitialCallback from "../../../common/InitialCallback";

const MenuList = ({
    list, listLoading, dispatch,
}) => {
    const handleDelete = (record) => {
        Modal.confirm({
            title: '确定要删除此菜单？',
            content: `删除菜单：${record.name}`,
            onOk: () => dispatch(deleteMenu(record))
        });
    }
    const handleEdit = (record) => {
        dispatch(editMenu(record));
    }
    const handleElement = (record) => {
        dispatch(elementVisible(record));
    }
    const handleOperate = (key, record) => {
        switch (key) {
            case 'delete':
                handleDelete(record);
                break;
            case 'edit':
                handleEdit(record);
                break;
            case 'element':
                handleElement(record);
        }
    };
    const init = () => {
        dispatch(getList());
    }
    const updateList = () => {
        dispatch(getList());
    }
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '编码',
            dataIndex: 'code',
            key: 'code'
        }, {
            title: 'URL',
            dataIndex: 'rmodule',
            key: 'rmodule'
        }, {
            title: '操作',
            key: 'operation',
            width:100,
            render: (_, record, index) => {
                return (
                    <Select key={index} value={'操作'} onChange={(value) => handleOperate(value, record)} style={{width: 100}}>
                        <Select.Option value='edit'>修改</Select.Option>
                        <Select.Option value='element'>资源</Select.Option>
                        <Select.Option value='delete'>删除</Select.Option>
                    </Select>
                );
            }
        }
    ];
    return [
        <InitialCallback key="init" actions={init}/>,
        <Table
            key="content"
            bordered={true}
            dataSource={list}
            columns={columns}
            loading={listLoading}
            pagination={false}
            rowKey={(r) => r.id}
            onChange={createHandleTableChange(updateList)}
        />
    ];
};

MenuList.propTypes = {
    list: PropTypes.array.isRequired,
    listLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({[prefix]: {list, listLoading}}) => {
    return {list, listLoading};
};

export default connect(mapStateToProps)(MenuList);
