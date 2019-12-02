import {
    EditState,
    MapType,
    MapVersions,
} from "../types/MapResourceEditor";
import {
    START_CREATE_MR,
    LOAD_MR,
    START_MODIFY_MR,
    CANCEL_MR_EDIT,
    SAVING_MR,
    SAVED_MR,
    FAILED_SAVE_MR,
    UPDATE_FORM_VALUE,
    LOAD_MR_FAILED
} from '../constants/MapResourceEditor';

export const defaultState = {
    mREState: EditState.closed,
    mRETarget: null,
    mREName: '',
    mREDescription: '',
    mREType: MapType.wmts,
    mREUrl: '',
    mREVersion: MapVersions[MapType.wmts][0],
};

export function mREReducer(state, action) {
    switch (action.type) {
        case START_CREATE_MR:
            return {
                ...state,
                ...defaultState,
                mREState: EditState.editing,
            };
        case LOAD_MR:
            return {
                ...state,
                mREState: EditState.loading,
            }
        case LOAD_MR_FAILED:
            return {
                ...state,
                mREState: EditState.closed,
            }
        case START_MODIFY_MR:
            return {
                ...state,
                mREState: EditState.editing,
                mRETarget: action.target,
                mREName: action.target.name,
                mREDescription: action.target.description,
                mREType: action.target.type,
                mREUrl: action.target.url,
                mREVersion: action.target.version,
            };
        case CANCEL_MR_EDIT:
            return {
                ...state,
                mREState: EditState.closed,
            };
        case SAVING_MR:
            return {
                ...state,
                mREState: EditState.saving,
            };
        case SAVED_MR:
            return {
                ...state,
                mREState: EditState.closed,
            };
        case FAILED_SAVE_MR:
            return {
                ...state,
                mREState: EditState.failed,
            };
        case UPDATE_FORM_VALUE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
