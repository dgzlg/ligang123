export enum MapViewerState {
    closed,
    opened,
}

export enum PropsMapping {
    state = 'mRVState',
    name = 'mRVName',
    url = 'mRVUrl',
    type = 'mRVType',
}

export interface MapViewTarget {
    name: string;
    url: string;
    type: string;
    version: string;
}