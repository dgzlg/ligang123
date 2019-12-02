/* global Promise */
import { notification } from 'antd';
import { timeDurationFormatter } from '../utils/dataFormater';
import createAction from '../utils/createAction';

export const FILES_UPLOAD_INIT = '@@FileUpload/uploadInit';
export const FILE_UPLOAD_START = '@@FiledUpload/uploadStart';
export const FILE_UPLOAD_SUCCESS = '@@FileUpload/uploadSuccess';
export const FILE_UPLOAD_FAIL = '@@FileUpload/uploadFail';
export const FILES_UPLOAD_FINISHED = `@@FileUpload/uploadFilesFinished`;
export const CLOSE_UPLOAD_VIEWER = `@@FileUpload/closeUploadViewer`;

/**
 * 上传任务状态提醒
 * @param type{string} 状态类型（成功、失败）
 * @param task{object} 任务
 */
const uploadNotification = (type, task) => {
    const time = task.endTime - task.startTime;
    const typeIndex = { success: '上传成功', failed: '上传失败' };
    const message = typeIndex[type];
    const duration = ((timeObj) => {
        const index = ['day', 'hour', 'minute', 'second', 'mSecond'];
        const index2 = ['天', '时', '分', '秒', 'ms'];
        const arr = [];
        for (let i = 0, l = index.length; i < l; i++) {
            if (timeObj[index[i]]) {
                arr.push(`${timeObj[index[i]]}${index2[i]}`);
            }
        }
        return arr.join('');
    })(timeDurationFormatter(time));
    const description = `${task.fileName}(用时：${duration})`;
    notification[type]({ message, description });
};

const uploadTask = ({ url, task, file, sync, needNotif }) => {
    return (request, dispatch) => {
        return new Promise((resolve, reject) => {
            task.startTime = new Date().getTime();
            dispatch({ type: FILE_UPLOAD_START, task });
            request({
                url,
                method: 'post',
                data: file
            })
            .then((res) => {
                task.endTime = new Date().getTime();
                task.res = res;
                dispatch({ type: FILE_UPLOAD_SUCCESS, task });
                if (needNotif) {
                    uploadNotification('success', task);
                }
                resolve(task);
            })
            .catch((err) => {
                task.endTime = new Date().getTime();
                dispatch({ type: FILE_UPLOAD_FAIL, task });
                if (needNotif) {
                    uploadNotification('success', task);
                }
                reject(err, task);
            });
        });
    };
};

/**
 * 多文件上传
 * @param {object} data
 * @param {string} data.url - 上传地址
 * @param {string} [data.formDataKey='file'] - 请求body中，文件的键名
 * @param {array} data.files - 文件数组
 * @param {string|number} [data.groupKey] - 此上传组唯一标识
 * @param {boolean} [data.async] - 是否为异步任务（默认为同步任务，此处同步指’阻滞用户进一步操作‘）
 * @return {Function}
 */
export const uploadFiles = ({ url, formDataKey = 'file', files, groupKey = new Date().getTime(), async }) => {
    return (request, dispatch) => {
        const filesNum = files.length;
        const tasks = new Array(filesNum);
        const postFiles = new Array(filesNum);
        for (let i = 0; i < filesNum; i++) {
            const formData = new FormData();
            formData.append(formDataKey, files[i]);
            postFiles[i] = formData;
            tasks[i] = {
                groupKey,
                fileName: files[i].name,
                fileSize: files[i].size
            };
        }
        dispatch({ type: FILES_UPLOAD_INIT, tasks, async, groupKey });
        const upload = (step = 0) => {
            dispatch(uploadTask({ url, task: tasks[step], file: postFiles[step], sync: false, needNotif: async }))
            .then((task) => {
                tasks[step] = task;
                if (step < filesNum -1) {
                    upload(step + 1);
                } else {
                    dispatch({ type: FILES_UPLOAD_FINISHED, groupKey });
                }
            })
            .catch((err, task) => {
                tasks[step] = task;
                if (step < filesNum -1) {
                    upload(step + 1);
                } else {
                    dispatch({ type: FILES_UPLOAD_FINISHED, groupKey });
                }
            });
        };
        upload();
    };
};

/**
 * 关闭上传任务窗口
 * @type {Function}
 */
export const closeUploadViewer = createAction(CLOSE_UPLOAD_VIEWER);
