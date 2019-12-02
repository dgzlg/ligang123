import {Button, Form, Input, Modal, Spin} from "antd";
import StepBox from "../../../../common/StepBox";
import PropTypes from "prop-types";
import React from "react";
import ParamsForm from "./ParamsForm";

const FormItem = Form.Item;

const stepBarIndex = [
  ['资源', '资源名、描述'],
  ['信息', '接口主要信息'],
  ['参数', '接口参数'],
];

class APIResourceEditor extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.form.validateFields((err) => {
      if (err) {
        return;
      }
      this.props.save();
    });
  }

  render() {
    const {
      target, step, itemIndex, params,
      form: {
        getFieldDecorator,
      },
      updateFormValue, nextStep, prevStep, stepTo, cancelEdit, test,
    } = this.props;

    const footer = [
      <Button key="cancel" htmlType="button" type="default" disabled={step === 3} onClick={cancelEdit}>取消</Button>,
      <Button key="prev" htmlType="button" type="primary" disabled={itemIndex <= 0 || step !== 2} onClick={prevStep}>上一步</Button>,
      <Button key="next" htmlType="button" type="primary" disabled={itemIndex >= 2 || step !== 2} onClick={nextStep}>下一步</Button>,
      <Button key="test" htmlType="button" type="primary" disabled={step !== 2} onClick={test}>测试</Button>,
      <Button key="save" htmlType="button" type="primary" disabled={step !== 2} onClick={this.submit}>保存</Button>,
    ];

    return (
      <Modal
        visible={step !== 0}
        title={`${target === null ? '创建' : '修改'}API资源`}
        width={600}
        closable={step !== 3}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={cancelEdit}
        footer={footer}
      >
        <Spin spinning={step === 1 || step === 3}>
          <Form layout="vertical">
            <StepBox
              handleStepTo={stepTo}
              steps={stepBarIndex}
              currentStep={itemIndex}
            >
              <StepBox.Item>
                <FormItem label="资源名称">
                  {getFieldDecorator('resourceName', {
                    rules: [{required: true, message: '资源名称必填'}]
                  })(<Input />)}
                </FormItem>
                <FormItem label="资源描述">
                  {getFieldDecorator('description')(<Input.TextArea />)}
                </FormItem>
              </StepBox.Item>
              <StepBox.Item>
                <FormItem label="接口名称">
                  {getFieldDecorator('interfaceName', {
                    rules: [{required: true, message: '接口名称必填'}]
                  })(<Input />)}
                </FormItem>
                <FormItem label="地址">
                  {getFieldDecorator('url', {
                    rules: [{required: true, message: 'URL必填'}]
                  })(<Input />)}
                </FormItem>
                <FormItem label="请求方法">
                  {getFieldDecorator('method', {
                    rules: [{required: true, message: 'Method必填'}]
                  })(<Input />)}
                </FormItem>
                <FormItem label="返回值类型">
                  {getFieldDecorator('responseType')(<Input />)}
                </FormItem>
                <FormItem label="前置接口">
                  {getFieldDecorator('preInterface')(<Input />)}
                </FormItem>
              </StepBox.Item>
              <StepBox.Item>
                <ParamsForm params={params} updateParams={(params) => updateFormValue({params})}/>
              </StepBox.Item>
            </StepBox>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

APIResourceEditor.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  stepTo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  test: PropTypes.func.isRequired,
  updateFormValue: PropTypes.func.isRequired,
  target: PropTypes.object,
  params: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  itemIndex: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired,
};

export default APIResourceEditor;
