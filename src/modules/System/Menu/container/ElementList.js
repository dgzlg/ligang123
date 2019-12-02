import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Select,Modal} from 'antd';
import {prefix, editElement, delElement} from "../action";

const ElementList = ({elementList, record, dispatch}) => {
    const handleEditElement = (editRecord) => {
        dispatch(editElement(editRecord));
    };
    const handleDeleteElement = (editRecord, record) => {
        Modal.confirm({
            title:'确定要删除此资源吗？',
            content:`删除资源：${editRecord.name}`,
            onOk:()=>dispatch(delElement(editRecord,record))
        });
    }
    const handleOperate = (key, editRecord) => {
        switch (key) {
            case 'edit':
                return handleEditElement(editRecord);
            case 'delete':
                return handleDeleteElement(editRecord,record);
        }
    };
    const columns = [
        {
            title: '资源名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '资源编码',
            dataIndex: 'code',
            key: 'code'
        }, {
            title: '资源路径',
            dataIndex: 'uri',
            key: 'uri'
        }, {
            title: 'method',
            dataIndex: 'method',
            key: 'method'
        }, {
            title: '操作',
            key: 'operation',
            width:200,
            render: (_, record, index) => {
                return (
                    <Select key={index} value={'操作'} onChange={(value) => handleOperate(value, record)}>
                        <Select.Option value='edit'>编辑</Select.Option>
                        <Select.Option value='delete'>删除</Select.Option>
                    </Select>
                );
            }
        },
    ];
    return (
        <Table
            bordered={true}
            columns={columns}
            dataSource={elementList}
            pagination={false}
            rowKey={(r) => r.id}
        />
    );
};

ElementList.propTypes = {
    elementList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    record:PropTypes.object.isRequired,
};

const mapStateToProps = ({[prefix]: {elementList,record}}) => {
    return {elementList,record};
};

export default connect(mapStateToProps)(ElementList);
