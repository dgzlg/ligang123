import * as React from 'react';
import {Modal, message} from 'antd';
import {LatLng, LatLngBounds, CRS, Control, Point} from 'leaflet';
import axios from 'axios';
import MapViewer, {Props as MapViewerProps} from './index';
import InfoForm, {State as FormState} from './InfoForm';
import {GetTileType, parseWMTSMetadata} from './parseWMTSMetadata';
import {parseWMSMetadata} from './parseWMSMetadata';
import { WMTSOptions, ValuesType } from './TileLayerWMTS';
import {CustomCRS} from './CRS';

// translate all params key to uppercase
// just aviliable for format '{key}'
// eg: '{key}' > '{KEY}'
function goodURLTemplate(url: string): string {
    const l = url.length;
    const str = new Array(l);

    for (let i = 0; i < l; i++) {
        if (url[i] === '{') {
            str[i++] = '{';
            for (; i < l; i++) {
                str[i] = url[i].toUpperCase();
                if (url[i] === '}') {
                    break;
                }
            }
        } else {
            str[i] = url[i];
        }
    }

    return str.join('');
}

export enum ServiceType {
    wms = 'OGC WMS',
    wmts = 'OGC WMTS',
    WMS = 'OGC WMS',
    WMTS = 'OGC WMTS',
}

const SupportedCRS = {
    'EPSG:3395': CRS.EPSG3395,
    'EPSG:3857': CRS.EPSG3857,
    'EPSG:4326': CRS.EPSG4326,
}

export interface Props extends MapViewerProps{
    url: string;
    type: string;
}

class ExMapViewer extends React.Component <Props> {
    mapViewer: React.RefObject<MapViewer>;
    infoForm: React.RefObject<InfoForm>;

    constructor(props: Props) {
        super(props);
        this.mapViewer = React.createRef();
        this.infoForm = React.createRef();
        this.handleCreateMap = this.handleCreateMap.bind(this);
    }

    componentDidMount() {
        const {url, type} = this.props;
        if (type === 'WMTS') {
            this.initWMTSInfo(url);
            return;
        }
        
        if (type === 'WMS') {
            this.initWMSInfo(url);
            return;
        }
    }

    // 1.getCapabilities(WMS)
    // 2.parse the WMTS metadata
    // 3.update the form state
    initWMSInfo(url: string) {
        axios.get(url)
            .then((data) => {
                const {
                    version, name, title, url, formats, layersTree, layersMap,
                } = parseWMSMetadata(new DOMParser().parseFromString(data.data, 'text/xml'));
                this.infoForm.current.setState({
                    type: ServiceType.wms,
                    WMSInfo: {
                        name: title || name,
                        version,
                        layersTree,
                        layersMap,
                        url,
                        formats,
                    },
                    format: formats[0],
                });
            })
            .catch(err => {
                message.error('WMS 服务信息获取失败');
                throw err;
            });
    }

    createWMSLayer(formState: FormState) {
        const {
            WMSInfo: {version, url},
            format,
            transparent,
            layerWMS: {name, boundings},
            style,
        } = formState;
        const {current: viewer} = this.mapViewer;
        let crs: CRS | null = null;
        let tb: [string, {lat: number, lng: number}, {lat: number, lng: number}];

        // get available CRS
        for (let i = 0, l = boundings.length; i < l; i++) {
            tb = boundings[i];
            crs = SupportedCRS[tb[0]] || CustomCRS[tb[0]];
            if (crs) {
                break;
            }
        }
        if (!crs) {
            Modal.warning({
                title: '暂不支持的CRS',
                content: `${boundings.map(_ => _[0]).join(', ')}`,
                zIndex: 1002,
            });
            return;
        }
        // set CRS
        this.setCRS(crs);

        const bounds = new LatLngBounds(
            crs.unproject(new Point(tb[1].lng, tb[1].lat)),
            crs.unproject(new Point(tb[2].lng, tb[2].lat)),
        );

        viewer.map.fitBounds(bounds);

        // remove old layers
        viewer.removeAllLayers();

        viewer.setWMSLayer(url, {
            layers: name,
            version,
            format,
            styles: style,
            bounds,
            transparent,
        });
    }

    // 1.getCapabilities(WMTS)
    // 2.parse the WMTS metadata
    // 3.update the form state
    initWMTSInfo(url: string) {
        axios.get(url)
            .then((data) => {
                const {
                    title, typeVersion, type, provider, getTileMethods, layers,
                } = parseWMTSMetadata(new DOMParser().parseFromString(data.data, 'application/xml'));
                this.infoForm.current.setState({
                    type: ServiceType.wmts,
                    WMTSInfo: {
                        getTileMethods,
                        layers,
                        name: title,
                        provider: provider,
                        version: typeVersion,
                    },
                });
            })
            .catch(err => {
                message.error('WMTS 服务信息获取失败');
                throw err;
            });
    }

    createWMTSLayer(formState: FormState) {
        const {
            layerWMTS: {id, tileMatrixSets, resourceUrls, wgs84Bounding, bounding, dimensions},
            WMTSInfo: {getTileMethods},
            format,
            style,
        } = formState;
        const {current: Viewer, current: {map}} = this.mapViewer;
        const opt: WMTSOptions = {
            layer: id,
            tileMatrixSet: '',
            format,
            style,
            dimensions,
        };
        let bounds: LatLngBounds;
        let url: string;
        let crs: CRS | null = null;
        
        // remove old layers
        Viewer.removeAllLayers();

        // set GetTile method
        for (let i = 0, l = getTileMethods.length; i < l; i++) {
            if (getTileMethods[i].type === GetTileType.kvp) {
                url = getTileMethods[i].url;
                opt.valuesType = ValuesType.KVP;
                break;
            }
            if (getTileMethods[i].type === GetTileType.rest || getTileMethods[i].type === GetTileType.restful) {
                url = goodURLTemplate(resourceUrls[0]);
                opt.valuesType = ValuesType.REST;
                break;
            }
        }

        // set available CRS and tileMatrixSet
        for (let i = 0, l = tileMatrixSets.length; i < l; i++) {
            const set = tileMatrixSets[i];
            crs = SupportedCRS[set.CRS] || CustomCRS[set.CRS];
            if (crs) {
                this.setCRS(crs);
                opt.tileMatrixSet = set.id;
                opt.tileMatrixIds = set.ids;
                break;
            }
        }
        if (!crs) {
            Modal.warning({
                title: '暂不支持的CRS',
                content: `${tileMatrixSets.map(_ => _.CRS).join(', ')}`,
                zIndex: 1002,
            });
            return;
        }

        // set map bounds
        if (wgs84Bounding) {
            bounds = new LatLngBounds(
                new LatLng(wgs84Bounding[0].lat, wgs84Bounding[0].lng),
                new LatLng(wgs84Bounding[1].lat, wgs84Bounding[1].lng)
            );
        } else if (bounding) {
            bounds = new LatLngBounds(
                new LatLng(bounding[0].lat, bounding[0].lng),
                new LatLng(bounding[1].lat, bounding[1].lng),
            );
        } else {
            const pointBounds = crs.getProjectedBounds(0);
            bounds = new LatLngBounds(
                crs.pointToLatLng(pointBounds.min, 0),
                crs.pointToLatLng(pointBounds.max, 0),
            );
        }

        map.fitBounds(bounds);
        opt.bounds = bounds;
        Viewer.setWMTSLayer(url, opt);
    }

    setCRS(crs:CRS) {
        if (this.mapViewer.current.map.options.crs.code === crs.code) {
            return;
        }

        this.mapViewer.current.map.options.crs = crs;

        return;
    }

    handleCreateMap(formState: FormState) {
        if (!this.mapViewer.current.map) {
            this.mapViewer.current.initializeMap({
                attributionControl: false,
                zoomControl: false,
            });
            (new Control.Zoom({position: 'topright'})).addTo(this.mapViewer.current.map);
        }

        if (formState.type === ServiceType.wmts) {
            this.createWMTSLayer(formState);
            return;
        }

        if (formState.type === ServiceType.wms) {
            this.createWMSLayer(formState);
            return;
        }
    }

    render() {
        const {width, height} = this.props;
        return (
            <div style={{position: 'relative', backgroundColor: '#eee'}}>
                <MapViewer ref={this.mapViewer} width={width} height={height} />
                <InfoForm ref={this.infoForm} handleSetMap={this.handleCreateMap}/>
            </div>
        )
    }
}

export default ExMapViewer;