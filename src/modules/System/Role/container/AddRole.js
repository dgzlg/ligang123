import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button } from 'antd';

/* action */
import {prefix, addRoleCancel, addRoleSave, testNameUsability} from '../action';

import { statusIndex as nameTestIndex } from '../../../common/formValueTest';
nameTestIndex[2][1] = '名称重复';

const AddRole = ({
    roleAdding, roleSaving, nameTestStatus,
    form: { getFieldDecorator, validateFields }, cancelAdd, save, testName
}) => {
    // 提交表单
    const handleSubmit = () => {
        validateFields((err, values) => {
            if (!err) {
                save(values);
            }
        });
    };
    /* 角色名输入变化时,查询名称可用性 */
    const handleNameChange = (e) => {
        const name = e.target.value;
        testName(name, 'input');
    };
    const handleNameFinished = (e) => {
        const name = e.target.value;
        testName(name, 'finished');
    };
    return (
        <Modal
            title="新增角色"
            visible={roleAdding}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={cancelAdd}
            footer={[
                <Button key="0" type="default" onClick={cancelAdd}>取消</Button>,
                <Button key="1" type="primary" onClick={handleSubmit} disabled={nameTestStatus === 2} loading={roleSaving || nameTestStatus === 3}>保存</Button>
            ]}
        >
            <Form layout="vertical">
                <Form.Item
                    label="名称"
                    hasFeedback
                    validateStatus={nameTestIndex[nameTestStatus][0]}
                    help={nameTestIndex[nameTestStatus][1]}
                >
                    {getFieldDecorator('name', { rules: [{ required: true, message: '名称必填' }] })(
                        <Input type="test" autoComplete="off" onBlur={handleNameFinished} onChange={handleNameChange} />
                    )}
                </Form.Item>
                <Form.Item label="描述">
                    {getFieldDecorator('description', {})(
                        <Input.TextArea autosize={{minRows:3,maxRows:5}}/>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

AddRole.propTypes = {
    form: PropTypes.object,
    roleAdding: PropTypes.bool.isRequired,
    roleSaving: PropTypes.bool.isRequired,
    nameTestStatus: PropTypes.number.isRequired,
    cancelAdd: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    testName: PropTypes.func.isRequired
};

const mapStateToProps = ({[prefix]: {roleAdding, roleSaving, valueTestStatus}}) => {
    return { roleAdding, roleSaving, nameTestStatus: valueTestStatus.name };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancelAdd: () => { dispatch(addRoleCancel()) },
        save: (values) => { dispatch(addRoleSave(values)) },
        testName: (name, inputState) => { dispatch(testNameUsability(name, inputState)) }
    };
};

/* 先用antd的Form包装组件，再用connect(react-redux)把包装过的组件与store(redux)连接起来 */
/* 最后输出的组件由父到子关系为 Connect > Form > AddRole */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Form.create()(AddRole)
);
