import  { Component } from "react";
import Loading from '../Loading'
import Login from '../Login'
import { Link } from 'dva/router'
import styles from "./index.less";
class HomeBanner extends Component {
  render() {
    console.log(this.props)
    const { loading, user } = this.props;
    return (
      <div className={styles.banner}>
        <div className="container" >
          <div className={styles.userWrap} >
            {
              user.status ? <div className={styles.userInfo} >
                <Link to='/mine'>
                  <div className={styles.userPic} >
                    <img src={user.pic} alt={user.nick} />
                  </div>
                  <div className={styles.userNick} >{user.nick}</div>
                </Link>
                <div className={styles.userLink} >
                  <Link to='/mine/course' >我的课程</Link>
                  <Link to='/mine/project' >我的作品</Link>
                </div>
                <div className={styles.scartchBtn}  >
                  <a href='/scartch'>去创作</a>
                </div>
              </div> : <Login />
            }
            <Loading loading={loading} />

          </div>
        </div>
      </div>
    );
  }
}

export default HomeBanner;
