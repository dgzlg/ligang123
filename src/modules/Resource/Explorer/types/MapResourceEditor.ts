export enum EditState {
    closed,
    loading,
    editing,
    saving,
    finished,
    failed,
}

export enum MapType {
    wmts = 'WMTS',
    wms = 'WMS',
}

export const WMTSVersions = ['1.0.0'];

export const WMSVersions = [
    //'1.0',
    //'1.1',
    //'1.1.1',
    '1.3.0',
];

export const MapVersions = {
    WMS: WMSVersions,
    WMTS: WMTSVersions,
}

export enum PropsMapping {
    editState = 'mREState',
    target = 'mRETarget',
    name = 'mREName',
    description = 'mREDescription',
    url = 'mREUrl',
    mapType = 'mREType',
    version = 'mREVersion',
}

export interface EditTarget {
    name: string;
    description: string;
    type: MapType;
    url: string;
}
