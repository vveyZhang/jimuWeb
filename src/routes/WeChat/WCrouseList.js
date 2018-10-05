import { Component } from 'react'
import styles from './index.less'
import WCrouseItem from '../../components/WeChat/WCrouseItem'
import Img from '../../components/Img'
import banner from '../../assets/banner-course-de.jpg'
import Loading from '../../components/Loading'
import { connect } from 'dva';
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
            list.map(item => <WCrouseItem {...item} key={item.id} />)
          }
        </div>
      </div>
    )
  }
}
