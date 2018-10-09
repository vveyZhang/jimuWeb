import { Component } from 'react'
import styles from './index.less'
import MineCrouseItem from '../../components/WeChat/MineCrouseItem'
import Img from '../../components/Img'
import banner from '../../assets/banner-course-de.jpg'
import Loading from '../../components/Loading'
import { connect } from 'dva';
import course1 from '../../assets/noCourse1.jpg'
import course2 from '../../assets/course2.jpg'
import course3 from '../../assets/course3.jpg'
import course4 from '../../assets/course4.jpg'
@connect(({ user, loading, global }) => ({
  list: user.userCourse,
  user: global.user,
  loading: loading.effects["user/getUserCourse"]
}))
export default class WCrouseList extends Component {
  constructor(props) {
    super(props)
    const { dispatch, user } = props;
    if (user.id) dispatch({ type: 'user/getUserCourse', id: user.id });
  }
  render() {
    const { list, loading } = this.props;
    return (
      <div>
        <Img src={banner} className={styles.banner} />
        <div className={styles.courseList}  >
          <Loading loading={loading} />
          {
            loading != undefined && !loading && list.length <= 0 ?
              <div className={styles.noCourse} >
                <img src={course1} alt />
                <img src={course2} alt />
                <img src={course3} alt />
                <img src={course4} alt />
                <div className={styles.footer}  >
                  <div className={styles.buyPrice} ><span>未购买课程</span></div>
                  <div onClick={this.toCreate} className={styles.button} >去报名</div>
                </div>
              </div> : null
          }
          {
            list.map(item => <MineCrouseItem {...item} key={item.id} />)
          }
        </div>
      </div>
    )
  }
}
