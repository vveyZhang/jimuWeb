import { Component } from 'react'
import { Link, routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less'
import Loading from '../../components/Loading'
import WorkItem from '../../components/WorkItem'
@connect(({ user, global, loading }) => ({
    userProject: user.userProject,
    user: global.user,
    loading: loading.effects['user/getUserProject']
}))
export default class MineProject extends Component {
    constructor(props) {
        super(props);
        const { dispatch, user } = props;
        if (!user.id || !user.status) return dispatch(routerRedux.replace('/exception'))
        dispatch({ type: 'user/getUserProject', id: user.id })

    }
    render() {
        const { userProject, loading } = this.props;
        return (
            <div >
                <div className={styles.tab} >
                    <Link to="/mine/course"  >我的课程</Link>
                    <Link to="/mine/project" className={styles.cur} >我的作品</Link>
                </div>
                <div className={styles.list} >
                    <div className={styles.listProject} >
                        {
                            loading != undefined && !loading && userProject.length <= 0 ?
                                <div className={styles.nothing} >
                                    没有发布作品
                    </div>
                                : null
                        }
                        {
                            userProject.map((item, index) => <WorkItem key={index} {...item} />)
                        }
                    </div>
                    <Loading loading={loading} />
                </div>
            </div>)
    }
}
