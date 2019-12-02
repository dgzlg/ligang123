import React from 'react';
import PropTypes from 'prop-types';
import ReactEchartsCore from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import {connect} from 'react-redux';
import './index.less';
import InitialCallback from "../../common/InitialCallback";

import {prefix, getResStatistics, getResDist, getDynamic, getContributionRank, getUseRank, jumpPage} from "../action";

const Home = ({winWidth, dispatch, resStatistics, resDistribution, dynamic, contributionRank, useRank}) => {
    const init = () => {
        dispatch(getResStatistics());
        dispatch(getResDist());
        dispatch(getDynamic());
        dispatch(getContributionRank());
        dispatch(getUseRank());
    };
    const areaWidth = winWidth - 234;
    const resStatisticsGrid = () => {
        const statistics = [{
            title: '部门资源',
            unit: '条',
            class: "icon_department",
            dataIndex: "orgResource",
            url: "/directory/mine"
        },
            {title: '已申请资源', unit: '条', class: "icon_applied", dataIndex: "appliedResource", url: "/resource/approved"},
            {
                title: '已发布资源',
                unit: '条',
                class: "icon_published",
                dataIndex: "publishedResource",
                url: "/resource/publish-log"
            },
            {title: '被使用资源', unit: '条', class: "icon_used", dataIndex: "usedResource", url: "/demand/respond-list"}];
        return statistics.map(s => {
            let data = resStatistics[s.dataIndex];
            if (undefined == data) {
                data = {FILE: 0, API: 0, MAP: 0};
            }
            data = {FILE: 0, API: 0, MAP: 0, ...data};
            return (<div className="middle_part" key={s.dataIndex}>
                <div className="middle_title">{s.title}</div>
                <div className={`icon_two ${s.class}`} onClick={() => {
                    handleJumpPage(s.url);
                }}/>
                <div className="details">
                    <p>{`文件资源：${data.FILE}${s.unit}`}</p>
                    <p>{`API资源：${data.API}${s.unit}`}</p>
                    <p>{`地图资源：${data.MAP}${s.unit}`}</p>
                </div>
            </div>);
        });
    };

    const resTypeNames = {"FILE": "文件", "API": "API", "MAP": "地图"};
    const typeNames = {"resource": "资源", "need": "需求"};

    const dynamicGrid = () => {
        return dynamic.map(d => {
            const resTypeName = resTypeNames[d.resourceType] == undefined ? "" : resTypeNames[d.resourceType];
            return (<div key={`${d.id}_${d.type}_${d.name}`}>
                <div className="news_time">{d.createDate}</div>
                <div className="news_description">{`${d.orgName}发布了一条${resTypeName}${typeNames[d.type]}`}</div>
            </div>);
        });
    };

    const contributionRankGrid = () => {
        const ranking = [], orgNames = [], exCount = [];
        contributionRank.forEach(d => {
            ranking.push(<li key={d.rank}>{d.rank}</li>);
            orgNames.push(<li key={d.rank}>{d.name}</li>);
            exCount.push(<li key={d.rank}>{d.num}</li>);
        });
        return <div className="contribution_table">
            <div className="table_title">贡献排名</div>
            <ul className="ranking">
                <li>排名</li>
                {ranking}
            </ul>
            <ul className="department_name">
                <li>部门</li>
                {orgNames}
            </ul>
            <ul className="exchange_capacity">
                <li>交换量</li>
                {exCount}
            </ul>
        </div>;
    };

    const useRankGrid = () => {
        const ranking = [], orgNames = [], exCount = [];
        useRank.forEach(d => {
            ranking.push(<li key={d.rank}>{d.rank}</li>);
            orgNames.push(<li key={d.rank}>{d.name}</li>);
            exCount.push(<li key={d.rank}>{d.num}</li>);
        });
        return <div className="used_table">
            <div className="table_title">使用排名</div>
            <ul className="ranking">
                <li>排名</li>
                {ranking}
            </ul>
            <ul className="department_name">
                <li>部门</li>
                {orgNames}
            </ul>
            <ul className="exchange_capacity">
                <li>交换量</li>
                {exCount}
            </ul>
        </div>;
    };

    const handleJumpPage = (url) => {
        dispatch(jumpPage(url));
    };

    const getPieOption = () => {
        let data = [];
        let legend = [];
        resDistribution.forEach(({resourceType, num}, index) => {
            data.push({
                name: resourceType,
                value: num,
            });
            legend.push(resourceType);
        });
        return {
            backgroundColor: {color: '#fff'},
            title: {
                text: "资源分布",
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                left: 0,
                top: 0,
                padding: 0,
                itemHeight: 8,
                data: legend,
                formatter: (text) => {
                    if (text.length > 10) {
                        return `${text.slice(0, 8)}...`;
                    }
                    return text;
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br />{c} （{d}%）',
            },
            series: [
                {
                    type: 'pie',
                    radius: '55%',
                    hoverAnimation: false,
                    minAngle: 3,
                    data,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                //自定义颜色
                                var colorList = [
                                    '#da552a',
                                    '#00a8ec',
                                    '#efd25e',
                                ];
                                return colorList[params.dataIndex];
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                },
            ],
        };
    };

    const getBarOption = () => {
        const SimulateData = [
            {name: '基础地图', value: 40},
            {name: '工程地图', value: 80},
            {name: '水业地图', value: 200},
            {name: '矿产地图', value: 300},
            {name: '环境地图', value: 400},
            {name: '地理地图', value: 310}
        ];
        let data = [];
        let legend = [];
        SimulateData.forEach(({name, value}, index) => {
            data.push(value);
            legend.push(name);
        });
        const option = {
            title: {
                text: "资源统计",
                x: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'}
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: legend,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                    data,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#74b468',
                                    '#8dcff4',
                                    '#ffaf60',
                                    '#00a8ec',
                                    "#00bcb5",
                                    '#da552a',
                                ];
                                return colorList[params.dataIndex];
                            }
                        }
                    },
                }
            ],
        };
        return option;
    };

    return (
        <div className="home_container" style={{width: areaWidth}}>
            <InitialCallback key="init" actions={init}/>
            <div className="left_container">
                <div className="top_container">
                    <div className="top_part" onClick={() => {
                        handleJumpPage("/directory/mine");
                    }}>
                        <div className="icon icon_configuration"/>
                        <span className="title">目录配置</span>
                    </div>
                    <div className="top_part" onClick={() => {
                        handleJumpPage("/resource/publish");
                    }}>
                        <div className="icon icon_release"/>
                        <span className="title">资源发布</span>
                    </div>
                    <div className="top_part" onClick={() => {
                        handleJumpPage("/resource/share-center");
                    }}>
                        <div className="icon icon_lookup"/>
                        <span className="title">资源查找</span>
                    </div>
                    <div className="top_part" onClick={() => {
                        handleJumpPage("/demand/center");
                    }}>
                        <div className="icon icon_need_release"/>
                        <span className="title">需求发布</span>
                    </div>
                </div>
                <div className="middle_container">
                    {resStatisticsGrid()}
                </div>
                <div className="bottom_container">
                    <ReactEchartsCore
                        echarts={echarts}
                        option={getPieOption()}
                        style={{width: '50%', height: '100%', padding: 10}}
                    />
                    <ReactEchartsCore
                        echarts={echarts}
                        option={getBarOption()}
                        style={{width: '50%', height: '100%', padding: 10}}
                    />
                </div>
            </div>
            <div className="right_container">
                <div className="recent_news">
                    <div className="news_title">最新动态</div>
                    <div className="icon_three icon_news"/>
                    <div className="news">
                        {dynamicGrid()}
                    </div>
                </div>
                {contributionRankGrid()}
                {useRankGrid()}
            </div>
        </div>
    );
};

Home.propTypes = {
    winWidth: PropTypes.number,
    winHeight: PropTypes.number,
    resStatistics: PropTypes.object.isRequired,
    resDistribution: PropTypes.array.isRequired,
    dynamic: PropTypes.array.isRequired,
    contributionRank: PropTypes.array.isRequired,
    useRank: PropTypes.array.isRequired,

    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({Main: {winWidth, winHeight}, [prefix]: {resStatistics, resDistribution, dynamic, contributionRank, useRank}}) => {
    return {winWidth, winHeight, resStatistics, resDistribution, dynamic, contributionRank, useRank};
};

export default connect(mapStateToProps)(Home);
