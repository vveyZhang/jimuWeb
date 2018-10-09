import React, { Component } from 'react'
import TeCode from '../../assets/te-code.jpeg'
import styles from './index.less'
export default class BuySuccess extends Component {
    render() {
        return (
            <div className={styles.buySuccess} >
               <div className={styles.title} >您已成功购买课程</div>
               <div className={styles.time} >开课时间：10月15号</div>
               <div className={styles.time} >请添加课程老师，完成上课准备</div>
                <img src={TeCode} className={styles.teCode} />
            </div>
        )
    }
}
