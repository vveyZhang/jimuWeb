import { Link } from 'dva/router'
import styles from './index.less'
import Img from '../Img'
const MineCrouseItem = (props) => <div className={styles.coursesItem}>
    <Img className={styles.image} />
    <div className={styles.coursesinfo} >
        <h1 className={styles.title} >{props.coursename}</h1>
        <div className={styles.detail}  >{props.description}</div>
        <div className={styles.count} >
            <span>{props.price}</span>元
        <b />
            <span>{props.project_template}</span>课时
        <b />
            学习人数：<span>{props.price}</span>
        </div>
        
    </div>
</div>
// <Link to={`/wechat/buy/${props.id}`} className={styles.buy} >查看详情</Link>
export default MineCrouseItem
