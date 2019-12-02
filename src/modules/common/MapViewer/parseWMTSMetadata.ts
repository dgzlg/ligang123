interface ListEle<D>{
    p: ListEle<D> | null;
    n: ListEle<D> | null;
    data: D;
}
function setList<D>(list: ListEle<D>, data: D): ListEle<D> {
    const newEle = {
        p: list,
        n: null,
        data,
    };
    list.n = newEle;
    
    return newEle;
}

interface LatLng {
    lng: number;
    lat: number;
}

function getBounding(tag: Element): [LatLng, LatLng] {
    const bounding: [LatLng, LatLng] = [
        {lng: 0, lat: 0},
        {lng: 0, lat: 0}
    ];

    for (let i = 0, l = tag.children.length; i < l; i++) {
        const strs = tag.children[i].innerHTML.split(' ');
        const lng = parseFloat(strs[0]);
        const lat = parseFloat(strs[1]);
        if (tag.children[i].tagName === 'ows:LowerCorner') {
            bounding[0].lng = lng;
            bounding[0].lat = lat;
            continue;
        }
        if (tag.children[i].tagName === 'ows:UpperCorner') {
            bounding[1].lng = lng;
            bounding[1].lat = lat;
        }
    }

    return bounding;
}

interface BaseInfo{
    title: string;
    type: string;
    typeVersion: string;
    abstract?: string;
}
/**
 * 从服务描述信息节点提取信息
 * @param parentNode Element
 */
function parseBaseInfo(ele: Element): BaseInfo{
    const info: BaseInfo = {
        title: '',
        type: '',
        typeVersion: '',
        abstract: '',
    };

    for (let i = 0, l = ele.children.length; i < l; i++) {
        switch(ele.children[i].tagName) {
            case 'ows:Title':
                info.title = ele.children[i].innerHTML;
                break;
            case 'ows:ServiceType':
                info.type = ele.children[i].innerHTML;
                break;
            case 'ows:ServiceTypeVersion':
                info.typeVersion = ele.children[i].innerHTML;
                break;
            case 'ows:Abstract':
                info.abstract = ele.children[i].innerHTML;
                break;
            default:
        }
    }

    return info;
}

function getProvider(tag: Element) {
    for (let i = 0, l = tag.children.length; i < l; i++) {
        if (tag.children[i].tagName === 'ows:ProviderName') {
            return tag.children[i].innerHTML;
        }
    }
}

function parseTileMatrixSetLink(node: Element): {id:string, lIds:string[] | null} {
    let id = '';
    let ids:string[] = [];

    for (let i = 0, l = node.children.length; i < l; i++) {
        const cNode = node.children[i];
        switch(cNode.tagName) {
            case 'TileMatrixSet':
                id = cNode.innerHTML;
                break;
            case 'TileMatrixSetLimits':
                for (let j = 0, l2 = cNode.children.length; j < l2; j++) {
                    // TileMatrixLimits
                    for (let k = 0, l3 = cNode.children[j].children.length; k < l3; k++) {
                        if (cNode.children[j].children[k].tagName === 'TileMatrix') {
                            ids.push(cNode.children[j].children[k].innerHTML);
                            break;
                        }
                    }
                }
                break;
            default:
        }
    }

    return {
        id,
        lIds: ids.length === 0 ? null : ids,
    };
}

interface LayerTileMatrixSet extends TileMatrixSet {
    lIds: null | string[];
}
export interface Layer {
    id: string;
    title?: string;
    styles: string[];
    formats: string[];
    tileMatrixSets: LayerTileMatrixSet[];
    resourceUrls?: string[];
    wgs84Bounding?: [LatLng, LatLng];
    bounding?: [LatLng, LatLng];
    dimensions: Dimension[];
}
function parseLayer(node: Element): Layer {
    const layer: Layer = {
        id: '',
        styles: [],
        formats: [],
        tileMatrixSets: [],
        resourceUrls: [],
        wgs84Bounding: null,
        bounding: null,
        dimensions: [],
    };

    for (let i = 0, l = node.children.length; i < l; i++) {
        const cNode = node.children[i];
        let value: string;
        switch (cNode.tagName) {
            case 'ows:Identifier':
                layer.id = cNode.innerHTML;
                break;
            case 'ows:Title':
                layer.title = cNode.innerHTML;
                break;
            case 'Style':
                value = cNode.getElementsByTagName('ows:Identifier')[0].innerHTML;
                if (cNode.getAttribute('isDefault') === 'true') {
                    layer.styles.unshift(value);
                    break;
                }
                layer.styles.push(value);
                break;
            case 'Format':
                layer.formats.push(cNode.innerHTML);
                break;
            case 'TileMatrixSetLink':
                layer.tileMatrixSets.push({...parseTileMatrixSetLink(cNode), CRS: '', ids: [], scales: []});
                break;
            case 'ResourceURL':
                if (cNode.getAttribute('resourceType') === 'tile') {
                    layer.resourceUrls.push(cNode.getAttribute('template'));
                }
                break;
            case 'ows:WGS84BoundingBox':
                layer.wgs84Bounding = getBounding(cNode);
                break;
            case 'ows:BoundingBox':
                layer.bounding = getBounding(cNode);
                break;
            case 'Dimension':
                layer.dimensions.push(parseDimension(cNode));
                break;
            default:
        }
    }

    return layer;
}
interface Dimension{
    key: string;
    default: string;
    values?: string[];
}
function parseDimension(node: Element): Dimension{
    const d:Dimension = {
        key: '',
        default: '',
        values: [],
    };

    for (let i = 0, l = node.children.length; i < l; i++)
    {
        const cNode = node.children[i];
        switch (cNode.tagName)
        {
            case 'ows:Identifier':
                d.key = cNode.innerHTML;
                break;
            case 'Default':
                d.default = cNode.innerHTML;
                break;
            case 'Value':
                d.values.push(cNode.innerHTML);
                break;
        }

    }

    if (d.values.length === 0)
    {
        delete d.values;
    }

    return d;
}

interface TileMatrixSet {
    id: string;
    title?: string;
    CRS: string;
    ids: string[];
    scales: number[];
}
function parseTileMatrixSet(node: Element): TileMatrixSet {
    interface D{id: string; scale: number};
    let CRS: string;
    let title: string;
    let id: string = '';
    let scaleSet: string;
    const ids: string[] = [];
    const scales: number[] = [];
    let list: ListEle<D>;
    let max: ListEle<D>;

    for (let i = 0, l = node.children.length; i < l; i++) {
        const cNode = node.children[i];
        switch (cNode.tagName) {
            case 'TileMatrix':
                let data: D = {
                    id: cNode.getElementsByTagName('ows:Identifier')[0].innerHTML,
                    scale: parseFloat(cNode.getElementsByTagName('ScaleDenominator')[0].innerHTML),
                };
                if (list) {
                    list = setList(list, data);
                    break;
                }
                list = {p: null, n: null, data};
                break;
            case 'ows:Title':
                title = cNode.innerHTML;
                break;
            case 'ows:Identifier':
                id = cNode.innerHTML;
                break;
            case 'ows:SupportedCRS':
                CRS = cNode.innerHTML.replace('urn:ogc:def:crs:', '').replace(/:+/g, ':');
                break;
            case 'WellKnownScaleSet':
                scaleSet = cNode.innerHTML;
                break;
            default:
        }
    }

    // order ids by scaleset
    max = list;
    while (max) {
        let t: ListEle<D> = max.p;
        while (t) {
            if (t.data.scale > max.data.scale) {
                max = t;
            }
            t = t.p;
        }
        ids.push(max.data.id);
        scales.push(max.data.scale);
        if (!max.n) {
            list = max.p;
        } else {
            max.n.p = max.p;
        }
        max = list;
    }

    return {id, title, CRS, ids, scales};
}



function parseContent(node: Element): Layer[] {
    let matrixSetsMap: any = {};
    const layers: Layer[] = [];

    for (let i = 0, l = node.children.length; i < l; i++) {
        const cNode = node.children[i];
        switch(cNode.tagName) {
            case 'Layer':
                layers.push(parseLayer(cNode));
                break;
            case 'TileMatrixSet':
                let tms: TileMatrixSet = parseTileMatrixSet(cNode);
                matrixSetsMap[tms.id] = tms;
                break;
            default:
        }
    }

    // mapping TileMatrixIds to layer
    for (let i = 0, l = layers.length; i < l; i++) {
        const mSets = layers[i].tileMatrixSets;
        for (let j = 0, l2 = mSets.length; j < l2; j++) {
            mSets[j] = {
                ...matrixSetsMap[mSets[j].id],
                lIds: mSets[j].lIds,
            };
        }
    }

    matrixSetsMap = null;

    return layers;
}

export enum GetTileType {
    rest = 'REST',
    restful = 'RESTFUL',
    kvp = 'KVP'
}
export interface GetTileMethod {
    type: GetTileType;
    url: string;
}
function parseOperations(node: Element): GetTileMethod[] {
    const methods: GetTileMethod[] = [];
    let nodesGet: HTMLCollection;

    for (let i = 0, l = node.children.length; i < l; i++) {
        if (node.children[i].getAttribute('name') === 'GetTile') {
            nodesGet = node.children[i].getElementsByTagName('ows:Get');
            break;
        }
    }

    for (let i = 0, l = nodesGet.length; i < l; i++) {
        if (nodesGet[i].parentNode.nodeName !== 'ows:HTTP') {
            continue;
        }
        let vNodes = nodesGet[i].getElementsByTagName('ows:Value');
        methods.push({
            type: (vNodes[0] && vNodes[0].innerHTML || GetTileType.rest) as GetTileType,
            url: nodesGet[i].getAttribute('xlink:href'),
        });
    }

    return methods;
}

export interface WMTSMetaData extends BaseInfo{
    provider?: string;
    getTileMethods: GetTileMethod[];
    layers: Layer[];
}

export function parseWMTSMetadata(xml: XMLDocument): WMTSMetaData {
    const rtNodes = xml.documentElement.children;
    let baseInfo: BaseInfo;
    let provider: string;
    let getTileMethods: GetTileMethod[];
    let layers: Layer[];

    for (let i = 0, l = rtNodes.length; i < l; i++) {
        switch (rtNodes[i].tagName) {
            case 'ows:ServiceIdentification':
                baseInfo = parseBaseInfo(rtNodes[i]);
                break;
            case 'ows:ServiceProvider':
                provider = getProvider(rtNodes[i]);
                break;
            case 'ows:OperationsMetadata':
                getTileMethods = parseOperations(rtNodes[i]);
                break;
            case 'Contents':
                layers = parseContent(rtNodes[i]);
                break;
            default:
        }
    }

    return {
        ...baseInfo,
        provider,
        getTileMethods,
        layers
    };
}
