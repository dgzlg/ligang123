import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Form, Input, Button, Radio, Transfer, message, Row, Col, TreeSelect} from 'antd';
import StepBox from '../../../../modules/common/StepBox';
import './index.less';

/* action */
import {
    prefix, closeModal, addSave, editSave, transferHandle, saveBasicInfo, changeStep, selectOrganization
} from '../action';

const RadioGroup = Radio.Group;
const {TextArea} = Input;
const TreeNode = TreeSelect.TreeNode;

/**
 * 根据数组数据生成节点树
 * @param {array} data - 树数组
 * @return {array|undefined}
 */
const createTreeNode = (data) => {
    if (!data) {
        return;
    }
    if (typeof data === 'object' && data.constructor === Array) {
        const childNodes = [];
        for (let i = 0, l = data.length; i < l; i++) {
            childNodes.push(createTreeNode(data[i]));
        }
        return childNodes;
    }
    return (
        <TreeNode value={`${data.id}`} title={data.name} key={data.id}>
            {createTreeNode(data.children)}
        </TreeNode>
    );
};

const stepsData = [
    ['基本信息', '填写用户基础信息'],
    ['角色分配', '给用户分配角色']
];

const Editer = ({
                    visible, saving, currentStep, roleList, orgNames, orgIds, orgRecords,
                    searchOrganization, selectedRoles, help, formTitle, fields, state,
                    saveDisabled, closeSave, addSave, editSave, transferChange, saveBasicInfo, stepTo,
                    form: {getFieldDecorator, validateFields, getFieldValue,}
                }) => {
    const filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    };
    const {id, orgName, orgId, username, email, enabled, description} = fields;
    const saveHandle = () => {
        validateFields((err, values) => {
            if (!err) {
                //填充空属性
                let basicInfo = {
                    id: id || '',
                    orgId: orgIds || orgId,
                    orgName: orgNames,
                    username: '',
                    email: '',
                    password: '',
                    rePassword: '',
                    enabled: false,
                    description: '',
                    roleIds: selectedRoles
                };

                for (let key in values) {
                    if (values[key]) {
                        basicInfo[key] = values[key];
                    }
                }
                saveBasicInfo(basicInfo);

                switch (state) {
                    case 'add':
                        addSave();
                        break;
                    case 'edit':
                        editSave();
                        break;
                    case 'allocate':
                        editSave();
                        break;
                    default :
                        message.error('非法参数，请检查代码！');
                }
            }
        });
    };
    const compareToPassword = (rule, value, callback) => {
        if (value && value !== getFieldValue('password')) {
            callback('两遍密码不一致!');
        } else {
            callback();
        }
    };

    const compareToRePassword = (rule, value, callback) => {
        if (value && getFieldValue('rePassword')) {
            validateFields(['rePassword'], {force: true});
        }
        callback();
    };
    /* 只要不是添加功能，该禁用的都要禁用 */
    let isDisabled = (state !== 'add') ? true : false;
    /* 模态框底部操作按钮 */
    const footer = [
        <Button key="cancel" htmlType="button" type="default" onClick={closeSave}>取消</Button>
    ];
    if (currentStep > 0) {
        footer.push(
            <Button key="next" htmlType="button" type="primary" onClick={() => {
                stepTo(currentStep - 1);
            }}>上一步</Button>
        );
    }
    if (currentStep < stepsData.length - 1) {
        footer.push(
            <Button key="pre" htmlType="button" type="primary" onClick={() => {
                stepTo(currentStep + 1);
            }}>下一步</Button>
        );
    }
    footer.push(
        <Button key="save" htmlType="button" disabled={saveDisabled} type="primary" onClick={saveHandle}
                loading={saving}>保存</Button>
    );
    return (
        <Modal
            title={formTitle}
            visible={visible}
            width={732}
            maskClosable={false}
            onCancel={closeSave}
            footer={footer}
            destroyOnClose={true}
        >
            <Form layout="vertical">
                <StepBox currentStep={currentStep} handleStepTo={stepTo} steps={stepsData}>
                    <StepBox.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                {state == 'add' ?
                                    <div>
                                        <Form.Item label='机构名'>
                                            {getFieldDecorator('parentCode',
                                                {initialValue: orgNames, rules: [{required: true, message: '机构名必填'}]})(
                                                < TreeSelect
                                                    className={'top-position'}
                                                    loading={true}
                                                    style={{width: 230}}
                                                    dropdownStyle={{maxHeight: 200, overflow: 'auto'}}
                                                    treeDefaultExpandAll
                                                    onChange={searchOrganization}
                                                >
                                                    {createTreeNode(orgRecords)}
                                                </TreeSelect>
                                            )}
                                        </Form.Item>

                                    </div>
                                    :
                                    <Form.Item label="机构名">
                                        {getFieldDecorator('orgName', {rules: [{required: true, message: '密码必填！'}], initialValue: orgName})(
                                            <Input disabled={isDisabled}/>
                                        )}
                                    </Form.Item>
                                }
                            </Col>
                            <Col span={12}>
                                <Form.Item label="用户名" help={help}>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: '用户名必填！'}],
                                        initialValue: username
                                    })(
                                        <Input disabled={isDisabled}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {rules: [{required: true, message: '密码必填！'},{validator: compareToRePassword}]})(
                                        <Input type='password'/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="确认密码">
                                    {getFieldDecorator('rePassword', {rules: [{required: true, message: '请确认密码！'},{validator: compareToPassword}]})(
                                        <Input type='password'/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="邮箱">
                                    {getFieldDecorator('email', {initialValue: email})(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="状态">
                                    {getFieldDecorator('enabled', {initialValue: enabled || false})(
                                        <RadioGroup>
                                            <Radio value={true}>激活</Radio>
                                            <Radio value={false}>未激活</Radio>
                                        </RadioGroup>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="描述">
                            {getFieldDecorator('description', {initialValue: description})(
                                <TextArea autosize={{minRows: 3, maxRows: 5}}/>
                            )}
                        </Form.Item>
                    </StepBox.Item>
                    <StepBox.Item>
                        <Transfer
                            listStyle={{
                                width: 212,
                                height: 212,
                            }}
                            dataSource={roleList}
                            filterOption={filterOption}
                            targetKeys={selectedRoles}
                            onChange={transferChange}
                            render={record => record.name}
                        />
                    </StepBox.Item>
                </StepBox>
            </Form>
        </Modal>
    );
};

Editer.propTypes = {
    visible: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    currentStep: PropTypes.number.isRequired,
    roleList: PropTypes.array,
    selectedRoles: PropTypes.array,
    existed: PropTypes.string,
    help: PropTypes.string,
    orgNames: PropTypes.string.isRequired,
    orgIds: PropTypes.string.isRequired,
    orgRecords: PropTypes.array,
    orgListLoading: PropTypes.bool.isRequired,
    formTitle: PropTypes.string.isRequired,
    activeKey: PropTypes.string,
    fields: PropTypes.object,
    state: PropTypes.string.isRequired,
    saveDisabled: PropTypes.bool.isRequired,
    closeSave: PropTypes.func.isRequired,
    searchOrganization: PropTypes.func.isRequired,
    addSave: PropTypes.func.isRequired,
    editSave: PropTypes.func.isRequired,
    transferChange: PropTypes.func.isRequired,
    saveBasicInfo: PropTypes.func.isRequired,
    stepTo: PropTypes.func.isRequired,
    form: PropTypes.object,

};

const mapStateToProps = ({
                             [prefix]: {
                                 visible, saving, currentStep, roleList, orgNames, orgIds,
                                 orgRecords, orgListLoading, selectedRoles, existed, help, formTitle, fields, state,
                                 saveDisabled
                             }
                         }) => {
    return {
        visible,
        saving,
        currentStep,
        roleList,
        orgNames,
        orgIds,
        orgRecords,
        orgListLoading,
        selectedRoles,
        formTitle,
        fields,
        state,
        existed,
        help,
        saveDisabled

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeSave: () => {
            dispatch(closeModal());
        },
        addSave: () => dispatch(addSave()),
        searchOrganization: (id) => dispatch(selectOrganization(id)),
        editSave: (key) => {
            dispatch(editSave(key));
        },
        transferChange: (targetKeys) => {
            dispatch(transferHandle(targetKeys));
        },
        saveBasicInfo: (values) => {
            dispatch(saveBasicInfo(values));
        },
        stepTo: (index) => {
            dispatch(changeStep(index));
        }
    };
};

/* 先用antd的Form包装组件，再用connect(react-redux)把包装过的组件与store(redux)连接起来 */
/* 最后输出的组件由父到子关系为 Connect > Form > Add */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    Form.create()(Editer)
);
