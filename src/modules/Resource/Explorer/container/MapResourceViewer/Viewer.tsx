import * as React from 'react';
import {Modal} from 'antd';
import ExMapViewer from '../../../../common/MapViewer/ExMapViewer';
import {MapViewerState} from '../../types/MapResourceViewer';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 640;

export interface Props {
    state: MapViewerState;
    name: string;
    url: string;
    type: string;
    close: () => {};
}

function Viewer({state, name, url, type, close}: Props) {
    return (
        <Modal
            title={name || '地图预览'}
            width={MAP_WIDTH}
            bodyStyle={{padding: 0}}
            zIndex={1001}
            visible={state === MapViewerState.opened}
            destroyOnClose={true}
            maskClosable={false}
            footer={null}
            onCancel={close}
        >
            <ExMapViewer
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                url={url}
                type={type}
            />
        </Modal>
    )
}

export default Viewer;