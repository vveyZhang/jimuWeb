import  { Component } from 'react'
import styles from './index.less'
import WCrouseItem from '../../components/WeChat/WCrouseItem'
import Img from '../../components/Img'
import banner from '../../assets/banner-course-de.jpg'
import Loading from '../../components/Loading'
import qs from 'qs'
import { connect } from 'dva';
@connect(({ course, loading }) => ({
  list: course.courseList,
  loading: loading.effects["course/queryALLCourse"]
}))
export default class WCrouseList extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props;
    dispatch({ type: 'course/queryALLCourse' })
    const searchParams = window.location.href.split('?')[1]
    const params = qs.parse(searchParams);
    dispatch({ type: 'user/getUserInfo', id: params.openid })
  }
  render() {
    const { list, loading } = this.props;
    console.log(list)
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
