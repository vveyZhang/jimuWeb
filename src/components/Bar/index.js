import  { Component } from "react";
import styles from "./index.less";
import PropTypes from "prop-types";
import classNames from "classnames";
class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current ? props.current : 0
    };
  }
  changeTab = index => {
    this.setState({
      current: index
    });
    if (this.props.changeTab) this.props.changeTab(index);
  };
  render() {
    const { name, tab } = this.props;
    const { current } = this.state;
    return (
      <div className={styles.bar}>
        <div className={styles.barTitle}>{name}</div>
        {tab.map((item, index) => (
          <div
            key={index}
            className={classNames(
              styles.barItem,
              index == current && styles.itemCur
            )}
            onClick={() => this.changeTab(index)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
}
Bar.propTypes = {
  name: PropTypes.string.isRequired,
  current: PropTypes.number,
  tab: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Bar;
