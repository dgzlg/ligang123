import {Store, Dispatch} from 'redux';
import {message} from 'antd';
import {
    START_CREATE_MR,
    START_MODIFY_MR,
    CANCEL_MR_EDIT,
    SAVING_MR,
    SAVED_MR,
    FAILED_SAVE_MR,
    UPDATE_FORM_VALUE,
    LOAD_MR,
    LOAD_MR_FAILED
} from '../constants/MapResourceEditor';
import {EditTarget, MapType} from "../types/MapResourceEditor";
import storeKey from '../constants/storeKey';
import { openViewer } from './MapResourceViewer';
import { host } from '../../../../config/api';
import {updateResourceList, TOGGLE_RESOURCE_LOADING} from '../action';

export function getMR(request, id: string) {
    return request({
        method: 'GET',
        url: `${host}/rest/busi/resource/map_service/${id}`,
    });
}

export function createMR() {
    return {
        type: START_CREATE_MR,
    }
}

// 1.open editor
// 2.get resource by 'id'
// 3.update editing data
export function modifyMR(target: {id:string, [key:string]: any}) {
    return (request, dispatch: Dispatch) => {
        dispatch({type: LOAD_MR});
        getMR(request, target.id)
            .then(({entity: {id, name, description, mapService: {url, service, version}}}) => {
                dispatch({
                    type: START_MODIFY_MR,
                    target: {
                        id,
                        name,
                        description,
                        url,
                        type: service,
                        version,
                    }
                })
            })
            .catch((err) => {
                message.error(err.message || '资源获取失败');
                dispatch({type: LOAD_MR_FAILED});
            });
    };
}

export function cancelMREdit() {
    return {
        type: CANCEL_MR_EDIT,
    }
}

interface MapServiceResource {
    id?: string;
    directoryId: string;
    name: string;
    description?: string;
    mapService: {
        name: string;
        service: MapType;
        url: string;
        version: string;
    };
}
export function saveMR() {
    return (request, dispatch: Dispatch, getState: Store['getState']) => {
        const {pathArray, mRETarget, mREName, mREType, mREUrl, mREDescription, mREVersion} = getState()[storeKey];
        const l = pathArray.length;
        const data: MapServiceResource = {
            directoryId: l > 0 ? pathArray[l - 1].id : '-1',
            name: mREName,
            description: mREDescription,
            mapService: {
                name: mREName,
                service: mREType,
                url: mREUrl,
                version: mREVersion,
            },
        }
        const isModify = mRETarget !== null;
        dispatch({type: SAVING_MR});
        if (isModify) {
            data.id = mRETarget.id;
        }
        request({
            method: isModify ? 'PUT' : 'POST',
            url: `${host}/rest/busi/resource/map_service`,
            data,
        }).then(() => {
            dispatch({type: SAVED_MR});
            dispatch(updateResourceList());
            message.success(`资源${isModify ? '修改' : '创建'}成功`);
        }).catch((err) => {
            dispatch({type: FAILED_SAVE_MR});
            message.error(err.message || `资源${isModify ? '修改' : '创建'}失败`);
        });
    };
}

export function viewMR() {
    // from editor
    return (request, dispatch: Dispatch, getState: Store['getState']) => {
        const {mREName, mREType, mREUrl, mREVersion} = getState()[storeKey];
        dispatch(openViewer({name: mREName, type: mREType, url: mREUrl, version: mREVersion}));
    }
}

export function updateFormValue(payload: object) {
    return (request, dispatch: Dispatch) => {
        dispatch({
            type: UPDATE_FORM_VALUE,
            payload,
        })
    }
}
