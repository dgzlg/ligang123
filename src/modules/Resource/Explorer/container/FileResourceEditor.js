import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Input, Modal, Progress} from "antd";
import {
  prefix, saveFileResource,
  cancelFRE, updateFREValue, updateEditingFile,
} from "../action";
import FileSelector from "./FileSelector";

const {TextArea} = Input;

const mapStateToProps = ({
  [prefix]: {
    fEVisible, fETarget, fEStep, fEStepDescription, fEStepProgress,
    fEName, fEFile, fEDescription,
  }
}) => ({
  fEVisible, fETarget, fEStep, fEStepDescription, fEStepProgress,
  fEName, fEFile, fEDescription,
});

const FileResourceEditor = ({
  dispatch,
  fEVisible, fETarget, fEStep, fEStepDescription, fEStepProgress,
  fEName, fEFile, fEDescription,
}) => {
  return (
    <Modal
      className="modal-resource-edit"
      visible={fEVisible}
      title={`${fETarget === null ? '创建' : '修改'}文件资源`}
      closable={false}
      destroyOnClose={true}
      footer={[
        <Button
          key="cancel"
          type="default"
          htmlType="button"
          disabled={fEStep > 0 && fEStep !== 5}
          onClick={() => {dispatch(cancelFRE())}}
        >取消</Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="button"
          disabled={(fEStep > 0 && fEStep !== 5) || fEFile === null || !fEName}
          style={{marginLeft: 16}}
          onClick={() => dispatch(saveFileResource())}
        >{fEStep === 5 ? '重试' : '保存'}</Button>,
      ]}
    >
      <form className="ant-form ant-form-vertical">
        <div className="ant-row ant-form-item">
          <div className="ant-col ant-form-item-label">
            <label htmlFor="file" className="ant-form-item-required" title="文件">文件</label>
          </div>
          <div className="ant-col ant-form-item-control-wrapper">
            <FileSelector id="file" text={fEFile ? fEFile.name : '选择文件'} handleFileChange={(file) => dispatch(updateEditingFile(file))}/>
          </div>
        </div>
        <div className="ant-row ant-form-item">
          <div className="ant-col ant-form-item-label">
            <label htmlFor="name" className="ant-form-item-required" title="名称">资源名</label>
          </div>
          <div className="ant-col ant-form-item-control-wrapper">
            <Input
              value={fEName}
              id="name"
              onChange={(e) => {dispatch(updateFREValue({fEName: e.currentTarget.value}))}}
            />
          </div>
        </div>
        <div className="ant-row ant-form-item">
          <div className="ant-col ant-form-item-label">
            <label htmlFor="description" title="描述">描述</label>
          </div>
          <div className="ant-col ant-form-item-control-wrapper">
              <TextArea
                id="description"
                rows={3}
                value={fEDescription}
                onChange={(e) => {dispatch(updateFREValue({fEDescription: e.currentTarget.value}))}}
              />
          </div>
        </div>
      </form>
      <div className={`box-step-state${fEStep > 0 ? ' show' : ''}`}>
        <Progress percent={fEStepProgress[0]} successPercent={fEStepProgress[1]} status={fEStep === 5 ? 'exception' : 'normal'}/>
        <div className="description">{fEStepDescription}</div>
      </div>
    </Modal>
  );
};

FileResourceEditor.propTypes = {
  dispatch: PropTypes.func,
  fEVisible: PropTypes.bool.isRequired,
  fETarget: PropTypes.object,
  fEStep: PropTypes.number.isRequired,
  fEStepDescription: PropTypes.string.isRequired,
  fEStepProgress: PropTypes.array.isRequired,
  fEName: PropTypes.string,
  fEFile: PropTypes.object,
  fEDescription: PropTypes.string,
};

export default connect(mapStateToProps)(FileResourceEditor);
