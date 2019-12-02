/**
 * 创建reducer
 * @param keyOfStore 状态仓库名
 * @param defaultState 初始state
 * @returns {function(*=, *=)} 合并后的reducer
 */
export default function (keyOfStore, defaultState) {
    const _args = arguments;
    return (state = defaultState, action) => {
        let num = _args.length;
        let i = 2;
        while (i < num) {
            let nextState = _args[i](state, action, keyOfStore);
            if (nextState !== state) {
                return nextState;
            }
            i++;
        }
        return state;
    };
}
