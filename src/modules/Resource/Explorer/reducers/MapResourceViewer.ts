import {MapViewerState} from "../types/MapResourceViewer";
import {
    OPEN_VIEWER,
    CLOSE_VIEWER,
} from "../constants/MapResourceViewer";

export const defaultState = {
    mRVState: MapViewerState.closed,
    mRVName: '',
    mRVUrl: '',
    mRVType: '',
};

export function mRVReducer(state, action) {
    switch(action.type) {
        case OPEN_VIEWER:
            return {
                ...state,
                ...action.payload,
                mRVState: MapViewerState.opened,
            };
        case CLOSE_VIEWER:
            return {
                ...state,
                mRVState: MapViewerState.closed,
            };
        default:
            return state;
    }
}