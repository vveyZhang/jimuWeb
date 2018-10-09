import styles from './BuyDetail.less'
import courseShow from '../../assets/buy3.jpg'
import courseLc from '../../assets/buy1.jpg'
import courseTe from '../../assets/tebuy.jpeg'
import end from '../../assets/endBuy.jpg'
const BuyDetail = () => {
    return (<div className={styles.container} >
        <div className={styles.title} >课程详情</div>
        <img src="https://jimu-course.oss-cn-beijing.aliyuncs.com/import/jimuindex.jpg" />
        <img src={courseShow} />
        <img src={courseLc} />
        <img src={courseTe} />
        <img src={end} />
        <div className={styles.content} ></div>
    </div>)
}
export default BuyDetail