/* global Stomp */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'stompjs/lib/stomp.min';
import {
  prefix,
  updateInputValue,
  sendCurrentMessage,
  closeWin,
  toggleCurrentContact,
  newMessages, loadMessagesHistory, loadContacts,
} from "../action";
import {mqHost} from "../../../config/api";
import './index.less';

const mapStateToProps = ({
  'Main': {winWidth},
  [prefix]: {visible, contactsMap, contacts, messages, historyLoading, currentContact, inputValue},
}) => ({
  visible, winWidth, contactsMap, contacts, messages, historyLoading, currentContact, inputValue,
});

let messagesBuffer = [];
let messagesBufferTimer = undefined;

const insertDate = (list, dateKey) => {

  if (list.length === 0) {
    return list;
  }

  const result = [];
  const todaySTime = new Date().setHours(0, 0, 0, 0);
  const firstItemDate = new Date(list[0][dateKey]);
  let referenceTimes = [];
  let rIndex = 0;
  if (firstItemDate.getTime() > todaySTime) {
    result.push({type: 'timeNode', content: `${firstItemDate.getHours()}:${firstItemDate.getMinutes()}`});
  } else {
    result.push({type: 'timeNode', content: firstItemDate.toLocaleString()});
  }
  referenceTimes.push(firstItemDate.setHours(23, 59, 59, 999));
  for (let i = 0, l = list.length; i < l; i++) {
    const msgDate = new Date(list[i][dateKey]);
    const msgTime = msgDate.getTime();
    if (msgTime > referenceTimes[rIndex]) {
      if (msgTime >= todaySTime) {
        result.push({type: 'timeNode', content: `${msgDate.getHours()}:${msgDate.getMinutes()}`});
      } else {
        result.push({type: 'timeNode', content: msgDate.toLocaleString()});
      }
      result.push(list[i]);
      referenceTimes.push(msgDate.setHours(23, 59, 59, 999));
      rIndex++;
      continue;
    }
    result.push(list[i]);
  }

  return result;
};

class Message extends Component {

  constructor(props) {
    super(props);
    this.state={
      x: (props.winWidth - 720) / 2,
      y: 160,
    };
    this.autoScroll = true;
    this.messageViewBox = React.createRef();
    this.scrollBox = React.createRef();
    this.initWebSocket = this.initWebSocket.bind(this);
    this.messageIncome = this.messageIncome.bind(this);
    this.handleClickContact = this.handleClickContact.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleScrollMessagesView = this.handleScrollMessagesView.bind(this);
    this.handleLoadHistoryMessages = this.handleLoadHistoryMessages.bind(this);
    this.closeWin = this.closeWin.bind(this);
    this.initContacts = this.initContacts.bind(this);
  }

  componentDidMount() {
    this.initWebSocket();
    this.initContacts();
  }

  componentDidUpdate(prevProps) {
    const {visible, messages} = this.props;
    if (!visible) {
      return;
    }
    if (this.autoScroll) {
      this.scrollBox.current.scrollIntoView(false);
      return;
    }
    if (messages.length <= prevProps.messages) {
      return;
    }
    if (messages[0] === prevProps.messages[0]) {
      return;
    }
    const {scrollHeight} = this.messageViewBox.current;
    this.messageViewBox.current.scrollTop = this.prevScrollTop + scrollHeight - this.prevScrollHeight;
  }

  initWebSocket() {
    const userId = localStorage.getItem('user-name');
    const ws = new WebSocket(`${mqHost}/ws`);
    const client = Stomp.over(ws);
    const on_connect = () => {
      console.log("connect success");
      client.subscribe(
        `/queue/${userId}`,
        this.messageIncome,
        {
          durable:true,
          'auto-delete':true
        },
      );
    };
    const on_error = (error) => {
      console.log(error);
    };

    client.reconnect_delay = 5000;
    client.heartbeat.outgoing = 20000;
    client.heartbeat.incoming = 0;
    client.connect('bzh_exchange_chat','654321', on_connect, on_error, '/');
  }

  initContacts() {
    this.props.dispatch(loadContacts());
  }

  messageIncome(data) {
    clearTimeout(messagesBufferTimer);
    messagesBuffer.push(JSON.parse(data.body));
    messagesBufferTimer = setTimeout(() => {
      this.props.dispatch(newMessages(messagesBuffer));
      messagesBuffer = [];
    }, 300);
  }

  handleClickContact(index) {
    const {dispatch, currentContact} = this.props;
    if (index !== currentContact) {
      this.autoScroll = true;
      dispatch(toggleCurrentContact(index));
    }
  }

  handleUpdateInput(e) {
    this.props.dispatch(updateInputValue(e.target.value));
  }

  sendMessage() {
    const {dispatch, inputValue, currentContact} = this.props;
    if (inputValue === '' || currentContact === null) {
      return;
    }
    dispatch(sendCurrentMessage());
  }

  handleScrollMessagesView() {
    const {scrollHeight, clientHeight, scrollTop} = this.messageViewBox.current;
    this.prevScrollHeight = scrollHeight;
    this.prevScrollTop = scrollTop;
    if (scrollHeight - clientHeight - scrollTop > 40) {
      this.autoScroll = false;
      return;
    }
    this.autoScroll = true;
  }

  handleLoadHistoryMessages() {
    const {dispatch, currentContact} = this.props;
    dispatch(loadMessagesHistory(currentContact));
  }

  closeWin() {
    this.autoScroll = true;
    this.props.dispatch(closeWin());
  }

  render() {
    const {visible, currentContact, contacts, messages, historyLoading, inputValue} = this.props;
    const {x, y} = this.state;
    if (!visible) {
      return '';
    }
    return (
      <div id="myMessage" style={{top: y, left: x}}>
        <div className="my-message-header">
          <div className="title">{currentContact === null ? '' : `与${contacts[currentContact].name}的`}聊天</div>
          <div className="btn-close" onClick={this.closeWin}>
            <svg viewBox="64 64 896 896" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/>
            </svg>
          </div>
        </div>
        <div className="my-message-body">
          <div className="left">
            <div className="title">联系人</div>
            {contacts.map(({name, unread}, index) => (
              <div
                key={index}
                className={`contact${index === currentContact ? ' active' : ''}`}
                onClick={() => this.handleClickContact(index)}
              >
                <span className="name">{name}</span>
                {unread > 0 ? <span className="unread-num">{Math.min(99, unread)}</span> : ''}
              </div>
            ))}
          </div>
          <div className="right">
            <div className="message-view-box" ref={this.messageViewBox} onScroll={this.handleScrollMessagesView}>
              <div className="scroll-box" ref={this.scrollBox}>
                {(() => {
                  if (currentContact === null) {
                    return '';
                  }
                  if (historyLoading[currentContact] === 1) {
                    return (<div className="loading">加载历史消息中...</div>);
                  }
                  if (historyLoading[currentContact] === 0) {
                    return (<div className="more" onClick={this.handleLoadHistoryMessages}>更多聊天记录</div>);
                  }
                  return (<div className="no-more">已是全部消息</div>);
                })()}
                {currentContact === null ? '' : insertDate(messages[currentContact], 'msgDate').map(({type, content, msgBody, msgSource}, index) => {
                  if (type === 'timeNode') {
                    return (
                      <div key={index} className="date">
                        <span>{content}</span>
                      </div>
                    );
                  }
                  if (contacts[currentContact].name === msgSource) {
                    return (
                      <div key={index} className="message">
                        <span className="content">{msgBody}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="message mine">
                      <span className="content">{msgBody}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="tool-box">
              <span className="send" onClick={this.sendMessage}>发送</span>
            </div>
            <textarea className="input" rows={3} value={inputValue} onChange={this.handleUpdateInput}/>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  dispatch: PropTypes.func,
  winWidth: PropTypes.number,
  visible: PropTypes.bool,
  contactsMap: PropTypes.object,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  historyLoading: PropTypes.array,
  currentContact: PropTypes.number,
  inputValue: PropTypes.string,
};

export default connect(mapStateToProps)(Message);
