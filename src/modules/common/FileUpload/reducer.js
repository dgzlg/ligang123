import {
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAIL,
    FILES_UPLOAD_INIT,
    FILE_UPLOAD_START,
    FILES_UPLOAD_FINISHED, CLOSE_UPLOAD_VIEWER
} from './actions';

const defaultState = {
    waitingTasks: [],
    uploadingTasks: [],
    finishedTasks: [],
    failedTasks: [],
    finishedGroups: [],
    currentSyncTaskGroup: null,
    showUploadViewer: false
};


export default (state = defaultState, action) => {
    const { task } = action;
    /* 任务初始化 */
    if (action.type === FILES_UPLOAD_INIT) {
        return {
            ...state,
            waitingTasks: [...state.waitingTasks, ...action.tasks],
            currentSyncTaskGroup: action.async ? null : action.groupKey,
            showUploadViewer: !action.async
        };
    }
    /* 任务开始 */
    if (action.type === FILE_UPLOAD_START) {
        let waitingTasks = state.waitingTasks.filter(_ => _.groupKey !== task.groupKey || _.fileName !== task.fileName);
        let uploadingTasks = [...state.uploadingTasks, action.task];
        return { ...state, waitingTasks, uploadingTasks };
    }
    /* 任务成功 */
    if (action.type === FILE_UPLOAD_SUCCESS) {
        let finishedTasks = [...state.finishedTasks, task];
        let uploadingTasks = state.uploadingTasks.filter(_ => _.groupKey !== task.groupKey || _.fileName !== task.fileName);
        return { ...state, finishedTasks, uploadingTasks };
    }
    /* 任务失败 */
    if (action.type === FILE_UPLOAD_FAIL) {
        let failedTasks = [...state.failedTasks, task];
        const uploadingTasks = state.uploadingTasks.filter(_ => _.groupKey !== task.groupKey || _.fileName !== task.fileName);
        return { ...state, failedTasks, uploadingTasks };
    }
    /* 组任务完成 */
    if (action.type === FILES_UPLOAD_FINISHED) {
        return { ...state, finishedGroups: [...state.finishedGroups, action.groupKey] };
    }
    /* 关闭上传窗口 */
    if (action.type === CLOSE_UPLOAD_VIEWER) {
        return { ...state, currentSyncTaskGroup: null, showUploadViewer: false };
    }
    return state;
};
