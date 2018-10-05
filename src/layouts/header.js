import styles from "./index.less";
import { Link } from "dva/router";
import { Component } from "react";
import classNames from "classnames";
import Img from '../components/Img'
import searchIcon from "../assets/search-icon.png";
import LogoIcon from '../assets/logo.png'
const menu = [
  {
    name: "首页",
    path: "/home"
  },
  {
    name: "课程",
    path: "/course"
  },
  {
    name: "发现",
    path: "/find"
  },
  {
    name: "创作",
    path: "/scratch"
  }
];
class Header extends Component {
  renderMenu = () => {
    const { path } = this.props;
    let index = -1;
    const menuItem = menu.map((item, key) => {
      if (path.indexOf(item.path) >= 0) index = key;
      return (
        <Link
          to={item.path}
          key={key}
          className={classNames(
            styles.navItem,
            path.indexOf(item.path) >= 0 && styles.navItemSelect
          )}
        >
          {item.name}
        </Link>
      );
    });
    return { menuItem, index };
  };
  render() {
    const { menuItem, index } = this.renderMenu();
    let visiableUnderline = true;
    let left = 0;
    if (index == -1) {
      visiableUnderline = false;
    } else {
      left = index === 0 ? 0 : (70 + 20) * index;
    }
    const { path, status, search } = this.props;
    const isHome = path == '/home'
    return (
      <div className={styles.header}>
        <div className="container">
          <Img src={LogoIcon} className={styles.logo} />
          <div className={styles.nav}>
            {menuItem}
            {visiableUnderline ? <span className={styles.underline} style={{ left: left + "px" }} /> : null}
          </div>
          <div className={styles.right}>
            <div className={styles.inputContaienr}>
              <input />
              <img className={styles.searchIcon} alt="" src={searchIcon} />
            </div>
            {
              isHome ? null :
                <div className={styles.userContainer}>
                  {
                    status ? <div className={styles.userInfo}>
                      <img
                        alt=""
                        src={this.props.pic}
                        className={styles.userLogo}
                      />
                      <div className={styles.userText}>{this.props.nick}</div>
                      <div className={styles.userSelect}>
                        <div className={styles.userSelectContaienr}>
                          <Link to="/mine" className={styles.item}>
                            个人主页
                      </Link>
                          <Link to="/mine/setting" className={styles.item}>
                            账号设置
                      </Link>
                          <Link to="" className={styles.item}>
                            退出登录
                      </Link>
                        </div>
                      </div>
                    </div> :
                      <div className={styles.userSign}>
                        <div className={styles.userText} onClick={() => {
                          window.location = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx9c25260b9a9b65f1&redirect_uri=http://www.jimubiancheng.com'
                            + path + search +
                            '&response_type=code&scope=snsapi_login&state=1234567890#wechat_redirect'
                        }} >登录</div>
                      </div>

                  }
                </div>
            }

          </div>
        </div>
      </div>
    );
  }
}

export default Header;


