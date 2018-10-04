import { Component } from 'react'
import { Link, routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less'
import Loading from '../../components/Loading'
import Courseitem from '../../components/CourseItem'

@connect(({ user, global, loading }) => ({
    userCourse: user.userCourse,
    user: global.user,
    loading: loading.effects['user/getUserCourse']
}))
export default class MineCourse extends Component {
    constructor(props) {
        super(props);
        const { dispatch, user } = props;
        if (!user.id || !user.status) return dispatch(routerRedux.replace('/exception'))
        dispatch({ type: 'user/getUserCourse', id: user.id })

    }
    render() {
        const { userCourse, loading } = this.props;
        return (
            <div >
                <div className={styles.tab} >
                    <Link to="/mine/course" className={styles.cur} >我的课程</Link>
                    <Link to="/mine/project" >我的作品</Link>
                </div>
                <div className={styles.list} >
                    <div className={styles.listCourse} >
                        {
                            loading != undefined && !loading && userCourse.length <= 0 ?
                                <div className={styles.nothing} >
                                    没有购买课程
                    </div>
                                : null
                        }
                        {
                            userCourse.map((item, index) => <Courseitem key={index} {...item} />)
                        }
                    </div>
                    <Loading loading={loading} />

                </div>
            </div>
        )
    }
}
