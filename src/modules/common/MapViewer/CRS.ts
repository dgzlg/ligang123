import Proj4 from 'proj4';
import {CRS, Bounds, Point} from 'leaflet';
import crsData from './crsData';
const Proj4L = require('proj4leaflet');

interface CustomCRS {
    [key: string]: CRS,
}
export const CustomCRS: CustomCRS = {};

interface CRSOptions {
    code: string;
    definition: string;
    wgs84Bounds?: [[number, number], [number, number]];
    bounds?: [[number, number], [number, number]];
    resolutions?: number[];
    scales?: number[];
}

function makeCRS(options: CRSOptions): CRS {
    let origin: [number, number];
    let bounds: Bounds;
    if (options.wgs84Bounds) {
        const min = Proj4(options.definition).forward(options.wgs84Bounds[0]);
        const max = Proj4(options.definition).forward(options.wgs84Bounds[1]);
        origin = [min[0], max[1]];
        bounds = new Bounds(
            new Point(min[0], min[1]),
            new Point(max[0], max[1])
        );
    } else if(options.bounds) {
        origin = [options.bounds[0][0], options.bounds[1][1]];
        bounds = new Bounds(
            new Point(options.bounds[0][0], options.bounds[0][1]),
            new Point(options.bounds[1][0], options.bounds[1][1]),
        );
    } else {
        throw Error('makeCRS: need parameter options.bounds or options.wgs84Bounds');
    }

    if (options.resolutions) {
        return new Proj4L.CRS(options.code, options.definition, {
            origin,
            bounds,
            resolutions: options.resolutions,
        });
    } else if (options.scales) {
        return new Proj4L.CRS(options.code, options.definition, {
                origin,
                bounds,
                scales: options.scales,
        });
    } else {
        throw Error('makeCRS: need parameter options.resolutions or options.scales');
    }
}

for (let i = 0, l = crsData.length; i < l; i++) {
    const {code} = crsData[i];
    CustomCRS[code] = makeCRS(crsData[i] as CRSOptions);
}
