import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Input, Button} from 'antd';
/* action */
import {searchDemand, createDemand, updateFormValue, cancelDemandEdit, saveDemandEdit, prefix} from '../action';
import Search from "../../../common/Search/Container";

const TextArea = Input.TextArea;

const editIndex = {
  0: '创建新的',
  1: '修改',
};

const mapStateToProps = (
  {
    [prefix]: {demandModalVisible, demandEditModal, demandTitle, demandDescription, demandPublishLoading},
  }
) => ({demandModalVisible, demandEditModal, demandTitle, demandDescription, demandPublishLoading});

const Operation = (
  {dispatch, demandModalVisible, demandEditModal, demandTitle, demandDescription, demandPublishLoading}
) => {
  return (
    <div className="operation-container">
      <Search
        enhancedSearch={true}
        optionsIndex={[{title: '发布机构', type: 'keyword', key: 'orgName', value: ''}]}
        defaultSearchOptions={[{title: '发布机构', type: 'keyword', key: 'orgName', value: ''}]}
        onSearch={(value) => dispatch(searchDemand(value))}
      />
      <Button type="primary" onClick={() => dispatch(createDemand())}>发布需求</Button>
      <Modal
        visible={demandModalVisible}
        title={`${editIndex[demandEditModal]}需求`}
        closable={false}
        footer={[
          <Button key="cancel" type="default" htmlType="button" disabled={demandPublishLoading} onClick={() => {
            dispatch(cancelDemandEdit());
          }}>取消</Button>,
          <Button key="submit" type="primary" htmlType="button" loading={demandPublishLoading} style={{marginLeft: 16}}
                  onClick={() => dispatch(saveDemandEdit())}>保存</Button>,
        ]}
      >
        <form className="ant-form ant-form-vertical">
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-form-item-label">
              <label htmlFor="name" className="ant-form-item-required" title="资源名">需求标题</label>
            </div>
            <div className="ant-col ant-form-item-control-wrapper">
              <Input
                value={demandTitle}
                id="name"
                onChange={(e) => {
                  dispatch(updateFormValue({demandTitle: e.currentTarget.value}));
                }}
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
                value={demandDescription}
                onChange={(e) => {
                  dispatch(updateFormValue({demandDescription: e.currentTarget.value}));
                }}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

Operation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  demandModalVisible: PropTypes.bool,
  demandEditModal: PropTypes.number,
  demandTitle: PropTypes.string,
  demandDescription: PropTypes.string,
  demandPublishLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(Operation);
