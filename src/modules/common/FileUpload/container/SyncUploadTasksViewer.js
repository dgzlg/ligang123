import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Progress, Button } from 'antd';
import { closeUploadViewer } from '../actions';
import './index.less';

const sumFilesInfo = (files) => {
    const num = files.length;
    let size = 0;
    for (let i = 0; i < num; i++) {
        size += files[i].fileSize;
    }
    return { num, size };
};

const SyncUploadTasksViewer = ({ waiting, uploading, failed, finished, showUploadViewer, closeWin }) => {
    const waitingInfo = sumFilesInfo(waiting);
    const uploadingInfo = sumFilesInfo(uploading);
    const failedInfo = sumFilesInfo(failed);
    const finishedInfo = sumFilesInfo(finished);
    const totalSize = waitingInfo.size + uploadingInfo.size + failedInfo.size + finishedInfo.size;
    const percentFinished = totalSize === 0 ? 100 : parseInt((finishedInfo.size / totalSize) * 100);
    return (
        <Modal
            className={'upload-task-viewer'}
            visible={showUploadViewer}
            closable={false}
            footer={null}
        >
            <Progress percent={percentFinished}/>
            <ul className={'finished'}>
                {finished.map((task, index) => (
                    <li key={index}>{task.fileName} 上传完成</li>
                ))}
            </ul>
            <ul className={'failed'}>
                {failed.map((task, index) => (
                    <li key={index}>{task.fileName} 上传失败</li>
                ))}
            </ul>
            <ul className={'uploading'}>
                {uploading.map((task, index) => (
                    <li key={index}>{task.fileName} 上传中...</li>
                ))}
            </ul>
            {waiting.length === 0 ?
                <div style={{ textAlign: 'center' }}>
                    <Button type={'primary'} htmlType={'button'} onClick={closeWin}>确认</Button>
                </div>
                :
                ''
            }
        </Modal>
    );
};

SyncUploadTasksViewer.propTypes = {
    showUploadViewer: PropTypes.bool.isRequired,
    waiting: PropTypes.array.isRequired,
    uploading: PropTypes.array.isRequired,
    failed: PropTypes.array.isRequired,
    finished: PropTypes.array.isRequired,
    closeWin: PropTypes.func
};

const mapStateToProps = ({ FileUpload: { waitingTasks, uploadingTasks, finishedTasks, failedTasks, currentSyncTaskGroup, showUploadViewer } }) => {
    const waiting = waitingTasks.filter(_ => _.groupKey === currentSyncTaskGroup);
    const uploading = uploadingTasks.filter(_ => _.groupKey === currentSyncTaskGroup);
    const failed = failedTasks.filter(_ => _.groupKey === currentSyncTaskGroup);
    const finished = finishedTasks.filter(_ => _.groupKey === currentSyncTaskGroup);
    return { waiting, uploading, failed, finished, showUploadViewer };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeWin: () => {
            dispatch(closeUploadViewer());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncUploadTasksViewer);
