import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Input, Button} from 'antd';
import {HEADER_HEIGHT, FOOTER_HEIGHT} from "../../../Main/container/uiConfig";
import ThemedContainer from '../../../common/ThemedContainer/index';
import Explorer from '../../../common/Explorer/index';
import {
  cancelDirectoryEdit, createDirectory,
  deleteDirectory, navTo,
  modifyDirectory,
  prefix, publishDirectory, saveDirectoryEdit,
  updateDirectoryList,
  updateEditingValue
} from "../action";
import InitialCallback from "../../../common/InitialCallback";

const editModalIndex = {
  0: '创建',
  1: '修改',
};

const MyDirectory = (
  {
    dispatch, winHeight, editable, pathArray, directoryLoading, directoryList,
    editModal, editModalVisible, editingName, editSaving,
  }
) => {

  const publishConfirm = () => {
    Modal.confirm({
      title: '确定要提交发布目录申请吗?',
      onOk: () => {
        dispatch(publishDirectory());
      },
      onCancel: () => {},
    });
  };

  const footer = () => {
    return (
      <div style={{paddingTop: '16px', textAlign: 'right'}}>
        <Button type="default" htmlType="button" disabled={!editable} onClick={publishConfirm}>申请发布</Button>
        <Button type="primary" htmlType="button" style={{marginLeft: 16}} disabled={!editable} onClick={() => dispatch(createDirectory())}>新增目录</Button>
      </div>
    );
  };

  const deleteDirectoryConfirm = (target) => {
    Modal.confirm({
      title: '确定要删除此目录吗?',
      content: target.name,
      onOk: () => {
        dispatch(deleteDirectory(target));
      },
      onCancel: () => {},
    });
  };

  const contextProvider = () => {
    if (!editable) {
      return false;
    }
    return [
      {name: '重命名', action: (target) => dispatch(modifyDirectory(target))},
      {name: '删除', action: deleteDirectoryConfirm},
    ];
  };

  return (
    <ThemedContainer
      className="my-directory"
      style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32}px`}}
      title="我的目录"
      headerLeftText={pathArray.map(_ => _.name).join('/')}
      footer={footer}
    >
      <InitialCallback
        actions={() => dispatch(updateDirectoryList())}
      />
      <Explorer
        style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 168}px`}}
        loading={directoryLoading}
        list={directoryList}
        pathArray={pathArray}
        navTo={(array) => dispatch(navTo(array))}
        contextProvider={contextProvider}
      />
      <Modal
        visible={editModalVisible}
        title={`${editModalIndex[editModal]}目录`}
        closable={false}
        footer={[
          <Button key="cancel" type="default" htmlType="button" disabled={editSaving} onClick={() => dispatch(cancelDirectoryEdit())}>取消</Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="button"
            disabled={!editable || !editingName}
            loading={editSaving}
            style={{marginLeft: 16}}
            onClick={() => dispatch(saveDirectoryEdit())}
          >{`确认${editModalIndex[editModal]}`}</Button>,
        ]}
      >
        <Input value={editingName} onChange={(e) => dispatch(updateEditingValue({editingName: e.currentTarget.value}))}/>
      </Modal>
    </ThemedContainer>
  );
};

MyDirectory.propTypes = {
  dispatch: PropTypes.func,
  winHeight: PropTypes.number,
  editable: PropTypes.bool,
  pathArray: PropTypes.array,
  directoryLoading: PropTypes.bool,
  directoryList: PropTypes.array.isRequired,
  editModal: PropTypes.number,
  editModalVisible: PropTypes.bool,
  editingName: PropTypes.string,
  editSaving: PropTypes.bool,
};

const mapStateToProps = ({
  Main: {winHeight},
  [prefix]: {editable, pathArray, directoryLoading, directoryList, editModal, editModalVisible, editingName, editSaving},
}) => ({editable, pathArray, directoryLoading, directoryList, winHeight, editModal, editModalVisible, editingName, editSaving});

export default connect(mapStateToProps)(MyDirectory);
