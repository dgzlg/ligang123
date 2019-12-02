export interface WMSMetadata extends BaseInfo, Capability {
    version: string;
}
export function parseWMSMetadata(xml: XMLDocument): WMSMetadata {
    const version = xml.documentElement.getAttribute('version');
    const rtNodes = xml.documentElement.children;
    let baseInfo: BaseInfo;
    let capability: Capability;

    for (let i = 0, l = rtNodes.length; i < l; i++) {
        const crtNode = rtNodes[i];
        switch(crtNode.tagName) {
            case 'Service':
                baseInfo = parseServiceNode(crtNode);
                break;
            case 'Capability':
                capability = parseCapabilityNode(crtNode);
                break;
        }
    }

    return {
        ...baseInfo,
        ...capability,
        version,
    };
}

interface BaseInfo {
    name: string;
    title: string;
    maxTileSize?: {width: number, height: number};
    maxLayerCount?: number;
}
function parseServiceNode(node: Element): BaseInfo {
    let name: string;
    let title: string;
    let maxTileSize = {width: NaN, height: NaN};
    let maxLayerCount: number;
    let result: BaseInfo;

    for (let i = 0, l = node.children.length; i < l; i++) {
        const crtNode = node.children[i];
        switch(crtNode.tagName) {
            case 'Name':
                name = crtNode.innerHTML;
                break;
            case 'Title':
                title = crtNode.innerHTML;
                break;
            case 'MaxWidth':
                maxTileSize.width = parseInt(crtNode.innerHTML);
                break;
            case 'MaxHeight':
                maxTileSize.height = parseInt(crtNode.innerHTML);
                break;
            case 'LayerLimit':
                maxLayerCount = parseInt(crtNode.innerHTML);
                break;
        }
    }

    result = {name, title};

    if (maxLayerCount !== undefined) {
        result.maxLayerCount = maxLayerCount;
    }
    if (!isNaN(maxTileSize.width) && !isNaN(maxTileSize.height)) {
        result.maxTileSize = maxTileSize;
    }

    return result;
}

interface Capability extends RequestInfo{
    layersTree: Layer[];
    layersMap: Layer[];
}
function parseCapabilityNode(node: Element): Capability {
    let requestInfo: RequestInfo;
    let layersTree: Layer[] = [];
    let layersMap: Layer[] = [];

    for (let i = 0, l = node.children.length; i < l; i++) {
        const crtNode = node.children[i];
        switch(crtNode.tagName) {
            case 'Request':
                requestInfo = parseRequestNode(crtNode);
                break;
            case 'Layer':
                layersTree.push(parseLayerNode(crtNode, layersMap, null));
                break;
        }

    }

    return {...requestInfo, layersTree, layersMap};
}

interface RequestInfo {
    url: string;
    formats: string[];
}
function parseRequestNode(node: Element): RequestInfo {
    let formats:string[] = [];
    let url:string;

    // set node with 'GetMap' node
    for (let i = 0, l = node.children.length; i < l; i++) {
        if (node.children[i].tagName === 'GetMap') {
            node = node.children[i];
            break;
        }
    }

    for (let i = 0, l = node.children.length; i < l; i++) {
        const crtNode = node.children[i];
        if (crtNode.tagName === 'Format') {
            formats.push(crtNode.innerHTML);
            continue;
        }
        if (crtNode.tagName === 'DCPType') {
            url = crtNode.getElementsByTagName('OnlineResource')[0].getAttribute('xlink:href');
            continue;
        }
    }

    return {url, formats};
}

interface LatLng {
    lng: number;
    lat: number;
}
export interface Layer {
    name?: string;
    title: string;
    boundings: [string, LatLng, LatLng][];
    styles: Style[];
    parent: Layer | null;
    children: Layer[] | null;
}
function parseLayerNode(node: Element, map: Layer[], parent: Layer | null): Layer {
    let layer: Layer = {
        title: '',
        boundings: [],
        styles: [],
        children: [],
        parent,
    };

    // add layer to 'layersMap'
    map.push(layer);

    // parse <Layer> node
    for (let i = 0, l = node.children.length; i < l; i++) {
        const crtNode = node.children[i];
        switch(crtNode.tagName) {
            case 'Title':
                layer.title = crtNode.innerHTML;
                break;
            case 'Name':
                layer.name = crtNode.innerHTML;
                break;
            case 'CRS':
                // ignore tag <CRS>, the CRS will get from tag <BoundingBox>
                break;
            case 'BoundingBox':
                layer.boundings.push([
                    crtNode.getAttribute('CRS'),
                    {
                        lat: parseFloat(crtNode.getAttribute('miny')),
                        lng: parseFloat(crtNode.getAttribute('minx')),
                    },
                    {
                        lat: parseFloat(crtNode.getAttribute('maxy')),
                        lng: parseFloat(crtNode.getAttribute('maxx')),
                    },
                ]);
                break;
            case 'Style':
                layer.styles.push(parseStyleNode(crtNode));
                break;
            case 'Layer':
                layer.children.push(parseLayerNode(crtNode, map, layer));
                break;
        }
    }

    // remove empty children
    if (layer.children.length === 0) {
        layer.children = null;
    }

    return layer;
}

interface Style {
    name: string;
    title: string;
}
function parseStyleNode(node: Element): Style {
    const style: Style = {
        name: '',
        title: '',
    };

    for (let i = 0, l = node.children.length; i < l; i++) {
        const crtNode = node.children[i];
        switch(crtNode.tagName) {
            case 'Title':
                style.title = crtNode.innerHTML;
                break;
            case 'Name':
                style.name = crtNode.innerHTML;
                break;
        }
    }

    return style;
}
