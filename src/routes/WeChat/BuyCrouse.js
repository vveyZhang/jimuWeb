import  { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Modal } from 'antd'
import Loading from '../../components/Loading'
import Img from '../../components/Img'
import styles from './index.less'
@connect(({ course, user, loading }) => ({
    courseDetail: course.courseDetail,
    courseInfo: course.courseInfo,
    userInfo: user.userInfo,
    userCourse: user.userCourse,
    loading: loading.effects["course/queryCourse"]
}))
export default class BuyCrouse extends Component {
    constructor(props) {
        super(props)
        const id = props.match.params.id;
        this.state = { id }
        this.fetchCourse(id);
    }
    fetchCourse(id) {
        const { dispatch, userInfo } = this.props;
        dispatch({ type: "course/queryCourse", id });
        if (!userInfo || !userInfo.unionid) return dispatch(routerRedux.replace('/wechat/course'))
        dispatch({ type: "course/getUserCourse", id: userInfo.unionid });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            const id = this.props.match.params.id
            this.fetchCourse(id)
        }
    }
    toCreate = () => {
        const { dispatch, userCourse } = this.props;
        let buy = false;
        const { id } = this.state;
        for (let item of userCourse) {
            if (item.id == id) buy = true
        }
        if (buy) return Modal.info({
            title: '重复购买',
            content: "您已购买该课程",
            onOk() { },
        });
        dispatch({ type: "course/save", payload: { createOrder: true } });
        dispatch(routerRedux.push('/wechat/order'))
    }
    render() {
        const { courseInfo, loading, userCourse } = this.props;
        let buy = false;
        const { id } = this.state;
        for (let item of userCourse) {
            if (item.id == id) buy = true
        }
        return (
            <div className={styles.buyCourse} >
                <Loading loading={loading} />
                <Img className={styles.courseImage} src={"//img11.360buyimg.com/n1/jfs/t15682/129/2364665353/83615/70dc5e39/5aa776d1N6be03e95.jpg"} />
                <div className={styles.courseInfo} >
                    <h1 className={styles.courseName} >{courseInfo.coursename}</h1>
                    <div className={styles.courseDetail} >{courseInfo.description}</div>
                    <div className={styles.courseCount} >
                        <span>{courseInfo.price}</span>元<b></b><span>{courseInfo.project_template}</span>课时<b></b><span>{courseInfo.learn_people}</span>人学习
                    </div>
                </div>
                <div className={styles.footer}  >
                    <div onClick={this.toCreate} className={styles.button} >{buy ? '已购买' : "立即购买"}</div>
                </div>
            </div>
        )
    }
}
