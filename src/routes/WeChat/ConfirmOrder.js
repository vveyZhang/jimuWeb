import  { Component } from 'react'
import Img from '../../components/Img'
import { connect } from 'dva'
import styles from './index.less'
@connect(({ course, user }) => ({
    courseInfo: course.courseInfo,
    createOrder: course.createOrder,

}))
export default class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        // if (!props.createOrder) {
        //     props.dispatch(routerRedux.replace('/wechat/course'))
        // }
    }
    state = {
        text: null
    }
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    onPay = () => {
        // const { }
    }
    render() {
        const { courseInfo } = this.props;
        const { text } = this.state;
        return (
            <div className={styles.orderContainer} >
                <div className={styles.orderCourse} >
                    <Img className={styles.image} src={'//img11.360buyimg.com/n1/jfs/t15682/129/2364665353/83615/70dc5e39/5aa776d1N6be03e95.jpg'} />
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
                    <div className={styles.button} >立即支付</div>
                </div>
            </div>
        )
    }
}
