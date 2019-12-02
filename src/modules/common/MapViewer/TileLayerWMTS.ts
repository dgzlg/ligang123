import {TileLayer, TileLayerOptions, Point, Util} from 'leaflet';

export enum ValuesType {
    KVP = 'KVP',
    REST = 'REST',
    RESTFUL = 'RESTFUL',
}

interface Dimension{
    key: string;
    default: string;
    values?: string[];
}
export interface WMTSOptions extends TileLayerOptions {
    valuesType?: ValuesType;
    uppercase?: boolean;
    layer: string;
    tileMatrixSet: string;
    tileMatrixIds?: string[];
    format: string;
    style: string;
    dimensions: Dimension[];
}

interface WMTSParams {
    SERVICE: string,
    REQUEST: string,
    VERSION: string,
    LAYER: string,
    TILEMATRIXSET: string,
    STYLE: string,
    FORMAT: string,
}

export class TileLayerWMTS extends TileLayer {
    // property from TileLayer
    _globalTileRange: any;
    // property from TileLayer
    _url: string;

    options: WMTSOptions;

    params: WMTSParams;

    constructor(url: string, options: WMTSOptions) {
        super(url, options);
        this.params = {
            SERVICE: 'WMTS',
            REQUEST: 'GetTile',
            VERSION: '1.0.0',
            LAYER: options.layer,
            TILEMATRIXSET: options.tileMatrixSet,
            STYLE: options.style,
            FORMAT: options.format,
        };
    }

    // override TileLayer's method 'getTileUrl'
    getTileUrl(coords: Point) {
        const {tileMatrixIds, dimensions} = this.options;
        const data: any = {
            ...this.params,
            TILECOL: coords.x,
            TILEROW: coords.y,
        };
        
        if (this._map && this._map.options.crs.infinite) {
            let revertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data.TileRow = revertedY;
            }
        }

        // TileMatrix
        if (tileMatrixIds) {
            data.TILEMATRIX = tileMatrixIds[this._getZoomForUrl()];
        } else {
            data.TILEMATRIX = this._getZoomForUrl();
        }

        // Dimension
        if (dimensions.length > 0)
        {
            for (let i = 0, l = dimensions.length; i < l; i++) {
                const {key, default: dft, values} = dimensions[i];
                if (values.length > 0)
                {
                    data[key.toLocaleUpperCase()] = values[0];
                    continue;
                }
                data[key.toLocaleUpperCase()] = dft;
            }
        }

        // KVP url
        if (this.options.valuesType === ValuesType.KVP) {
            return `${this._url}${Util.getParamString(data, this._url, this.options.uppercase)}`;
        }

        // default REST url
        return Util.template(this._url, data);
    }
}

export function tileLayerWMTS(url: string, options: WMTSOptions): TileLayerWMTS {
    return new TileLayerWMTS(url, options);
}
