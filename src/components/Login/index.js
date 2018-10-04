import  { Component } from 'react'
import styles from './index.less'
export default class Login extends Component {
  render() {
    return (
      <div>
        <p className={styles.title} >微信登陆</p>
        <a className={styles.loginBtn} href="https://open.weixin.qq.com/connect/qrconnect?appid=wx9c25260b9a9b65f1&redirect_uri=http://www.jimubiancheng.com/home&response_type=code&scope=snsapi_login&state=1234567890#wechat_redirect" >
          点击登陆
        </a>
      </div>
    )
  }
}
