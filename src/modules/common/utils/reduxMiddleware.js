import { request } from './request';

/**
 * request创建函数（传入了dispatch）
 * @param dispatch store.dispatch
 * @returns {function(*)}
 */
const requestCreator = (dispatch) => {
    return (option) => {
        return request(option, dispatch);
    };
};

/**
 * chunk中间件
 * 使得redux的action可以为一个函数，从而实现异步数据流
 * @param store
 * @returns {function(*)}
 */
export const chunkMiddleware = (store) => {
    return (next) => {
        return (action) => {
            if (typeof action === 'function') {
                return action(requestCreator(store.dispatch), store.dispatch, store.getState);
            } else {
                next(action);
            }
        };
    };
};

/**
 * 路由事件中间件生成器（基于路由）
 * @param initActions
 * @returns {function(*=)}
 */
export const createRouteCallback = (initActions) => {
    return (store) => {
        return (next) => {
            return (action) => {
                if (action.type === '@@router/LOCATION_CHANGE' && initActions[action.payload.location.pathname]) {
                    initActions[action.payload.location.pathname](store.dispatch, store.getState);
                }
                next(action);
            };
        };
    };
};
