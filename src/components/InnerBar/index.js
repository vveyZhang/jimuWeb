import  { Component } from "react";
import styles from "./index.less";
import PropTypes from "prop-types";
class InnerBar extends Component {
  static propTypes = {
    title: PropTypes.string
  };
  render() {
    const { title } = this.props;
    return (
      <div className={styles.innerBar}>
        <div className={styles.title}>{title}</div>
        <a className={styles.button} href="">
          创造作品
        </a>
      </div>
    );
  }
}

export default InnerBar;
