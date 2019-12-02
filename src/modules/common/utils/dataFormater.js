/**
 * 时长格式化
 * @param time 时长（ms）
 * @return {*}
 */
export const timeDurationFormatter = (time) => {
    if (!time || time < 0) return { day: 0, hour: 0, minute: 0, second: 0, mSecond: 0 };
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const day = time < oneDay ? 0 : parseInt(time / oneDay);
    time -= day * oneDay;
    const hour = time < oneHour ? 0 : parseInt(time / oneHour);
    time -= hour * oneHour;
    const minute = time < oneMinute ? 0 : parseInt(time / oneMinute);
    time -= minute * oneMinute;
    const second = time < oneSecond ? 0 : parseInt(time / oneSecond);
    time -= second * oneSecond;
    return {
        day,
        hour,
        minute,
        second,
        mSecond: time
    };
};
