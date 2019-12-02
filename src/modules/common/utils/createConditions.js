/**
 * 表达式索引
 */
const expressionIndex = {
    '=': 'eq',
    '>': 'gt',
    '<': 'lt',
    '~': 'like'
};

/**
 * 关系索引
 */
const relationIndex = {
    '&&': 'and',
    '||': 'or'
};

/**
 * 单条件
 * @param key 匹配的键
 * @param value 匹配的值
 * @param expression 键值关系
 * @param relation 条件关系
 * @param stringOut 是否输出字符串，默认true
 * @returns {*}
 */
export const singleCondition = ([key, expression, value, relation = '&&'], stringOut = true) => {
    if (typeof value === 'string' && expression === '~') value = `%${value}%`;
    const condition = {
        name: key,
        value,
        expression: expressionIndex[expression],
        relation: relationIndex[relation]
    };
    if (stringOut) return JSON.stringify([condition]);
    return condition;
};

/**
 * 混合条件
 * @param options{array} 条件数组，每个元素的值与单条件相同
 * @returns {string}
 */
export const multipleCondition = (options) => {
    const numC = options.length;
    const conditions = new Array(numC);
    let i = 0;
    while (i < numC) {
        conditions[i] = singleCondition(options[i], false);
        i++;
    }
    return JSON.stringify(conditions);
};
