import { Component } from 'react'
import classNames from 'classnames'
import styles from './index.less'
import { connect } from 'dva'
@connect(({ global, router, message }) => ({
  user: global.user,
  ...message,
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
      const { webSocket, dispatch, visiable, messageCount } = this.props;
      if (!e.data) return;
      if (!webSocket) {
        const data = JSON.parse(e.data);
        dispatch({
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
        dispatch({
          type: 'message/save', payload: {
            messageCount: visiable ? 0 : messageCount + 1
          }
        })
        dispatch({ type: 'message/saveMessage', payload })
      }
    }
  }
  hideMessage = () => {
    this.props.dispatch({
      type: 'message/save', payload: {
        visiable: false
      }
    })
  }
  showMessage = () => {
    this.props.dispatch({
      type: 'message/save', payload: {
        visiable: true,
        messageCount: 0
      }
    })
  }

  render() {
    const { list, user, content, visiable, messageCount } = this.props;
    return (
      <div className={styles.wrap} >
        {
          !visiable ? <div className={classNames(styles.mesTips, messageCount > 0 && styles.news)} onClick={this.showMessage} >
            {messageCount > 0 ? <p className={styles.mesTipsCount} >{messageCount}</p> : null}
            <div className={styles.mesTipsTxt} >
              积木老师<br />
              点击咨询
                </div>
          </div> : null
        }
        <div className={classNames(styles.wrapMessageContainer, visiable && styles.wrapMessageVisiables)} >
          <div className={styles.header} >
            <p className={styles.headerTe} >积木老师</p>
            <p className={styles.haderSub} >即时沟通，在线答疑</p>
            <div className={styles.close} onClick={this.hideMessage} >隐藏窗口</div>
          </div>
          <div className={styles.messageWrap} >
            <div className={styles.messageWrapContianer} ref={ref => this.wrap = ref} >
              <div className={styles.messageList} ref={ref => this.message = ref} >
                {
                  list.map((item, index) => item.type == "user" ? <div key={index} className={classNames(styles.messageItem, styles.messageItemRight)}>
                    <div className={styles.userName} >{user.nick}</div>
                    <div className={styles.messageContent} ><div style={{ overflow: 'hidden' }} >{item.content}</div></div>
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
            <textarea className={styles.input} placeholder='输入内容，与老师在线交流...' value={content}
              onKeyUp={this.handelKeyEvent}
              onChange={this.handeInput} ></textarea>
            <div className={styles.btn} onClick={this.handelMessage} >发送</div>
          </div>
        </div>
      </div>
    )
  }
}
