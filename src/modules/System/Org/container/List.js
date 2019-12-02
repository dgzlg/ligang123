import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Button, Modal} from 'antd';
import {prefix, getList, editOrg, deleteOrg} from '../action';
import {createHandleTableChange} from '../../../common/utils/handles';
import InitialCallback from "../../../common/InitialCallback";

const List = ({
    orgList, listLoading, dispatch,
}) => {
    const init = () => {
        dispatch(getList());
    };
    const updateList = (params) => {
        dispatch(getList(params));
    };
    const handleEdit = (record) => {
        dispatch(editOrg(record));
    };
    const handleDelete = (record) => {
        Modal.confirm({
            title: '确定要删除此机构吗？',
            content: `删除机构：${record.name}`,
            onOk: () => dispatch(deleteOrg(record)),
        });
    };
    const columns = [
        {
            title: '机构名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '机构层级',
            dataIndex: 'level',
            key: 'level'
        }, {
            title: '操作',
            key: 'operation',
            width: 200,
            render: (_, record) => {
                return (
                    <Button.Group size="small">
                        <Button icon="edit" onClick={() => handleEdit(record)}>修改</Button>
                        <Button icon="delete" onClick={() => handleDelete(record)}>删除</Button>
                    </Button.Group>
                );
            }
        }
    ];
    return [
        <InitialCallback key="init" actions={init}/>,
        <Table
            key="content"
            bordered={true}
            dataSource={orgList}
            columns={columns}
            loading={listLoading}
            pagination={false}
            rowKey={(r) => r.id}
            onChange={createHandleTableChange(updateList)}
        />
    ];
};

List.propTypes = {
    orgList: PropTypes.array.isRequired,
    listLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({[prefix]: {orgList, listLoading}}) => {
    return {orgList, listLoading};
};

export default connect(mapStateToProps)(List);
