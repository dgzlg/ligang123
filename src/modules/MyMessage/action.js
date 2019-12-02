import {host} from "../../config/api";

export const prefix = 'MyMessage';
export const OPEN_WIN = `${prefix}/openWin`;
export const CLOSE_WIN = `${prefix}/closeWin`;
export const NEW_CONTACTS = `${prefix}/newContacts`;
export const UPDATE_CURRENT_CONTACT = `${prefix}/updateCurrentContact`;
export const UPDATE_INPUT_VALUE = `${prefix}/updateInputValue`;
export const NEW_MESSAGES = `${prefix}/newMessages`;
export const UPDATE_MESSAGES = `${prefix}/updateMessages`;
export const UPDATE_HISTORY_LOADING = `${prefix}/updateHistoryLoading`;

/**
 * 打开聊天窗
 * @param  {string} [contactName] - 联系人的名字，若指定了联系人名字，窗口打开后将自动切换至该用户
 * @return {Function}
 */
export const openWin = (contactName) => {
  return (request, dispatch) => {
    dispatch({type: OPEN_WIN});
    if (contactName === undefined) {
      return;
    }
    dispatch(toggleCurrentContact(undefined, contactName));
  };
};

/**
 * 关闭聊天窗
 * @return {{type: string}}
 */
export const closeWin = () => ({type: CLOSE_WIN});

/**
 * 添加联系人
 * @param {string} contactName - 联系人名字
 * @return {Function}
 */
const addContact = (contactName) => {
  return (request, dispatch, getState) => {
    let {contactsMap, contacts, messages, historyLoading} = getState()[prefix];
    let index;
    if (contactsMap[contactName] !== undefined) {
      return;
    }
    index = contacts.length;
    contactsMap = {...contactsMap, [contactName]: index};
    contacts = [...contacts, {name: contactName, unread: 0}];
    messages = [...messages, []];
    historyLoading = [...historyLoading, false];
    dispatch({type: NEW_CONTACTS, contactsMap, contacts, messages, historyLoading});
  };
};

/**
 * 加载当前用户的联系人（历史联系人）
 * @return {Function}
 */
export const loadContacts = () => {
  return (request, dispatch, getState) => {
    let {contactsMap, contacts, messages, historyLoading} = getState()[prefix];
    contactsMap = {...contactsMap};
    contacts = [...contacts];
    messages = [...messages];
    historyLoading = [...historyLoading];
    request({
      method: 'GET',
      url: `${host}/rest/chat/logUser`,
    })
      .then(({entity: names}) => {
        if (!names || names.length === 0) {
          return;
        }
        names.forEach((name) => {
          if (contactsMap[name] !== undefined) {
            return;
          }
          contactsMap[name] = contacts.length;
          contacts.push({name, unread: 0});
          messages.push([]);
          historyLoading.push(0);
          dispatch({type: NEW_CONTACTS, contactsMap, contacts, messages, historyLoading});
        });
      })
      .catch();
  };
};

/**
 * 加载历史消息
 * @param {number|undefined} targetIndex - 目标联系人索引
 * @param {string} [targetName] - 目标联系人名，根据人名来加载时，targetIndex需要传入undefined
 * @return {Function}
 */
export const loadMessagesHistory = (targetIndex, targetName) => {
  return (request, dispatch, getState) => {
    const {messages, contactsMap, contacts, historyLoading} = getState()[prefix];
    let msgId = -1;

    /* 初始化参数 */
    if (targetName !== undefined) {
      targetIndex = contactsMap[targetName];
    } else {
      targetName = contacts[targetIndex].name;
    }
    if (targetIndex === undefined) {
      throw new Error('loadMessagesHistory(targetIndex, targetName) 无效的参数');
    }

    /* 若本地已有历史记录，找到记录的前端点，以此端点请求之前的历史记录 */
    if (messages[targetIndex].length > 0) {
      for (let i = 0, l = messages[targetIndex].length; i < l; i++) {
        if (messages[targetIndex][i].msgId) {
          msgId = messages[targetIndex][i].msgId;
          break;
        }
      }
    }

    /* 更新历史记录记载状态 */
    historyLoading[targetIndex] = 1;
    dispatch({type: UPDATE_HISTORY_LOADING, historyLoading});

    /* 请求历史记录 */
    request({
      method: 'GET',
      url: `${host}/rest/chat/log`,
      params: {targetId: targetName, lastMsgId: msgId},
    })
      .then(({entity: history}) => {
        let {messages, historyLoading} = getState()[prefix];
        const historyLength = history.length;
        const messagesLength = messages[targetIndex].length;

        /* 若没有更久的记录，则更新历史记录加载状态为已全部加载（2） */
        if (historyLength === 0) {
          historyLoading[targetIndex] = 2;
          dispatch({type: UPDATE_HISTORY_LOADING, historyLoading});
          return;
        }

        /* 由于服务端返回的记录是时间逆序的，做一次逆序操作 */
        history.reverse();

        /* 若服务端返回的历史记录中有末端标识，即历史记录已全部加载完，无更久的记录 */
        /* 则更新历史记录加载状态为已全部加载（2） */
        if (history[0].isLast) {
          historyLoading[targetIndex] = 2;
        } else {
          historyLoading[targetIndex] = 0;
        }
        dispatch({type: UPDATE_HISTORY_LOADING, historyLoading});

        /* 将请求到的历史记录更新到历史列表 */
        messages = [...messages];
        if (messagesLength === 0) {
          // 本地列表为空，直接更新
          messages[targetIndex] = history;
        } else {
          // 本地列表不为空，找到历史记录的合理插入点，插入请求到的历史记录
          // 若两段记录中无相同的记录，则插入点默认为0
          // 此附加逻辑用于去除两个异步进程带来的重复历史记录
          // 第一个异步进程为WebSocket的实时接收消息
          // 第二个异步进程为主动触发的历史记录查询
          let insertPosition = 0;
          for (let i = 0; i < messagesLength; i++) {
            if (messages[targetIndex][i].msgId === history[historyLength - 1].msgId) {
              insertPosition = i + 1;
              break;
            }
          }
          messages[targetIndex] = history.concat(messages[targetIndex].slice(insertPosition));
        }
        dispatch({type: UPDATE_MESSAGES, messages});
      })
      .catch(() => {
        const {historyLoading} = getState()[prefix];
        historyLoading[targetIndex] = 0;
        dispatch({type: UPDATE_HISTORY_LOADING, historyLoading});
      });
  };
};

/**
 * 切换当前联系人
 * @param {number|undefined} targetIndex - 联系人的索引号
 * @param {string} [targetName] - 联系人名，使用人名来切换时，targetIndex需要传入undefined
 * @return {Function}
 */
export const toggleCurrentContact = (targetIndex, targetName) => {
  return (request ,dispatch, getState) => {
    let {visible, contactsMap, contacts, messages} = getState()[prefix];

    if (targetName !== undefined) {
      targetIndex = contactsMap[targetName];
    }
    if (targetIndex === undefined) {
      throw new Error('toggleCurrentContact(targetIndex, targetName) 无效的参数');
    }

    if (visible) {
      contacts = [...contacts];
      contacts[targetIndex].unread = 0;
      if (messages[targetIndex].length < 20) {
        dispatch(loadMessagesHistory(targetIndex));
      }
    }
    dispatch({type: UPDATE_CURRENT_CONTACT, contacts, currentContact: targetIndex});
  };
};

/**
 * 更新输入框的值
 * @param {string} value
 * @return {{type: string, value: *}}
 */
export const updateInputValue = (value) => ({type: UPDATE_INPUT_VALUE, value});

/**
 * 新消息
 * 新增加的消息中关联着未添加的联系人时，
 * 将会自动添加相应的联系人
 * @param {array} newMessages - 新增的消息
 * @return {Function}
 */
export const newMessages = (newMessages) => {
  return (request, dispatch, getState) => {
    let {visible, currentContact, contactsMap, contacts, messages} = getState()[prefix];
    contactsMap = {...contactsMap};
    contacts = [...contacts];
    messages = [...messages];
    for (let i = 0, l = newMessages.length; i < l; i++) {
      const {msgSource} = newMessages[i];
      let index = contactsMap[msgSource];
      if (index === undefined) {
        index = contacts.length;
        contactsMap[msgSource] = index;
        contacts[index] = {name: msgSource, unread: 1};
        messages[index] = [newMessages[i]];
      } else {
        contacts[index].unread += 1;
        messages[index].push(newMessages[i]);
      }
    }
    if (visible && currentContact !== null) {
      contacts[currentContact].unread = 0;
    }
    dispatch({type: NEW_MESSAGES, contactsMap, contacts, messages});
  };
};

/**
 * 向指定的人发送指定的消息
 * @param {string} targetName - 目标联系人
 * @param {object} message - 消息内容
 * @return {Function}
 */
const sendMessage = (targetName, message) => {
  return (request, dispatch, getState) => {
    let {contactsMap, messages} = getState()[prefix];
    let index = contactsMap[targetName];

    messages = [...messages];
    messages[index].push(message);
    dispatch({type: UPDATE_MESSAGES, messages});
    request({
      method: 'POST',
      url: `${host}/rest/chat/send`,
      data: {targetId: targetName, msg: message.msgBody},
    })
      .then((res) => {
        let {messages} = getState()[prefix];
        messages = [...messages];
        for (let l = messages[index].length, i = l - 1; i >= 0; i--) {
          if (messages[index][i] === message) {
            messages[index][i] = res.entity;
            break;
          }
        }
        dispatch({type: UPDATE_MESSAGES, messages});
      })
      .catch();
  };
};

/**
 * 发送当前的输入消息给当前联系人，同时会清空已输入的值
 * @return {Function}
 */
export const sendCurrentMessage = () => {
  return (request, dispatch, getState) => {
    const {inputValue, currentContact, contacts} = getState()[prefix];
    const targetName = contacts[currentContact].name;
    dispatch(sendMessage(targetName, {msgId: null, msgTarget: targetName, msgBody: inputValue, msgDate: new Date().getTime()}));
    dispatch({type: UPDATE_INPUT_VALUE, value: ''});
  };
};

/**
 * 与某人通信
 * @param {string} targetName - 联系人名
 * @return {Function}
 */
export const contactWith = (targetName) => {
  return (request, dispatch, getState) => {
    if (targetName === undefined) {
      return;
    }
    const {visible, contactsMap} = getState()[prefix];
    if (contactsMap[targetName] === undefined) {
      dispatch(addContact(targetName));
    }
    if (visible) {
      dispatch(toggleCurrentContact(undefined, targetName));
      return;
    }
    dispatch(openWin(targetName));
  };
};
