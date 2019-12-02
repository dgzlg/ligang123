import React from 'react';
import {Modal, Button, Form, Row, Col, Input, Radio, TreeSelect} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {prefix, addMenuSave, Cancel, editMenuSave} from "../action";

const { TreeNode } = TreeSelect;
const MenuEditer = ({
    list, editerVisible, menuSaving, record, editMark, dispatch, form: {getFieldDecorator, setFieldsValue, validateFields}
}) => {
    const {parentCode, name, code, href, icon, rmodule, ricon, display, description} = record;
    const handleCancel = () => {
        dispatch(Cancel());
    }
    const handleSubmit = () => {
        validateFields((err, values) => {
            if (!err) {
                if (editMark === 'add') {
                    dispatch(addMenuSave(values));
                }
                if (editMark === 'edit') {
                    dispatch(editMenuSave(values, record));
                }
            }
        });
    };
    const searchChildren = (value, data) => {
        const childData = [];
        data.forEach((item) => {
            if (value === item.code) {
                if (item.hasOwnProperty('children')) {
                    item.children.map(item => {
                        childData.push(item);
                    });
                }
            } else {
                if (item.hasOwnProperty('children')) {
                    searchChildren(value, item.children);
                }
            }
        });
        return childData;
    }
    const handleOnChange = (value) => {
        //是父级菜单
        if (value === -1) {
            const allCodeNum = list.map(item => Number(item.code.substring(3)));
            let maxNum = allCodeNum[0];
            allCodeNum.map(item => {
                if(maxNum < item) {
                    maxNum = item;
                }
            });
            let newMaxNum = maxNum + 1;
            if (newMaxNum.toString().length === 1) {
                setFieldsValue({code: `sys0${newMaxNum}`});
            } else {
                setFieldsValue({code: `sys${newMaxNum}`});
            }
        } else { //不是父级菜单
            const childList = searchChildren(value, list);
            if (childList.length > 0) {
                const allCodeNum = childList.map(item => Number(item.code.substring(value.length)));
                let maxNum = allCodeNum[0];
                allCodeNum.map(item => {
                    if(maxNum < item) {
                        maxNum = item;
                    }
                });
                let newMaxNum = maxNum + 1;
                if (newMaxNum.toString().length === 1) {
                    setFieldsValue({code: `${value}0${newMaxNum}`});
                } else {
                    setFieldsValue({code: `${value}${newMaxNum}`});
                }
            } else {
                setFieldsValue({code: `${value}01`});
            }
        }
    }
    let title = '';
    if (editMark === 'add') {
        title = '新增菜单';
    }
    if (editMark === 'edit') {
        title = '修改菜单';
    }
    const renderTreeNode = (treeData) => {
        return treeData.map((item) => {
            if (item.hasOwnProperty('children') && item.children.length > 0) {
                return (
                    <TreeNode title={item.name} key={item.code} value={item.code}>
                        {renderTreeNode(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.code} value={item.code}/>;
        });
    }
    return (
        <Modal
            title={title}
            visible={editerVisible}
            maskClosable={false}
            onCancel={handleCancel}
            footer={[
                <Button key='0' type='default' onClick={handleCancel}>取消</Button>,
                <Button key='1' type='primary' onClick={handleSubmit} loading={menuSaving}>保存</Button>
            ]}
        >
            {editerVisible ?
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='父级菜单'>
                                {getFieldDecorator('parentCode',
                                    {initialValue: parentCode, rules: [{required: true, message: '父级菜单必填'}]})(
                                    <TreeSelect
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        onChange={handleOnChange}
                                        treeDefaultExpandedKeys={['parent']}
                                    >
                                        <TreeNode value={-1} title="父级菜单" key="parent">
                                            {list.length > 0 ? renderTreeNode(list) : ''}
                                        </TreeNode>
                                    </TreeSelect>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='菜单名称'>
                                {getFieldDecorator('name', {
                                    initialValue: name,
                                    rules: [{required: true, message: '菜单名称必填'}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='编码'>
                                {getFieldDecorator('code', {
                                    initialValue: code,
                                    rules: [{required: true, message: '编码必填'}]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='图标'>
                                {getFieldDecorator('icon', {
                                    initialValue: icon,
                                    rules: [{required: false, message: ''}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='R图标'>
                                {getFieldDecorator('ricon', {
                                    initialValue: ricon,
                                    rules: [{required: false, message: ''}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='URL'>
                                {getFieldDecorator('href', {
                                    initialValue: href,
                                    rules: [{required: false, message: ''}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='模块URL'>
                                {getFieldDecorator('rmodule', {
                                    initialValue: rmodule,
                                    rules: [{required: false, message: ''}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='是否展示'>
                                {getFieldDecorator('display', {
                                    initialValue: display || true,
                                    rules: [{required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label='描述'>
                        {getFieldDecorator('description', {
                            initialValue: description,
                            rules: [{required: false, message: ''}]
                        })(
                            <Input.TextArea autosize={{minRows:3,maxRows:5}}/>
                        )}
                    </Form.Item>
                </Form>
                : ''
            }
        </Modal>
    );
};

MenuEditer.propTypes = {
    form: PropTypes.object,
    list: PropTypes.array.isRequired,
    menuSaving: PropTypes.bool.isRequired,
    editerVisible: PropTypes.bool.isRequired,
    record: PropTypes.object.isRequired,
    editMark: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({[prefix]: {list, editerVisible, record, menuSaving, editMark}}) => {
    return {list, editerVisible, record, menuSaving, editMark};
};

export default connect(mapStateToProps)(Form.create()(MenuEditer));
