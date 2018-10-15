import { Component } from "react";
import styles from "./index.less";
import PropTypes from "prop-types";
class InnerBar extends Component {
  static propTypes = {
    title: PropTypes.string
  };
  render() {
    const { title, id, hideBtn } = this.props;
    return (
      <div className={styles.innerBar}>
        <div className={styles.title}>{title}</div>
        {
          !hideBtn ? <a className={styles.button} href={`http://www.jimubiancheng.com/scratch?proid=${id}`}>
            去创作
        </a> : null
        }

      </div>
    );
  }
}

export default InnerBar;
