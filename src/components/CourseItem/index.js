import Img from "../Img";
import classnames from 'classnames'
import styles from "./index.less";
import { Link } from "dva/router";
import { Modal } from 'antd';
function Tips() {
  Modal.warn({
    title: "课程还未开始",
    content: "关注公众号，实时了解课程进度"
  })
}
const Courseitem = (props) => (
  <div className={classnames(styles.courseItem)}>
    <div className={styles.courseImage}>
      <Link to={`/course/detail/${props.id}`} ><Img src={props.thumb} /></Link>
    </div>
    <div className={styles.courseContent}>
      <h1 className={styles.title}>{props.coursename}</h1>
      <p className={styles.content}>
        {props.courseinfo}
        <br />
        {props.description}
      </p>
      <div className={styles.footer}>
        <div className={styles.info}>
          <span>{props.price}</span>元<b />
          <span>{props.project_template}</span>
          课时
          <b />
          学习人数：
          <span>{props.learn_people}</span>
        </div>
        {
          props.issale ? <Link to={`/course/detail/${props.id}`} className={styles.button}>
            进入课堂
        </Link> : <p className={classnames(styles.button, styles.unSale)} onClick={Tips} >未开课</p>
        }

      </div>
    </div>
  </div>
);

export default Courseitem;
