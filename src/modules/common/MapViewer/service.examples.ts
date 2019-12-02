export const CPN_WMS = {
    url: 'http://192.168.50.90:8080/geoserver/exchange/wms',
    options: {
        service: 'WMS',
        version: '1.1.0',
        request: 'GetMap',
        layers: 'exchange:BOUA_sheng_2',
        styles: '',
        format: 'image/jpeg',
    },
};

export const CPN_WMTS = {
    url1: 'http://192.168.50.90:8080/geoserver/gwc/rest/wmts?Service=WMTS&Version={version}&Request={request}&layer={layer}&style={style}&tilematrixset={tileMatrixSet}&TileMatrix={tileMatrixSet}:{z}&TileRow={y}&TileCol={x}&Format={format}',
    url: 'http://192.168.50.90:8080/geoserver/gwc/rest/wmts/exchange:BOUA_sheng_2/{style}/{tileMatrixSet}/{tileMatrixSet}:{z}/{y}/{x}?format=image/jpeg',
    upperCorner: [29.22577091587696, 106.19697347568469],
    lowerCorner: [21.14211537722651, 97.52755365959696],
    options: {
        request: 'GetTile',
        layer: 'exchange:BOUA_sheng_2',
        version: '1.0.0',
        tileMatrixSet: 'EPSG:4326',
        uppercase: true,
        style: 'polygon',
        format: 'image/jpeg',
    },
};

export const TDT_WMTS = {
    url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=3f7cfd96d6eaac862547d64d4657c108',
    options: {
        service: 'WMTS',
        version: '1.0.0',
        request: 'GetTile',
        layer: 'img',
        style: 'default',
        tileMatrixSet: 'w',
        format: 'tiles',
        uppercase: true,
    },
};

