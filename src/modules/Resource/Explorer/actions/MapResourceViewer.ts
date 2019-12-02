import {MapViewTarget, PropsMapping} from "../types/MapResourceViewer";
import {
    OPEN_VIEWER,
    CLOSE_VIEWER,
} from "../constants/MapResourceViewer";
import {getMR} from './MapResourceEditor';
import { message } from "antd";
import { TOGGLE_RESOURCE_LOADING } from "../action";

export function openViewer(target: MapViewTarget) {
    const payload:any = {};
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            payload[PropsMapping[key]] = target[key];
        }
    }
    return {
        type: OPEN_VIEWER,
        payload,
    }
}

// 1.get resource by 'id'
// 2.open viewer
export function viewMR({id}) {
    return (request, dispatch) => {
        dispatch({type: TOGGLE_RESOURCE_LOADING, loading: true});
        getMR(request, id)
            .then(({entity: {name, mapService: {url, service, version}}}) => {
                dispatch(openViewer({name, url, type: service, version}));
                dispatch({type: TOGGLE_RESOURCE_LOADING, loading: false});
            })
            .catch((err) => {
                message.error(err.message || '资源获取失败');
                dispatch({type: TOGGLE_RESOURCE_LOADING, loading: false});
            });
    };
}

export function closeViewer() {
    return {
        type: CLOSE_VIEWER,
    }
}
