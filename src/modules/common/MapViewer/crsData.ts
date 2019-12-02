function calcuResolutions(count: number, tileWidth: number, matrixWidthZero: number, lngWidth: number, ): number[] {
    const r = new Array(count);

    for (let i = 0; i < count; i++) {
        r[i] = lngWidth / (Math.pow(matrixWidthZero, i + 1) * tileWidth);
    }

    return r;
}

export default [
    {
        "code": "EPSG:4490",
        "definition": "+proj=longlat +ellps=GRS80 +no_defs",
        "wgs84Bounds": [[73.62, 16.7], [134.77, 53.56]],
        "resolutions": calcuResolutions(21, 256, 2, 134.77 - 73.62)
    },
    {
        "code": "EPSG:2056",
        "definition": "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs",
        "wgs84Bounds": [[5.140242, 45.398181], [11.47757, 48.230651]],
        "resolutions": [
            4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250,
            2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250,
            100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1
        ]
    },
]