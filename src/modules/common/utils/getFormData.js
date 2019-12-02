import URLSearchParams from 'url-search-params';

/**
 * 将Object转为FormData
 * @param obj
 * @returns {FormData}
 */
export default (obj) => {
    // 此处使用URLSearchParams代替FormData //
    // axios的option.data为URLSearchParams实例时，请求的Content-Type才会被设置为application/x-www-form-urlencoded //
    const formData = new URLSearchParams();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }
    return formData;
};
