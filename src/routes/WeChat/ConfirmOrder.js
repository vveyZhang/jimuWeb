import { Component } from 'react'
import Img from '../../components/Img'
import Loading from '../../components/Loading'
import Debounce from 'lodash-decorators/debounce'
import { connect } from 'dva'
import styles from './index.less'
@connect(({ course, user, loading, global }) => ({
    courseDetail: course.courseDetail,
    courseInfo: course.courseInfo,
    userCourse: user.userCourse,
    userInfo: global.user,
    loading: loading.effects["course/queryCourse"]
}))
export default class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        const id = props.match.params.id;
        this.fetchCourse(id);
        this.onPay = this.onPay.bind(this)
    }
    fetchCourse(id) {
        const { dispatch } = this.props;
        dispatch({ type: "course/queryCourse", id });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            const id = this.props.match.params.id
            this.fetchCourse(id)
        }
    }
    state = {
        text: ''
    }
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    @Debounce(300)
    onPay() {
        const { courseInfo, userInfo, dispatch } = this.props;
        // const { text } = this.state;
        dispatch({
            type: 'user/userPay', params: {
                price: parseInt(courseInfo.price * 100),
                openid: userInfo.openid,
                courseid: courseInfo.id,
                out_trade_ext: courseInfo.coursename
            }
        })
    }
    render() {
        const { courseInfo, loading } = this.props;
        const { text } = this.state;
        return (
            <div className={styles.orderContainer} >
                <Loading loading={loading} />
                <div className={styles.orderCourse} >
                    <Img className={styles.image} src={courseInfo.thumb} />
                    <div className={styles.courseInfo} >
                        <div className={styles.title} >{courseInfo.coursename}</div>
                        <div className={styles.price} >{courseInfo.price} 元</div>
                    </div>
                </div>
                <div className={styles.textWrap} >
                    <div className={styles.label} >备注:</div>
                    <input value={text} onChange={this.onChange} type="text" className={styles.input} />
                </div>
                <div className={styles.footer}  >
                    <div className={styles.button} onClick={this.onPay} >立即支付</div>
                </div>
            </div>
        )
    }
}
