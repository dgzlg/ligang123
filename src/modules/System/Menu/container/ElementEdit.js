import React from 'react';
import {Modal, Button, Form, Row, Col, Input, Select} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {prefix, addElementCancel, addElementSave, editElementSave} from "../action";

const ElementEdit = ({
    editElementVisible, editEleMark, record, editRecord, elementSaving,
    dispatch, form: {getFieldDecorator, validateFields}
}) => {
    const {name, code, description, uri, method, type} = editRecord;
    const handleCancel = () => {
        dispatch(addElementCancel());
    }
    const handleSubmit = () => {
        if (editEleMark === 'add') {
            validateFields((err, values) => {
                if (!err) {
                    dispatch(addElementSave(values, record));
                }
            });
        }
        if (editEleMark === 'edit') {
            validateFields((err, values) => {
                if (!err) {
                    dispatch(editElementSave(values, editRecord, record));
                }
            });
        }
    };
    let title = '';
    if (editEleMark === 'add') {
        title = '新增资源';
    }
    if (editEleMark === 'edit') {
        title = '修改资源';
    }
    return (
        <Modal
            title={title}
            visible={editElementVisible}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button key='0' type='default' onClick={handleCancel}>取消</Button>,
                <Button key='1' type='primary' onClick={handleSubmit} loading={elementSaving}>保存</Button>
            ]}
        >
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label='名称'>
                            {getFieldDecorator('name',
                                {initialValue: name, rules: [{required: true, message: '名称必填'}]})(
                                <Input/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='编码'>
                            {getFieldDecorator('code',
                                {initialValue: code, rules: [{required: true, message: '菜单名称必填'}]})(
                                <Input/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row guter={16}>
                    <Form.Item label='URI'>
                        {getFieldDecorator('uri',
                            {initialValue: uri, rules: [{required: true, message: 'uri必填'}]})(
                            <Input/>
                        )}
                    </Form.Item>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label='方法'>
                            {getFieldDecorator('method',
                                {initialValue: method, rules: [{required: true, message: '方法类型必填'}]})(
                                <Select placeholder='先择方法类型'>
                                    <Select.Option value='get'>get</Select.Option>
                                    <Select.Option value='put'>put</Select.Option>
                                    <Select.Option value='post'>post</Select.Option>
                                    <Select.Option value='delete'>delete</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='类型'>
                            {getFieldDecorator('type',
                                {initialValue: type, rules: [{required: true, message: '类型必填'}]})(
                                <Select placeholder='选择资源类型'>
                                    <Select.Option value='button'>按钮</Select.Option>
                                    <Select.Option value='link'>连接</Select.Option>
                                    <Select.Option value='service'>服务</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='描述'>
                    {getFieldDecorator('description',
                        {initialValue: description, rules: [{required: false}]})(
                        <Input.TextArea autosize={{minRows:3,maxRows:5}}/>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

ElementEdit.propTypes = {
    editElementVisible: PropTypes.bool.isRequired,
    cancel: PropTypes.func.isRequired,
    elementSaving: PropTypes.bool.isRequired,
    elementSave: PropTypes.func.isRequired,
    form: PropTypes.object,
    record: PropTypes.object.isRequired,
    elementEdit: PropTypes.func.isRequired,
    editRecord: PropTypes.object.isRequired,
    editEleMark: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({[prefix]: {editElementVisible, elementSaving, record, elementEdit, editRecord, editEleMark}}) => {
    return {editElementVisible, elementSaving, record, elementEdit, editRecord, editEleMark};
};

export default connect(mapStateToProps)(Form.create()(ElementEdit));

