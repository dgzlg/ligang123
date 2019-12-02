import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Photo.less';

const PADDING = 32;

class Photo extends Component {
    constructor ({ width, height }) {
        super();
        this.state = {
            width,
            height
        };
    }

    UNSAFE_componentWillReceiveProps ({ width, height }) {
        const { width: oldW, height: oldH } = this.state;
        if (width !== oldW || height !== oldH) {
            this.setState({ width, height });
        }
    }

    render() {
        const { width, height } = this.state;
        let svgWidth, svgHeight;
        if (width / height >= 2560 / 2160) {
            svgHeight = height - PADDING * 2;
            svgWidth = svgHeight * 2560 / 2160;
        } else {
            svgWidth = width - PADDING * 2;
            svgHeight = svgWidth / (2560 / 2160);
        }
        return (
            <div style={{ marginTop: `${(height - svgHeight) / 2}px`, marginLeft: `${(width - svgWidth) / 2}px` }}>
            <svg width={svgWidth} height={svgHeight} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2560 2160" xmlSpace="preserve">
                <defs>
                    <g id="computer">
                        <polygon className="loginSVG4" points="246.8,70.1 250,69.9 211.9,185.8 208.6,186"/>
                        <polygon className="loginSVG24" points="126.5,0.6 129.8,0.5 250,69.9 246.8,70.1"/>
                        <polygon className="loginSVG25" points="246.8,70.1 208.6,186 88.4,116.6 126.5,0.6"/>
                        <polygon className="loginSVG26" points="209.2,176.8 244,70.9 128.6,4.2 93.8,110.1"/>
                        <polygon className="loginSVG4" points="209.9,181.9 209.8,187.4 120.2,239.5 120.3,234"/>
                        <polygon className="loginSVG4" points="120.3,234 120.2,239.5 0,170.1 0,164.6"/>
                        <polygon className="loginSVG5" points="209.9,181.9 120.3,234 0,164.6 89.6,112.5"/>
                        <polygon className="loginSVG27" points="135.4,220 195,185.4 84,121.2 24.4,155.9"/>
                        <polygon className="loginSVG28" points="91.7,126 90.8,125.5 31.2,160.1 32.1,160.7"/>
                        <polygon className="loginSVG28" points="100.2,130.3 99.2,129.7 39.6,164.4 40.5,164.9"/>
                        <polygon className="loginSVG28" points="106.9,134.5 106,134 46.4,168.6 47.3,169.1"/>
                        <polygon className="loginSVG28" points="115.4,138.7 114.5,138.2 54.9,172.8 55.8,173.4"/>
                        <polygon className="loginSVG28" points="123.9,144.7 123,144.1 63.4,178.8 64.3,179.3"/>
                        <polygon className="loginSVG28" points="132.4,148.9 131.4,148.4 71.8,183 72.8,183.5"/>
                        <polygon className="loginSVG28" points="141.7,154 140.8,153.5 81.2,188.1 82.1,188.6"/>
                        <polygon className="loginSVG28" points="150.2,159.9 149.2,159.4 89.6,194 90.5,194.6"/>
                        <polygon className="loginSVG28" points="158.6,165 157.7,164.5 98.1,199.1 99,199.6"/>
                        <polygon className="loginSVG28" points="168,170.1 167,169.6 107.4,204.2 108.3,204.7"/>
                        <polygon className="loginSVG28" points="177.3,175.2 176.4,174.6 116.8,209.3 117.7,209.8"/>
                        <polygon className="loginSVG28" points="187.4,181.1 186.5,180.6 126.9,215.2 127.8,215.7"/>
                        <polygon className="loginSVG28" points="78,124.8 76.9,125.4 188,189.5 189,188.9"/>
                        <polygon className="loginSVG28" points="72.1,128.1 71,128.8 182,192.9 183.1,192.3"/>
                        <polygon className="loginSVG28" points="66.1,131.5 65.1,132.2 176.1,196.3 177.2,195.6"/>
                        <polygon className="loginSVG28" points="59.4,135.8 58.3,136.4 169.3,200.5 170.4,199.9"/>
                        <polygon className="loginSVG28" points="53.4,139.2 52.3,139.8 163.4,203.9 164.5,203.3"/>
                        <polygon className="loginSVG28" points="46.6,142.6 45.6,143.2 156.6,207.3 157.7,206.7"/>
                        <polygon className="loginSVG28" points="39.9,146.8 38.8,147.4 149.8,211.5 150.9,210.9"/>
                        <polygon className="loginSVG28" points="32.2,151 31.2,151.7 142.2,215.8 143.3,215.1"/>
                        <path className="loginSVG7" d="M184.2,69.9c7.9,4.6,12.2,16.5,9.4,26.6c-0.4,1.4-0.9,2.7-1.4,3.8c4.7,4.4,7.1,12.2,5.2,19.2
                            c-2.2,8.1-9,11.4-15.3,7.7l-38.5-21.5c-6.4-3.7-9.7-13.1-7.5-21.3c2.1-7.7,8.4-11.3,14.5-8.5c1.8-6.8,7.6-9.8,12.9-6.8
                            c1.8,1,3.3,2.6,4.4,4.5C171.7,68.2,178.2,66.4,184.2,69.9z"/>
                    </g>
                    <g id="server">
                        <polygon className="loginSVG4" points="128.4,114.7 198.9,73.7 198.2,334.6 127.7,375.5"/>
                        <polygon className="loginSVG5" points="0.7,41 71.2,0 198.9,73.7 128.4,114.7"/>
                        <polygon className="loginSVG4" points="128.4,114.7 127.7,375.5 0,301.8 0.7,41"/>
                        <g>
                            <polygon className="loginSVG6" points="119,125.9 9,62.1 9,97.5 119,161.3"/>
                            <polygon className="loginSVG7" points="115.4,145.2 115.4,146.8 111.1,144.3 111.1,142.7"/>
                            <polygon className="loginSVG8" points="115.4,140 115.4,141.7 111.1,139.2 111.1,137.6"/>
                            <polygon className="loginSVG8" points="100,130.5 100,126 18,78.1 18,82.9"/>
                            <polygon className="loginSVG8" points="100,138.5 100,134 18,86.1 18,90.9"/>
                            <polygon className="loginSVG7" points="115.4,134.4 115.4,136 111.1,133.5 111.1,131.9"/>
                        </g>
                        <g>
                            <polygon className="loginSVG6" points="119,173.9 9,110.1 9,145.5 119,209.3"/>
                            <polygon className="loginSVG7" points="115.4,193.2 115.4,194.8 111.1,192.3 111.1,190.7"/>
                            <polygon className="loginSVG8" points="115.4,188 115.4,189.7 111.1,187.2 111.1,185.6"/>
                            <polygon className="loginSVG8" points="100,178.5 100,174 18,126.1 18,130.9"/>
                            <polygon className="loginSVG8" points="100,186.5 100,182 18,134.1 18,138.9"/>
                            <polygon className="loginSVG7" points="115.4,182.4 115.4,184 111.1,181.5 111.1,179.9"/>
                        </g>
                        <g>
                            <polygon className="loginSVG6" points="119,221.9 9,158.1 9,193.5 119,257.3"/>
                            <polygon className="loginSVG7" points="115.4,241.2 115.4,242.8 111.1,240.3 111.1,238.7"/>
                            <polygon className="loginSVG8" points="115.4,236 115.4,237.7 111.1,235.2 111.1,233.6"/>
                            <polygon className="loginSVG8" points="100,226.5 100,222 18,174.1 18,178.9"/>
                            <polygon className="loginSVG8" points="100,234.5 100,230 18,182.1 18,186.9"/>
                            <polygon className="loginSVG7" points="115.4,230.4 115.4,232 111.1,229.5 111.1,227.9"/>
                        </g>
                        <g>
                            <polygon className="loginSVG6" points="119,269.9 9,206.1 9,241.5 119,305.3"/>
                            <polygon className="loginSVG7" points="115.4,289.2 115.4,290.8 111.1,288.3 111.1,286.7"/>
                            <polygon className="loginSVG8" points="115.4,284 115.4,285.7 111.1,283.2 111.1,281.6"/>
                            <polygon className="loginSVG8" points="100,274.5 100,270 18,222.1 18,226.9"/>
                            <polygon className="loginSVG8" points="100,282.5 100,278 18,230.1 18,234.9"/>
                            <polygon className="loginSVG7" points="115.4,278.4 115.4,280 111.1,277.5 111.1,275.9"/>
                        </g>
                        <g>
                            <polygon className="loginSVG6" points="119,317.9 9,254.1 9,289.5 119,353.3"/>
                            <polygon className="loginSVG7" points="115.4,337.2 115.4,338.8 111.1,336.3 111.1,334.7"/>
                            <polygon className="loginSVG8" points="115.4,332 115.4,333.7 111.1,331.2 111.1,329.6"/>
                            <polygon className="loginSVG8" points="100,322.5 100,318 18,270.1 18,274.9"/>
                            <polygon className="loginSVG8" points="100,330.5 100,326 18,278.1 18,282.9"/>
                            <polygon className="loginSVG7" points="115.4,326.4 115.4,328 111.1,325.5 111.1,323.9"/>
                        </g>
                    </g>
                    <g id="serverFloor">
                        <polygon className="loginSVG4" points="212.9,344 593.5,122.9 593.4,135.9 212.8,357.1"/>
                        <polygon className="loginSVG5" points="0,221.2 380.6,0 593.5,122.9 212.9,344"/>
                        <polygon className="loginSVG4" points="212.9,344 212.8,357.1 0,234.2 0,221.2"/>
                    </g>
                    <g id="serverGroup">
                        <use x="0" y="213.6" xlinkHref="#serverFloor"/>
                        <use x="322.2" y="0" xlinkHref="#server"/>
                        <use x="204.2" y="70" xlinkHref="#server"/>
                        <use x="80.2" y="142" xlinkHref="#server"/>
                    </g>
                    <circle id="motionPoint" className="loginSVG7" r="6"/>
                    <path id="outputPath" className="loginSVG3" d="M1093,1119 L175,1655"/>
                    <path id="sPath4" className="loginSVG3" d="M1844.3,1677.7 L1797.3,1706 L1226.3,1373 L1496.3,1214.3 L1450.3,1189"/>
                    <path id="sPath3" className="loginSVG3" d="M136.5,687.8 L86.5,716.8 L656.8,1046.3 L929.7,888.2 L974.5,914.3"/>
                    <path id="sPath2" className="loginSVG3" d="M2049,895 L1735.7,1077.3 L1689,1049"/>
                    <path id="sPath1" className="loginSVG3" d="M1484.7,565.7 L1171,748.3 L1212,773.7"/>
                </defs>
                <rect id="bg" className="loginSVG0" width="2560" height="2160"/>
                <g id="roads" className="loginSVG1">
                    <g id="computerR">
                        <g>
                            <polygon className="loginSVG2" points="26.7,997.1 6.8,1008.7 20.9,1016.8 40.8,1005.2"/>
                            <polygon className="loginSVG2" points="67,1020.4 52.8,1012.2 32.9,1023.8 47.1,1032"/>
                            <polygon className="loginSVG2" points="1967.1,2117.6 1947.1,2129.2 1965.5,2139.8 1985.4,2128.2"/>
                            <g>
                                <polygon className="loginSVG2" points="1908.8,2084 84.7,1030.8 64.7,1042.4 1888.9,2095.5"/>
                                <polygon className="loginSVG2" points="1928.5,2095.3 1908.6,2106.9 1927.4,2117.8 1947.4,2106.2"/>
                            </g>
                        </g>
                        <g>
                            <polygon className="loginSVG2" points="1486.6,1854 1476.5,1836.7 1394.5,1884.4 1414.4,1895.9"/>
                            <polygon className="loginSVG2" points="1382.5,1891.4 1370.2,1898.5 1390.2,1910 1402.4,1902.9"/>
                        </g>
                        <g>
                            <polygon className="loginSVG2" points="1246.6,1722 1236.5,1704.7 1160.1,1749.1 1180.1,1760.6"/>
                            <polygon className="loginSVG2" points="1148.1,1756.1 1135.9,1763.2 1155.9,1774.7 1168.1,1767.6"/>
                        </g>
                        <g>
                            <polygon className="loginSVG2" points="1029.6,1592 1019.5,1574.7 939.1,1621.4 959,1633"/>
                            <polygon className="loginSVG2" points="927.1,1628.4 914.8,1635.5 934.8,1647.1 947,1640"/>
                        </g>
                        <g>
                            <polygon className="loginSVG2" points="803.6,1464 793.5,1446.7 715.2,1492.2 735.2,1503.7"/>
                            <polygon className="loginSVG2" points="703.2,1499.2 691,1506.3 710.9,1517.8 723.2,1510.7"/>
                        </g>
                        <g>
                            <polygon className="loginSVG2" points="504.6,1291 494.5,1273.7 415.9,1319.4 435.8,1330.9"/>
                            <polygon className="loginSVG2" points="403.9,1326.4 391.7,1333.5 411.6,1345 423.8,1337.9"/>
                        </g>
                    </g>
                    <g id="outputR">
                        <polygon className="loginSVG2" points="119.5,1675.5 139.4,1687 159.4,1675.4 139.4,1663.9"/>
                        <polygon className="loginSVG2" points="81.5,1697.5 101.4,1709 121.4,1697.4 101.4,1685.9"/>
                        <polygon className="loginSVG2" points="1145.8,1102.3 1125.8,1090.7 1107.9,1101.1 1127.9,1112.6"/>
                        <polygon className="loginSVG2" points="1088,1112.7 158.4,1652.9 178.4,1664.4 1108,1124.2"/>
                    </g>
                    <g id="sRoad4">
                        <polygon className="loginSVG2" points="1797.7,1693.7 1244.3,1374.1 1516.7,1215.8 1455.3,1180.3 1435.4,1191.9 1476.8,1215.8 1204.4,1374.2 1797.8,1716.8 1896.6,1659.3 1886.5,1642"/>
                        <polygon className="loginSVG2" points="1415.3,1157.2 1395.4,1168.8 1415.4,1180.3 1435.3,1168.8"/>
                    </g>
                    <g id="sRoad3">
                        <polygon className="loginSVG2" points="929.5,876.8 657.1,1035.1 106.3,717.1 184.6,671.6 174.5,654.3 66.4,717.1 657.1,1058.2 929.6,899.9 966.9,921.4 986.8,909.8"/>
                        <polygon className="loginSVG2" points="1007.7,945 1027.7,933.4 1006.8,921.3 986.8,932.9"/>
                    </g>
                    <g id="sRoad2">
                        <polygon className="loginSVG2" points="1674,1030.1 1654,1018.5 1634.1,1030.1 1654.1,1041.6"/>
                        <polygon className="loginSVG2" points="1735.5,1088.6 2105.6,873.6 2095.5,856.3 1735.5,1065.5 1694,1041.6 1674.1,1053.2"/>
                    </g>
                    <g id="sRoad1">
                        <polygon className="loginSVG2" points="1246.4,806.3 1266.4,794.7 1245.5,782.6 1225.5,794.2"/>
                        <polygon className="loginSVG2" points="1188.2,749.6 1534.3,548.4 1524.3,531.1 1148.3,749.6 1205.6,782.7 1225.5,771.1"/>
                    </g>
                </g>
                <use xlinkHref="#motionPoint">
                    <animateMotion dur="2s" repeatCount="indefinite">
                        <mpath xlinkHref="#sPath1"/>
                    </animateMotion>
                </use>
                <use xlinkHref="#motionPoint">
                    <animateMotion dur="2s" repeatCount="indefinite">
                        <mpath xlinkHref="#sPath2"/>
                    </animateMotion>
                </use>
                <use xlinkHref="#motionPoint">
                    <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath xlinkHref="#sPath3"/>
                    </animateMotion>
                </use>
                <use xlinkHref="#motionPoint">
                    <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath xlinkHref="#sPath4"/>
                    </animateMotion>
                </use>
                <use xlinkHref="#motionPoint">
                    <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath xlinkHref="#outputPath"/>
                    </animateMotion>
                </use>
                <use x="1383.4" y="54.2" xlinkHref="#serverGroup" />
                <use x="1951.4" y="380.2" xlinkHref="#serverGroup" />
                <use x="31.4" y="178" xlinkHref="#serverGroup" />
                <use x="1742.4" y="1166" xlinkHref="#serverGroup" />
                <use x="99.5" y="1282.9" xlinkHref="#computer"/>
                <use x="399.5" y="1454.9" xlinkHref="#computer"/>
                <use x="624.5" y="1585.9" xlinkHref="#computer"/>
                <use x="846.5" y="1711.9" xlinkHref="#computer"/>
                <use x="1078.5" y="1846.9" xlinkHref="#computer"/>
                <polygon id="centerShadow" className="loginSVG10" points="1685.5,983.2 1333.1,1188 978.4,983.2 1330.8,778.4"/>
                <g id="center">
                    <polygon className="loginSVG4" points="1685.5,825.9 1685.4,838.9 1333,1043.7 1333.1,1030.7"/>
                    <polygon className="loginSVG4" points="1333.1,1030.7 1333,1043.7 978.3,838.9 978.4,825.9"/>
                    <polygon className="loginSVG5" points="1685.5,825.9 1333.1,1030.7 978.4,825.9 1330.8,621.1"/>
                </g>
                <line id="cDashLine3" className="loginSVG9" x1="1333" y1="1050" x2="1333" y2="1182">
                    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>
                </line>
                <line id="cDashLine2" className="loginSVG9" x1="982" y1="846" x2="982" y2="978">
                    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>
                </line>
                <line id="cDashLine1" className="loginSVG9" x1="1682" y1="845" x2="1682" y2="977">
                    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite"/>
                </line>
                <g id="clouds">
                    <g>
                        <g>
                            <defs>
                                <path id="XMLID_722_" d="M1179.1,798.3l0-3.3c0,8.9,6,17.8,18.2,24.7l0,3.3C1185.1,816.1,1179.1,807.2,1179.1,798.3z"/>
                            </defs>
                            <use xlinkHref="#XMLID_722_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_722_"/>
                            </clipPath>
                            <path className="loginSVG11" d="M1197.3,819.7l0,3.3c-12.2-6.9-18.2-15.8-18.2-24.7l0-3.3 C1179.1,803.9,1185.1,812.8,1197.3,819.7"/>
                        </g>
                        <g>
                            <defs>
                                <path id="XMLID_718_" d="M1466.4,822.1l0,3.3c0,11-7.3,22.1-21.8,30.5c-4,2.3-8.4,4.3-12.9,6l0-3.3c4.6-1.7,8.9-3.7,12.9-6 C1459.1,844.2,1466.4,833.1,1466.4,822.1z"/>
                            </defs>
                            <use xlinkHref="#XMLID_718_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_718_"/>
                            </clipPath>
                            <path className="loginSVG12" d="M1466.4,822.1l0,3.3c0,0.2,0,0.4,0,0.7l0-3.3C1466.4,822.5,1466.4,822.3,1466.4,822.1"/>
                            <path className="loginSVG12" d="M1466.4,822.7l0,3.3c0,1.4-0.2,2.9-0.5,4.3l0-3.3C1466.2,825.6,1466.4,824.2,1466.4,822.7"
                                />
                            <path className="loginSVG12" d="M1465.9,827.1l0,3.3c-0.3,1.4-0.7,2.8-1.2,4.2l0-3.3 C1465.2,829.9,1465.6,828.5,1465.9,827.1"/>
                            <path className="loginSVG12" d="M1464.7,831.3l0,3.3c-0.5,1.4-1.2,2.9-2,4.3l0-3.3C1463.5,834.1,1464.2,832.7,1464.7,831.3"/>
                            <path className="loginSVG12" d="M1462.7,835.5l0,3.3c-0.9,1.5-1.9,3-3,4.5l0-3.3C1460.9,838.6,1461.9,837.1,1462.7,835.5"
                                />
                            <path className="loginSVG12" d="M1459.7,840l0,3.3c-1.3,1.7-2.9,3.4-4.7,5l0-3.3C1456.8,843.4,1458.4,841.7,1459.7,840"/>
                            <path className="loginSVG12" d="M1455.1,845l0,3.3c-2.7,2.5-5.9,4.8-9.5,7l0-3.3C1449.2,849.9,1452.4,847.5,1455.1,845"/>
                            <path className="loginSVG12" d="M1445.6,852.1l0,3.3c-0.3,0.2-0.6,0.4-0.9,0.5c-4,2.3-8.4,4.3-12.9,6l0-3.3 c4.6-1.7,8.9-3.7,12.9-6C1444.9,852.4,1445.2,852.2,1445.6,852.1"/>
                        </g>
                        <polygon className="loginSVG13" points="1339.1,901.6 1339.1,904.8 1197.3,823 1197.3,819.7"/>
                        <g>
                            <defs>
                                <path id="XMLID_705_" d="M1441.2,877.4l0,3.3c0,8.8-5.8,17.5-17.3,24.2c-23.4,13.6-61.2,13.5-84.7-0.1l0-3.3 c23.5,13.6,61.4,13.7,84.7,0.1C1435.4,894.9,1441.1,886.2,1441.2,877.4z"/>
                            </defs>
                            <use xlinkHref="#XMLID_705_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_705_"/>
                            </clipPath>
                            <path className="loginSVG14" d="M1441.2,877.4l0,3.3c0,0.2,0,0.4,0,0.5l0-3.3C1441.2,877.8,1441.2,877.6,1441.2,877.4"/>
                            <path className="loginSVG14" d="M1441.2,878l0,3.3c0,1.1-0.2,2.3-0.4,3.4l0-3.3C1441,880.2,1441.1,879.1,1441.2,878"/>
                            <path className="loginSVG14" d="M1440.8,881.4l0,3.3c-0.2,1.1-0.5,2.2-1,3.3l0-3.3C1440.2,883.6,1440.5,882.5,1440.8,881.4"/>
                            <path className="loginSVG14" d="M1439.8,884.7l0,3.3c-0.4,1.1-1,2.3-1.6,3.4l0-3.3C1438.9,887,1439.4,885.9,1439.8,884.7"
                                />
                            <path className="loginSVG14" d="M1438.2,888.1l0,3.3c-0.7,1.2-1.5,2.4-2.4,3.5l0-3.3 C1436.8,890.5,1437.5,889.3,1438.2,888.1"/>
                            <path className="loginSVG14" d="M1435.8,891.6l0,3.3c-1.1,1.4-2.3,2.7-3.7,4l0-3.3C1433.5,894.3,1434.8,893,1435.8,891.6"
                                />
                            <path className="loginSVG14" d="M1432.2,895.6l0,3.3c-2.1,2-4.7,3.9-7.6,5.6l0-3.3C1427.5,899.5,1430,897.6,1432.2,895.6"
                                />
                            <path className="loginSVG14" d="M1424.6,901.2l0,3.3c-0.2,0.1-0.5,0.3-0.8,0.4c-4,2.3-8.4,4.2-13.1,5.8l0-3.3 c4.7-1.5,9.1-3.4,13.1-5.8C1424.1,901.5,1424.4,901.4,1424.6,901.2"/>
                            <path className="loginSVG14" d="M1410.7,907.4l0,3.3c-3.6,1.2-7.4,2.1-11.3,2.8l0-3.3 C1403.3,909.5,1407.1,908.6,1410.7,907.4"/>
                            <path className="loginSVG14" d="M1399.4,910.2l0,3.3c-2.5,0.5-5,0.8-7.6,1.1l0-3.3C1394.4,911,1396.9,910.7,1399.4,910.2"
                                />
                            <path className="loginSVG14" d="M1391.8,911.3l0,3.3c-2.2,0.2-4.4,0.4-6.6,0.4l0-3.3 C1387.4,911.7,1389.7,911.5,1391.8,911.3"/>
                            <path className="loginSVG14" d="M1385.2,911.7l0,3.3c-2,0.1-4.1,0.1-6.1,0l0-3.3C1381.2,911.8,1383.2,911.8,1385.2,911.7"
                                />
                            <path className="loginSVG14" d="M1379.1,911.8l0,3.3c-2,0-3.9-0.2-5.9-0.3l0-3.3C1375.2,911.6,1377.1,911.7,1379.1,911.8"
                                />
                            <path className="loginSVG14" d="M1373.2,911.5l0,3.3c-2-0.2-3.9-0.4-5.8-0.7l0-3.3C1369.3,911.1,1371.3,911.3,1373.2,911.5"/>
                            <path className="loginSVG14" d="M1367.4,910.8l0,3.3c-2-0.3-4-0.6-6-1l0-3.3C1363.4,910.2,1365.4,910.5,1367.4,910.8"/>
                            <path className="loginSVG14" d="M1361.4,909.8l0,3.3c-2.1-0.4-4.2-1-6.3-1.5l0-3.3C1357.2,908.8,1359.3,909.3,1361.4,909.8"/>
                            <path className="loginSVG14" d="M1355.2,908.2l0,3.3c-2.5-0.7-5-1.5-7.3-2.5l0-3.3C1350.2,906.7,1352.7,907.5,1355.2,908.2"/>
                            <path className="loginSVG14" d="M1347.8,905.8l0,3.3c-3.1-1.2-6-2.6-8.7-4.2l0-3.3C1341.9,903.1,1344.8,904.5,1347.8,905.8"/>
                        </g>
                        <path className="loginSVG15" d="M1444.3,791.2c29.4,17,29.5,44.5,0.3,61.4c-4,2.3-8.4,4.3-12.9,6 c14.8,13.4,12.3,31.4-7.8,43.1c-23.4,13.6-61.2,13.5-84.7-0.1l-141.8-81.9c-24.3-13.7-24-35.4-0.6-49 c22.2-12.9,57.5-13.5,81.1-1.9c19.6-11.4,51.3-11.4,70.9-0.1c6.6,3.8,10.9,8.4,13.1,13.3C1389.1,775.2,1421.9,778.2,1444.3,791.2z"/>
                    </g>
                    <g className="loginSVG16">
                        <g>
                            <defs>
                                <path id="XMLID_749_" d="M1179.1,748.3l0-3.3c0,8.9,6,17.8,18.2,24.7l0,3.3C1185.1,766.1,1179.1,757.2,1179.1,748.3z"/>
                            </defs>
                            <use xlinkHref="#XMLID_749_"/>
                            <clipPath id="XMLID_222_">
                                <use xlinkHref="#XMLID_749_"/>
                            </clipPath>
                            <path id="XMLID_748_" className="loginSVG17" d="M1197.3,769.7l0,3.3c-12.2-6.9-18.2-15.8-18.2-24.7l0-3.3 C1179.1,753.9,1185.1,762.8,1197.3,769.7"/>
                        </g>
                        <g>
                            <defs>
                                <path id="XMLID_746_" d="M1466.4,772.1l0,3.3c0,11-7.3,22.1-21.8,30.5c-4,2.3-8.4,4.3-12.9,6l0-3.3c4.6-1.7,8.9-3.7,12.9-6 C1459.1,794.2,1466.4,783.1,1466.4,772.1z"/>
                            </defs>
                            <use xlinkHref="#XMLID_746_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_746_"/>
                            </clipPath>
                            <path className="loginSVG18" d="M1466.4,772.1l0,3.3c0,0.2,0,0.4,0,0.7l0-3.3C1466.4,772.5,1466.4,772.3,1466.4,772.1"/>
                            <path className="loginSVG18" d="M1466.4,772.7l0,3.3c0,1.4-0.2,2.9-0.5,4.3l0-3.3C1466.2,775.6,1466.4,774.2,1466.4,772.7"
                                />
                            <path className="loginSVG18" d="M1465.9,777.1l0,3.3c-0.3,1.4-0.7,2.8-1.2,4.2l0-3.3 C1465.2,779.9,1465.6,778.5,1465.9,777.1"/>
                            <path className="loginSVG18" d="M1464.7,781.3l0,3.3c-0.5,1.4-1.2,2.9-2,4.3l0-3.3C1463.5,784.1,1464.2,782.7,1464.7,781.3"/>
                            <path className="loginSVG18" d="M1462.7,785.5l0,3.3c-0.9,1.5-1.9,3-3,4.5l0-3.3C1460.9,788.6,1461.9,787.1,1462.7,785.5"
                                />
                            <path className="loginSVG18" d="M1459.7,790l0,3.3c-1.3,1.7-2.9,3.4-4.7,5l0-3.3C1456.8,793.4,1458.4,791.7,1459.7,790"/>
                            <path className="loginSVG18" d="M1455.1,795l0,3.3c-2.7,2.5-5.9,4.8-9.5,7l0-3.3C1449.2,799.9,1452.4,797.5,1455.1,795"/>
                            <path className="loginSVG18" d="M1445.6,802.1l0,3.3c-0.3,0.2-0.6,0.4-0.9,0.5c-4,2.3-8.4,4.3-12.9,6l0-3.3 c4.6-1.7,8.9-3.7,12.9-6C1444.9,802.4,1445.2,802.2,1445.6,802.1"/>
                        </g>
                        <polygon className="loginSVG13" points="1339.1,851.6 1339.1,854.8 1197.3,773 1197.3,769.7"/>
                        <g>
                            <defs>
                                <path id="XMLID_735_" d="M1441.2,827.4l0,3.3c0,8.8-5.8,17.5-17.3,24.2c-23.4,13.6-61.2,13.5-84.7-0.1l0-3.3 c23.5,13.6,61.4,13.7,84.7,0.1C1435.4,844.9,1441.1,836.2,1441.2,827.4z"/>
                            </defs>
                            <use xlinkHref="#XMLID_735_"/>
                            <clipPath id="XMLID_260_">
                                <use xlinkHref="#XMLID_735_"/>
                            </clipPath>
                            <path className="loginSVG19" d="M1441.2,827.4l0,3.3c0,0.2,0,0.4,0,0.5l0-3.3C1441.2,827.8,1441.2,827.6,1441.2,827.4"/>
                            <path className="loginSVG19" d="M1441.2,828l0,3.3c0,1.1-0.2,2.3-0.4,3.4l0-3.3C1441,830.2,1441.1,829.1,1441.2,828"/>
                            <path className="loginSVG19" d="M1440.8,831.4l0,3.3c-0.2,1.1-0.5,2.2-1,3.3l0-3.3C1440.2,833.6,1440.5,832.5,1440.8,831.4"/>
                            <path className="loginSVG19" d="M1439.8,834.7l0,3.3c-0.4,1.1-1,2.3-1.6,3.4l0-3.3C1438.9,837,1439.4,835.9,1439.8,834.7"
                                />
                            <path className="loginSVG19" d="M1438.2,838.1l0,3.3c-0.7,1.2-1.5,2.4-2.4,3.5l0-3.3 C1436.8,840.5,1437.5,839.3,1438.2,838.1"/>
                            <path className="loginSVG19" d="M1435.8,841.6l0,3.3c-1.1,1.4-2.3,2.7-3.7,4l0-3.3C1433.5,844.3,1434.8,843,1435.8,841.6"
                                />
                            <path className="loginSVG19" d="M1432.2,845.6l0,3.3c-2.1,2-4.7,3.9-7.6,5.6l0-3.3C1427.5,849.5,1430,847.6,1432.2,845.6"
                                />
                            <path className="loginSVG19" d="M1424.6,851.2l0,3.3c-0.2,0.1-0.5,0.3-0.8,0.4c-4,2.3-8.4,4.2-13.1,5.8l0-3.3 c4.7-1.5,9.1-3.4,13.1-5.8C1424.1,851.5,1424.4,851.4,1424.6,851.2"/>
                            <path className="loginSVG19" d="M1410.7,857.4l0,3.3c-3.6,1.2-7.4,2.1-11.3,2.8l0-3.3 C1403.3,859.5,1407.1,858.6,1410.7,857.4"/>
                            <path className="loginSVG19" d="M1399.4,860.2l0,3.3c-2.5,0.5-5,0.8-7.6,1.1l0-3.3C1394.4,861,1396.9,860.7,1399.4,860.2"
                                />
                            <path className="loginSVG19" d="M1391.8,861.3l0,3.3c-2.2,0.2-4.4,0.4-6.6,0.4l0-3.3 C1387.4,861.7,1389.7,861.5,1391.8,861.3"/>
                            <path className="loginSVG19" d="M1385.2,861.7l0,3.3c-2,0.1-4.1,0.1-6.1,0l0-3.3C1381.2,861.8,1383.2,861.8,1385.2,861.7"
                                />
                            <path className="loginSVG19" d="M1379.1,861.8l0,3.3c-2,0-3.9-0.2-5.9-0.3l0-3.3C1375.2,861.6,1377.1,861.7,1379.1,861.8"
                                />
                            <path className="loginSVG19" d="M1373.2,861.5l0,3.3c-2-0.2-3.9-0.4-5.8-0.7l0-3.3C1369.3,861.1,1371.3,861.3,1373.2,861.5"/>
                            <path className="loginSVG19" d="M1367.4,860.8l0,3.3c-2-0.3-4-0.6-6-1l0-3.3C1363.4,860.2,1365.4,860.5,1367.4,860.8"/>
                            <path className="loginSVG19" d="M1361.4,859.8l0,3.3c-2.1-0.4-4.2-1-6.3-1.5l0-3.3C1357.2,858.8,1359.3,859.3,1361.4,859.8"/>
                            <path className="loginSVG19" d="M1355.2,858.2l0,3.3c-2.5-0.7-5-1.5-7.3-2.5l0-3.3C1350.2,856.7,1352.7,857.5,1355.2,858.2"/>
                            <path className="loginSVG19" d="M1347.8,855.8l0,3.3c-3.1-1.2-6-2.6-8.7-4.2l0-3.3C1341.9,853.1,1344.8,854.5,1347.8,855.8"/>
                        </g>
                        <path className="loginSVG15" d="M1444.3,741.2c29.4,17,29.5,44.5,0.3,61.4c-4,2.3-8.4,4.3-12.9,6 c14.8,13.4,12.3,31.4-7.8,43.1c-23.4,13.6-61.2,13.5-84.7-0.1l-141.8-81.9c-24.3-13.7-24-35.4-0.6-49 c22.2-12.9,57.5-13.5,81.1-1.9c19.6-11.4,51.3-11.4,70.9-0.1c6.6,3.8,10.9,8.4,13.1,13.3C1389.1,725.2,1421.9,728.2,1444.3,741.2z"/>
                        <animateMotion path="m0,0 l0,-40 l0,80 l0,-40" dur="4s" repeatCount="indefinite"/>
                    </g>
                    <g className="loginSVG20">
                        <g>
                            <defs>
                                <path id="XMLID_785_" d="M1179.1,700.3l0-3.3c0,8.9,6,17.8,18.2,24.7l0,3.3C1185.1,718.1,1179.1,709.2,1179.1,700.3z"/>
                            </defs>
                            <use xlinkHref="#XMLID_785_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_785_"/>
                            </clipPath>
                            <path className="loginSVG21" d="M1197.3,721.7l0,3.3c-12.2-6.9-18.2-15.8-18.2-24.7l0-3.3 C1179.1,705.9,1185.1,714.8,1197.3,721.7"/>
                        </g>
                        <g>
                            <defs>
                                <path id="XMLID_782_" d="M1466.4,724.1l0,3.3c0,11-7.3,22.1-21.8,30.5c-4,2.3-8.4,4.3-12.9,6l0-3.3c4.6-1.7,8.9-3.7,12.9-6 C1459.1,746.2,1466.4,735.1,1466.4,724.1z"/>
                            </defs>
                            <use xlinkHref="#XMLID_782_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_782_"/>
                            </clipPath>
                            <path className="loginSVG22" d="M1466.4,724.1l0,3.3c0,0.2,0,0.4,0,0.7l0-3.3C1466.4,724.5,1466.4,724.3,1466.4,724.1"/>
                            <path className="loginSVG22" d="M1466.4,724.7l0,3.3c0,1.4-0.2,2.9-0.5,4.3l0-3.3C1466.2,727.6,1466.4,726.2,1466.4,724.7"
                                />
                            <path className="loginSVG22" d="M1465.9,729.1l0,3.3c-0.3,1.4-0.7,2.8-1.2,4.2l0-3.3 C1465.2,731.9,1465.6,730.5,1465.9,729.1"/>
                            <path className="loginSVG22" d="M1464.7,733.3l0,3.3c-0.5,1.4-1.2,2.9-2,4.3l0-3.3C1463.5,736.1,1464.2,734.7,1464.7,733.3"/>
                            <path className="loginSVG22" d="M1462.7,737.5l0,3.3c-0.9,1.5-1.9,3-3,4.5l0-3.3C1460.9,740.6,1461.9,739.1,1462.7,737.5"
                                />
                            <path className="loginSVG22" d="M1459.7,742l0,3.3c-1.3,1.7-2.9,3.4-4.7,5l0-3.3C1456.8,745.4,1458.4,743.7,1459.7,742"/>
                            <path className="loginSVG22" d="M1455.1,747l0,3.3c-2.7,2.5-5.9,4.8-9.5,7l0-3.3C1449.2,751.9,1452.4,749.5,1455.1,747"/>
                            <path className="loginSVG22" d="M1445.6,754.1l0,3.3c-0.3,0.2-0.6,0.4-0.9,0.5c-4,2.3-8.4,4.3-12.9,6l0-3.3 c4.6-1.7,8.9-3.7,12.9-6C1444.9,754.4,1445.2,754.2,1445.6,754.1"/>
                        </g>
                        <polygon className="loginSVG13" points="1339.1,803.6 1339.1,806.8 1197.3,725 1197.3,721.7"/>
                        <g>
                            <defs>
                                <path id="XMLID_771_" d="M1441.2,779.4l0,3.3c0,8.8-5.8,17.5-17.3,24.2c-23.4,13.6-61.2,13.5-84.7-0.1l0-3.3 c23.5,13.6,61.4,13.7,84.7,0.1C1435.4,796.9,1441.1,788.2,1441.2,779.4z"/>
                            </defs>
                            <use xlinkHref="#XMLID_771_"/>
                            <clipPath>
                                <use xlinkHref="#XMLID_771_"/>
                            </clipPath>
                            <path className="loginSVG23" d="M1441.2,779.4l0,3.3c0,0.2,0,0.4,0,0.5l0-3.3C1441.2,779.8,1441.2,779.6,1441.2,779.4"/>
                            <path className="loginSVG23" d="M1441.2,780l0,3.3c0,1.1-0.2,2.3-0.4,3.4l0-3.3C1441,782.2,1441.1,781.1,1441.2,780"/>
                            <path className="loginSVG23" d="M1440.8,783.4l0,3.3c-0.2,1.1-0.5,2.2-1,3.3l0-3.3C1440.2,785.6,1440.5,784.5,1440.8,783.4"/>
                            <path className="loginSVG23" d="M1439.8,786.7l0,3.3c-0.4,1.1-1,2.3-1.6,3.4l0-3.3C1438.9,789,1439.4,787.9,1439.8,786.7"
                                />
                            <path className="loginSVG23" d="M1438.2,790.1l0,3.3c-0.7,1.2-1.5,2.4-2.4,3.5l0-3.3 C1436.8,792.5,1437.5,791.3,1438.2,790.1"/>
                            <path className="loginSVG23" d="M1435.8,793.6l0,3.3c-1.1,1.4-2.3,2.7-3.7,4l0-3.3C1433.5,796.3,1434.8,795,1435.8,793.6"
                                />
                            <path className="loginSVG23" d="M1432.2,797.6l0,3.3c-2.1,2-4.7,3.9-7.6,5.6l0-3.3C1427.5,801.5,1430,799.6,1432.2,797.6"
                                />
                            <path className="loginSVG23" d="M1424.6,803.2l0,3.3c-0.2,0.1-0.5,0.3-0.8,0.4c-4,2.3-8.4,4.2-13.1,5.8l0-3.3 c4.7-1.5,9.1-3.4,13.1-5.8C1424.1,803.5,1424.4,803.4,1424.6,803.2"/>
                            <path className="loginSVG23" d="M1410.7,809.4l0,3.3c-3.6,1.2-7.4,2.1-11.3,2.8l0-3.3 C1403.3,811.5,1407.1,810.6,1410.7,809.4"/>
                            <path className="loginSVG23" d="M1399.4,812.2l0,3.3c-2.5,0.5-5,0.8-7.6,1.1l0-3.3C1394.4,813,1396.9,812.7,1399.4,812.2"
                                />
                            <path className="loginSVG23" d="M1391.8,813.3l0,3.3c-2.2,0.2-4.4,0.4-6.6,0.4l0-3.3 C1387.4,813.7,1389.7,813.5,1391.8,813.3"/>
                            <path className="loginSVG23" d="M1385.2,813.7l0,3.3c-2,0.1-4.1,0.1-6.1,0l0-3.3C1381.2,813.8,1383.2,813.8,1385.2,813.7"
                                />
                            <path className="loginSVG23" d="M1379.1,813.8l0,3.3c-2,0-3.9-0.2-5.9-0.3l0-3.3C1375.2,813.6,1377.1,813.7,1379.1,813.8"
                                />
                            <path className="loginSVG23" d="M1373.2,813.5l0,3.3c-2-0.2-3.9-0.4-5.8-0.7l0-3.3C1369.3,813.1,1371.3,813.3,1373.2,813.5"/>
                            <path className="loginSVG23" d="M1367.4,812.8l0,3.3c-2-0.3-4-0.6-6-1l0-3.3C1363.4,812.2,1365.4,812.5,1367.4,812.8"/>
                            <path className="loginSVG23" d="M1361.4,811.8l0,3.3c-2.1-0.4-4.2-1-6.3-1.5l0-3.3C1357.2,810.8,1359.3,811.3,1361.4,811.8"/>
                            <path className="loginSVG23" d="M1355.2,810.2l0,3.3c-2.5-0.7-5-1.5-7.3-2.5l0-3.3C1350.2,808.7,1352.7,809.5,1355.2,810.2"/>
                            <path className="loginSVG23" d="M1347.8,807.8l0,3.3c-3.1-1.2-6-2.6-8.7-4.2l0-3.3C1341.9,805.1,1344.8,806.5,1347.8,807.8"/>
                        </g>
                        <path className="loginSVG15" d="M1444.3,693.2c29.4,17,29.5,44.5,0.3,61.4c-4,2.3-8.4,4.3-12.9,6 c14.8,13.4,12.3,31.4-7.8,43.1c-23.4,13.6-61.2,13.5-84.7-0.1l-141.8-81.9c-24.3-13.7-24-35.4-0.6-49 c22.2-12.9,57.5-13.5,81.1-1.9c19.6-11.4,51.3-11.4,70.9-0.1c6.6,3.8,10.9,8.4,13.1,13.3C1389.1,677.2,1421.9,680.2,1444.3,693.2z"/>
                    </g>
                </g>
            </svg>
            </div>
        );
    }
}

Photo.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default Photo;