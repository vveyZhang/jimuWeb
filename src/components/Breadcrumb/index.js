import  { Component } from "react";
import { Link } from "dva/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./index.less";
class Breadcrumb extends Component {
  static propTypes = {
    breadcrumb: PropTypes.array,
    isBlack: PropTypes.bool
  };
  static defaultProps = {
    isBlack: false,
    breadcrumb: []
  };
  render() {
    const { breadcrumbMap, isBlack } = this.props;
    return (
      <div className={classNames(styles.breadcrumb, isBlack && styles.black)}>
        <div className={styles.breadcrumbContent}>
          {breadcrumbMap.map((item, index) => (
            <span key={index}>
              {index < breadcrumbMap.length - 1 ? (
                <span>
                  <Link to={item.path}>{item.name}</Link>
                  <b>></b>
                </span>
              ) : (
                  item.name
                )}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Breadcrumb;
