import createAction from '../common/utils/createAction';
import {push} from 'connected-react-router';
import {host} from '../../config/api';
import {message} from "antd";

export const prefix = 'Home';

export const UPDATE_RES_STAT    = `${prefix}/updateResStatistic`;
export const UPDATE_RES_DIST    = `${prefix}/updateResDist`;
export const UPDATE_DYNAMIC     = `${prefix}/updateDynamic`;
export const UPDATE_CONTR_RANK  = `${prefix}/updateContributionRank`;
export const UPDATE_USE_RANK    = `${prefix}/updateUseRank`;

/**
 * 获取资源统计信息
 * @param params 
 * @returns {function(*, *, *)}
 */
export const getResStatistics = (data = {}) => {
    return (request,dispatch) => {
        request({
            method:'GET',
            url: `${host}/rest/busi/home_page/resource_statistics`
        }).then((data) => {
            const result = {};
            for(var prop in data){
                const res = {}
                data[prop].forEach(element => {
                    res[element.resourceType] = element.num;
                });
                result[prop] = res
            }
            dispatch({
                type:UPDATE_RES_STAT,
                resStatistics: result
            });
        }).catch((err) => {
            message.error(err.message);
        })
    }
}

/**
 * 获取资源分布数据
 * @param params 
 * @returns {function(*, *, *)}
 */
export const getResDist = (data = {}) => {
    return (request,dispatch) => {
        request({
            method:'GET',
            url: `${host}/rest/busi/home_page/resource_distribution`
        }).then((data) => {
            dispatch({
                type:UPDATE_RES_DIST,
                resDistribution: data
            });
        }).catch((err) => {
            message.error(err.message);
        })
    }
}

/**
 * 获取最新动态
 * @param params 
 * @returns {function(*, *, *)}
 */
export const getDynamic = (data = {}) => {
    //条数限制
    const limit = 4;
    return (request,dispatch) => {
        request({
            method:'GET',
            url: `${host}/rest/busi/home_page/dynamic`,
            params:{size:limit}
        }).then((data) => {
            dispatch({
                type:UPDATE_DYNAMIC,
                dynamic: data
            });
        }).catch((err) => {
            message.error(err.message);
        })
    }
}

/**
 * 获取资源贡献排名
 * @param params 
 * @returns {function(*, *, *)}
 */
export const getContributionRank = (data = {}) => {
    return (request,dispatch) => {
        request({
            method:'GET',
            url: `${host}/rest/busi/home_page/contribution_rank`
        }).then((data) => {
            dispatch({
                type:UPDATE_CONTR_RANK,
                contributionRank: data
            });
        }).catch((err) => {
            message.error(err.message);
        })
    }
}

/**
 * 获取资源使用排名
 * @param params 
 * @returns {function(*, *, *)}
 */
export const getUseRank = (data = {}) => {
    return (request,dispatch) => {
        request({
            method:'GET',
            url: `${host}/rest/busi/home_page/use_rank`
        }).then((data) => {
            dispatch({
                type:UPDATE_USE_RANK,
                useRank: data
            });
        }).catch((err) => {
            message.error(err.message);
        })
    }
}

export const jumpPage = (url) => {
    return (request,dispatch) => {
        dispatch(push(url));
    }
}