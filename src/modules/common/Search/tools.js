/**
 * 生成表达式
 * @param options{array} 条件数组
 * @return string
 */
export const makeExpression = (options) => {
    const optionsMap = {};
    const typeMap = {};
    const expressionArr = [];
    for (let i = 0, l = options.length; i < l; i++) {
        typeMap[options[i].key] = options[i].type;
        if (optionsMap[options[i].key]) {
            optionsMap[options[i].key].push(options[i]);
        } else {
            optionsMap[options[i].key] = [options[i]];
        }
    }
    for (let key in optionsMap) {
        if (optionsMap.hasOwnProperty(key)) {
            const fragmentNum = optionsMap[key].length;
            const fragmentArr = [];
            let fragmentArrLength = 0;

            if (typeMap[key] === 'keyword') {
                for (let i =0; i < fragmentNum; i++) {
                    if (optionsMap[key][i].value) {
                        fragmentArr.push(`${key}=%${optionsMap[key][i].value}%`);
                        fragmentArrLength++;
                    }
                }
            }

            if (typeMap[key] === 'range') {
                for (let i = 0; i < fragmentNum; i++) {
                    const { min, max } = optionsMap[key][i].value;
                    const rangeArr = [];
                    let rangeArrLength = 0;
                    if (min !== undefined) {
                        rangeArr.push(`${key}>${min}`);
                        rangeArrLength++;
                    }
                    if (max !== undefined) {
                        rangeArr.push(`${key}<${max}`);
                        rangeArrLength++;
                    }
                    if (rangeArrLength === 1) {
                        fragmentArr.push(rangeArr[0]);
                        fragmentArrLength++;
                    }
                    if (rangeArrLength === 2) {
                        fragmentArr.push(`(${rangeArr.join('&&')})`);
                        fragmentArrLength++;
                    }
                }
            }

            if (fragmentArrLength > 1) {
                expressionArr.push(`(${fragmentArr.join('||')})`);
            }
            if (fragmentArrLength === 1) {
                expressionArr.push(fragmentArr[0]);
            }
        }
    }
    return expressionArr.join('&&');
};

export const toHexString = (string) => {
    if (typeof string !== 'string') return '';
    const strLength = string.length;
    const arrLength = strLength * 2;
    const hexesArr = new Array(arrLength);
    for (let i = 0, j = 0; i < strLength; i++, j+=2) {
        hexesArr[j] = '0x';
        hexesArr[j + 1] = string.charCodeAt(i).toString(16);
    }
    return hexesArr.join('');
};


export const makeSearchCondition = (options) => {
    return toHexString(makeExpression(options));
};
