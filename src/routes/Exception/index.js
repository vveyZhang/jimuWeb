import { Component } from 'react'
import styles from './index.less';
import { Link } from 'dva/router'
export default class Exception extends Component {
    render() {
        return (
            <div className={styles.warp} >
                <div>抱歉，访问错误</div>
                <Link className={styles.btn} to='/home' >去首页</Link>
            </div>
        )
    }
}
