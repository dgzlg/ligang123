import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, InputNumber, TreeSelect } from 'antd';
import {prefix, handleCancelSave, handleAddSave, handleEditSave} from '../action';

const { TreeNode } = TreeSelect;
const Edit = ({
    orgList, currentRecord, isAdd, modalVisible, saveLoading,
    dispatch, form: { getFieldDecorator, validateFields }
}) => {
    const { parentId, name, orderNo } = currentRecord
    const cancelSave = () => {
        dispatch(handleCancelSave());
    }
    const handleSubmit = () => {
        validateFields((err, values) => {
            if (!err) {
                if (isAdd) {
                    dispatch(handleAddSave(values));
                } else {
                    dispatch(handleEditSave(values));
                }
            }
        });
    };
    const renderTreeNode = (treeData) => {
        return treeData.map((item) => {
            if (item.hasOwnProperty('children') && item.children.length > 0) {
                return (
                    <TreeNode title={item.name} key={item.id} value={item.id}>
                        {renderTreeNode(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} value={item.id}/>;
        });
    }
    return (
        <Modal
            title={isAdd ? '新增机构' : '修改机构'}
            visible={modalVisible}
            maskClosable={false}
            onCancel={cancelSave}
            destroyOnClose
            footer={[
                <Button key="0" type="default" onClick={cancelSave}>取消</Button>,
                <Button key="1" type="primary" onClick={handleSubmit} loading={saveLoading}>保存</Button>
            ]}
        >
            <Form layout="vertical">
                <Form.Item label='父级菜单'>
                    {getFieldDecorator('parentId',
                        {initialValue: parentId, rules: [{required: true, message: '父级机构必填'}]})(
                        <TreeSelect
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                            allowClear
                            treeDefaultExpandedKeys={orgList.length > 0 ? [orgList[0].id] : []}
                        >
                            {orgList.length > 0 ? renderTreeNode(orgList) : ''}
                        </TreeSelect>
                    )}
                </Form.Item>
                <Form.Item label="机构名称">
                    {getFieldDecorator('name',
                        { initialValue: name, rules: [{required: true, message: '机构名称必填'}]})(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="排序">
                    {getFieldDecorator('orderNo',
                        {initialValue: orderNo})(
                        <InputNumber />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

Edit.propTypes = {
    orgList: PropTypes.array.isRequired,
    currentRecord: PropTypes.object.isRequired,
    isAdd: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    saveLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object,
};

const mapStateToProps = ({[prefix]: { orgList, currentRecord, isAdd, modalVisible, saveLoading }}) => {
    return { orgList, currentRecord, isAdd, modalVisible, saveLoading };
};

export default connect(mapStateToProps)(Form.create()(Edit));
