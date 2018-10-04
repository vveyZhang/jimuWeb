import styles from "./Title.less";
import classNames from "classnames";
const Title = ({ title, theme, text }) => (
  <div className={classNames(styles.titleContainer,theme)}>
    <p className={styles.title}>{title}</p>
    <p className={styles.text}>{text}</p>
  </div>
);

export default Title;
