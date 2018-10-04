import  { Component } from "react";
import styles from "./index.less";
import weChat from "../assets/wechat-code.jpg";
import weBo from "../assets/weBo-code.jpg";
class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <div className="container">
          <div className={styles.left}>
            <h1 className={styles.title}>联系我们</h1>
            <ul className={styles.contactContent}>
              <li>联系我们：4000-596-872</li>
              <li>服务 QQ：3126503865</li>
              <li>邮箱地址：service@xiaoma.wang</li>
              <li>总部地址：成都·高新区·天府三街</li>
            </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.code}>
              <h1 className={styles.title}>积木公众号</h1>
              <img src={weChat} alt="" />
            </div>
            <div className={styles.code}>
              <h1 className={styles.title}>积木微博</h1>
              <img src={weBo} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
