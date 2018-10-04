import  { Component } from "react";
import Title from "../Title/Title";
import classNames from "classnames";
import styles from "./index.less";
class Team extends Component {
  componentDidMount() { }
  state = {};

  render() {
    return (
      <div className={styles.teamContainer}>
        <div className="container">
          <Title
            theme="white"
            title="专业团队"
            text="超一流的师资团队超一流的师资团队超一流的师资团队超一流的师资团队"
          />
          <div className={styles.swiperContainer}>
            <div className={styles.teamPersion}>
              <p className={styles.title}>姓名</p>
              <p className={styles.text}>国内知名高校计算机科学专业硕士</p>
            </div>
            <div className={styles.teamPersion}>Slide 2</div>
            <div className={styles.teamPersion}>Slide 3</div>
            <div className={styles.teamPersion}>Slide 4</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
