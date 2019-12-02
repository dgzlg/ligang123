import * as React from 'react';
import {map, Map, CRS, TileLayer, tileLayer, WMSOptions, Layer, MapOptions} from 'leaflet';
import {tileLayerWMTS, WMTSOptions} from './TileLayerWMTS';
import 'leaflet/dist/leaflet.css';

export interface Props {
    width: number;
    height: number;
}

class MapViewer extends React.Component<Props> {
    container: string;
    map: Map;
    layers: TileLayer[];
    crs: CRS;

    constructor(props: Props) {
        super(props);
        this.layers = [];
    }

    componentDidMount() {
        this.container = 'myMapContainer';
    }

    componentWillUnmount() {
        this.map && this.map.remove();
    }

    initializeMap(options?: MapOptions) {
        this.map = map(this.container, options);
    }

    setWMSLayer(url: string, options: WMSOptions) {
        const layer = tileLayer.wms(url, options);
        this.layers.push(layer);
        this.map.addLayer(layer);
    }
    
    setWMTSLayer(url: string, options: WMTSOptions) {
        const layer = tileLayerWMTS(url, options);
        this.layers.push(layer);
        this.map.addLayer(layer);
    }

    removeLayer(layer: Layer | TileLayer) {
        this.map && this.map.removeLayer(layer);
    }

    removeAllLayers() {
        for (let i = this.layers.length; i > 0; i--) {
            this.map.removeLayer(this.layers.pop());
        }
    }

    render() {
        const {width, height} = this.props;
        return (
            <div id="myMapContainer" style={{width, height}}/>
        )
    }
}

export default MapViewer;
