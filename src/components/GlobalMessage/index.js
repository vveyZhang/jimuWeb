import  { Component } from 'react'
import classNames from 'classnames'
import styles from './index.less'
import { connect } from 'dva'
@connect(({ global, router, message }) => ({
  user: global.user,
  list: message.list,
  content: message.content,
  webSocket: message.webSocket,
  router
}))
export default class GlobalMessage extends Component {
  constructor(props) {
    super(props)
    const { user } = props;
    if (user.id) {
      this.webSocket(user.id)
    }
  }
  handelMessage = () => {
    const { content, user, dispatch } = this.props;
    const message = content.replace(/(^\s*)|(\s*$)/g, "");
    if (!message) return;
    dispatch({
      type: 'message/postMessage', payload: {
        userid: user.id,
        message
      }
    })

  }
  handelKeyEvent = (e) => {
    if (e.keyCode == 13) this.handelMessage();
  }
  handeInput = (e) => {
    const value = e.target.value;
    this.props.dispatch({
      type: 'message/save', payload: {
        content: value
      }
    })
  }
  webSocket = (userid) => {
    const ws = new WebSocket("ws://101.201.237.35:8282");
    ws.onopen = () => {
      var temp = `{ "userid":${userid}}`;
      ws.send(temp);//send() 方法来向服务器发送数据
    };
    ws.onmessage = (e) => {
      if (!this.props.webSocket) {
        const data = JSON.parse(e.data);
        this.props.dispatch({
          type: 'message/bindClient', payload: {
            userid,
            client_id: data.client_id
          }
        })
      } else {
        const payload = {
          type: 'jimu',
          content: e.data,
        }
        this.props.dispatch({ type: 'message/saveMessage', payload })
      }
    }
  }
  render() {
    const { list, user, content } = this.props;
    return (
      <div className={styles.wrap} >
        <div className={styles.messageWrap} >
          <div className={styles.messageWrapContianer} ref={ref => this.wrap = ref} >
            <div className={styles.messageList} ref={ref => this.message = ref} >
              {
                list.map((item, index) => item.type == "user" ? <div key={index} className={classNames(styles.messageItem, styles.messageItemRight)}>
                  <div className={styles.messageContent} ><div style={{ overflow: 'hidden' }} >{item.content}</div></div>
                  <div className={styles.userName} >{user.nick}</div>
                </div> :
                  <div key={index} className={classNames(styles.messageItem)}>
                    <div className={styles.userName} ><div style={{ overflow: 'hidden' }} >积木</div></div>
                    <div className={styles.messageContent} >{item.content}</div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.inputWrap}  >
          <textarea className={styles.input} value={content}
            onKeyUp={this.handelKeyEvent}
            onChange={this.handeInput} ></textarea>
          <div className={styles.btn} onClick={this.handelMessage} >发送</div>
        </div>
      </div>
    )
  }
}
