/**
 * 为一个高频率的动作创建缓冲器
 * @param {function} action - 要缓冲的动作
 * @param {number} time - 缓冲时间
 * @return {Function} 带有缓冲器的动作
 */
const bufferProvider = (action, time = 300) => {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(() => action(), time);
  };
};

export default bufferProvider;
