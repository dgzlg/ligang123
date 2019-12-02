/////////////////////////////////////////////////////////////////////////////////////////////////
//************************************** reducer **********************************************//
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 创建通用的值校验state
 * @returns {{cachedValues: {name: {usable: Array, unusable: Array}}}}
 */
export const createState = () => {
    return {
        cachedValues: { name: { usable: [], unusable: [] } },
        valueTestStatus: { name: 0 }
    };
};

/**
 * 通用的值校验reducer
 * @param state
 * @param action
 * @param keyOfStore
 * @returns {*}
 */
export const valueTestReducer = (state, action, keyOfStore) => {
    switch (action.type) {
        case `@@${keyOfStore}/updateValueTest`:
            return {
                ...state,
                cachedValues: action.cachedValues || state.cachedValues,
                valueTestStatus: action.valueTestStatus || state.valueTestStatus
            };
        default:
            return state;
    }
};


/////////////////////////////////////////////////////////////////////////////////////////////////
//************************************** action ***********************************************//
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 默认状态索引
 * 第一维从0到3分别代表‘初始的’、‘成功的’、‘失败的’、‘正在查询’四种状态
 * 第二维从0到1分别对应antd Form.Item组件props的validateStatus和help
 * @type {*[]}
 */
export const statusIndex = [
    [undefined, undefined],
    ['success', undefined],
    ['error', '值不可用'],
    ['validating', undefined]
];

/**
 * 异步检测表单值是否可用
 * @param key 键名
 * @param value 值
 * @param inputState 输入状态（失焦判定）
 * @param keyOfStore 状态仓库名
 * @param query 异步查询，返回true时值可用
 * @param delay 触发异步查询的延时，默认1000ms（用于防止短时间发出大量查询）
 * @returns {function(*=, *)}
 */
export const testValue = ({ key, value, inputState, keyOfStore, query, delay = 1000 }) => {
    const actionType = `@@${keyOfStore}/updateValueTest`;
    return (request, dispatch, getState) => {
        const { cachedValues, valueTestStatus } = getState()[keyOfStore];
        const cached = cachedValues[key];
        const status = valueTestStatus[key];

        /* 移除上一次查询计时器 */
        if (window.__ASYNC_TIMER_VALUE_TEST !== null) {
            clearTimeout(window.__ASYNC_TIMER_VALUE_TEST);
            window.__ASYNC_TIMER_VALUE_TEST = null;
        }

        /* 从缓存中查询可用 */
        if (cached.usable.indexOf(value) > -1) {
            if (status === 1) return;
            valueTestStatus[key] = 1;
            dispatch({ type: actionType, valueTestStatus });
            return;
        }
        /* 从缓存中查询不可用 */
        if (cached.unusable.indexOf(value) > -1) {
            if (status === 2) return;
            valueTestStatus[key] = 2;
            dispatch({ type: actionType, valueTestStatus });
            return;
        }

        const queryFn = () => {
            query(value, request)
            .then((usable) => {
                if (usable) {
                    cachedValues[key].usable.push(value);
                    valueTestStatus[key] = 1;
                    dispatch({ type: actionType, cachedValues, valueTestStatus });
                } else {
                    cachedValues[key].unusable.push(value);
                    valueTestStatus[key] = 2;
                    dispatch({ type: actionType, cachedValues, valueTestStatus });
                }
            });
        };

        /* 输入完成 */
        if (inputState === 'finished') {
            queryFn();
            return;
        }

        /* 正在输入，放置延迟计时器，防止短时内多次触发查询 */
        if (valueTestStatus[key] !== 3) {
            valueTestStatus[key] = 3;
            dispatch({ type: actionType, cachedValues, valueTestStatus});
        }
        window.__ASYNC_TIMER_VALUE_TEST = setTimeout(queryFn, delay);
    };
};
