import Img from "../Img";
import styles from "./index.less";
import { Link } from 'dva/router';
const WorkItem = (props) => (
  <Link to={`/find/detail/${props.id}`} >
    <div className={styles.workItem}>
      <div className={styles.image}>
        <Img src={props.imageUrl} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{props.project_title}</div>
        <div className={styles.tools}>
          <span className={styles.view}>{props.view_people}</span>
          <span className={styles.skr}>{props.is_like}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <Img className={styles.image} src={props.pic} />
        <p className={styles.name} >{props.username}</p>
        <p className={styles.time} >{props.updated_at}</p>
      </div>
    </div>
  </Link>

);

export default WorkItem;
