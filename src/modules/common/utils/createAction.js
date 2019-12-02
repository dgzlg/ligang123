/**
 * action生成器
 * @param type{string} action type
 * @param keys{string} action需要传递的参数名
 * @returns {Function} action
 */
const createAction = function (type, ...keys) {
    return function (...args) {
        const result = { type };
        for (let i = 0, l = args.length; i < l; i++) {
            result[keys[i]] = args[i];
        }
        return result;
    };
};

export default createAction;
