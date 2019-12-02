import storeKey from './storeKey';

export const START_CREATE_MR = `${storeKey}/startCreateMR`;
export type START_CREATE_MR = string;

export const LOAD_MR= `${storeKey}/loadMR`;
export type LOAD_MR = string;

export const LOAD_MR_FAILED= `${storeKey}/loadMRFailed`;
export type LOAD_MR_FAILED = string;

export const START_MODIFY_MR = `${storeKey}/startModifyMR`;
export type START_MODIFY_MR = string;

export const CANCEL_MR_EDIT = `${storeKey}/cancelMREdit`;
export type CANCEL_MR_EDIT = string;

export const SAVING_MR = `${storeKey}/savingMR`;
export type SAVING_MR = string;

export const FAILED_SAVE_MR = `${storeKey}/failedSaveMR`;
export type FAILED_SAVE_MR = string;

export const SAVED_MR = `${storeKey}/savedMR`;
export type SAVED_MR = string;

export const UPDATE_FORM_VALUE = `${storeKey}/updateFormValue`;
export type UPDATE_FORM_VALUE = string;
