import * as React from 'react';
import {Button, Row, Col, Modal} from 'antd';
import {Layer as LayerWMTS, GetTileMethod} from './parseWMTSMetadata';
import {Layer as LayerWMS} from './parseWMSMetadata';
import {ServiceType} from './ExMapViewer';
import FormWMTS from './FormWMTS';
import FormWMS from './FormWMS';
import './InfoForm.less';

interface WMTSInfo {
    name: string;
    provider: string;
    version: string;
    getTileMethods: GetTileMethod[],
    layers: LayerWMTS[];
}

interface WMSInfo {
    name: string;
    version: string;
    layersTree: LayerWMS[];
    layersMap: LayerWMS[];
    formats: string[];
    url: string;
}

export interface ServiceInfo {
    WMTSInfo: WMTSInfo,
    WMSInfo: WMSInfo,
}

export interface Props {
    handleSetMap: (info: State) => void;
}

export interface State extends ServiceInfo {
    type: string;
    layerWMTS: LayerWMTS | null;
    layerWMS: LayerWMS | null;
    formFolded: boolean;
    format: string;
    transparent: boolean;
    style: string;
}

class InfoForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: '',
            WMTSInfo: {
                name: '',
                provider: '',
                version: '',
                getTileMethods: [],
                layers: [],
            },
            WMSInfo: {
                name: '',
                version: '',
                layersTree: [],
                layersMap: [],
                formats: [],
                url: '',
            },
            layerWMTS: null,
            layerWMS: null,
            formFolded: false,
            format: '',
            transparent: false,
            style: '',
        };
        this.handleOpenForm = this.handleOpenForm.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.handleCreateMap = this.handleCreateMap.bind(this);
        this.handleLayerChangeWMTS = this.handleLayerChangeWMTS.bind(this);
        this.handleLayerChangeWMS = this.handleLayerChangeWMS.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleTransChange = this.handleTransChange.bind(this);
        this.handleStyleChange = this.handleStyleChange.bind(this);
    }

    setInfo(info: ServiceInfo) {

    }

    handleOpenForm() {
        this.setState({formFolded: false});
    }

    handleCloseForm() {
        this.setState({formFolded: true});
    }

    handleCreateMap() {
        this.props.handleSetMap(this.state);
    }

    handleLayerChangeWMS(value: string) {
        const {layersMap} = this.state.WMSInfo;
        let target: LayerWMS;

        if (!value) {
            Modal.warning({
                title: '此图层为无效的中间层',
                zIndex: 1002,
            });
            return;
        }

        for (let i = 0, l = layersMap.length; i < l; i++) {
            if (layersMap[i].name === value) {
                target = layersMap[i];
                break;
            }
        }

        this.setState({
            layerWMS: target,
            style: target.styles[0] && target.styles[0].name || '',
        });
    }

    handleLayerChangeWMTS(value: string) {
        const {WMTSInfo: {layers}} = this.state;
        for (let i = 0, l = layers.length; i < l; i++) {
            if (layers[i].id === value) {
                this.setState({
                    layerWMTS: layers[i],
                    format: layers[i].formats[0],
                    style: layers[i].styles[0],
                });
                return;
            }
        }
    }

    handleFormatChange(value: string) {
        this.setState({format: value});
    }

    handleTransChange(value: string) {
        this.setState({
            transparent: value === 'true',
        });
    }

    handleStyleChange(value: string) {
        this.setState({style: value});
    }

    render() {
        const {
            type, formFolded, format, transparent, style, layerWMTS, layerWMS,
        } = this.state;
        if (formFolded) {
            return (
                <div id="myButtonUnfold" onClick={this.handleOpenForm}>展开服务信息</div>
            );
        }
        return (
            <div id="myMapInfo">
                {type === ServiceType.WMS ?
                    <FormWMS
                        {...this.state.WMSInfo} 
                        selectedLayer={layerWMS}
                        format={format}
                        transparent={transparent}
                        style={style}
                        handleLayerChange={this.handleLayerChangeWMS}
                        handleStyleChange={this.handleStyleChange}
                        handleFormatChange={this.handleFormatChange}
                        handleTransChange={this.handleTransChange}
                    /> 
                    : ''
                }
                {type === ServiceType.wmts ?
                    <FormWMTS
                        {...this.state.WMTSInfo}
                        selectedLayer={layerWMTS}
                        format={format}
                        style={style}
                        handleLayerChange={this.handleLayerChangeWMTS}
                        handleStyleChange={this.handleStyleChange}
                        handleFormatChange={this.handleFormatChange}
                    />
                    : ''
                }
                <Button disabled={!layerWMS && !layerWMTS} onClick={this.handleCreateMap} block>生成地图</Button>
                <Button style={{marginTop: 16}} onClick={this.handleCloseForm} block>收起</Button>
            </div>
        );
    }
}

export default InfoForm;
