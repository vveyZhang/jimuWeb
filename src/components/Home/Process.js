import  { Component } from "react";
import classNames from 'classnames'
import Title from "../Title/Title";
import styles from "./index.less";
class Process extends Component {
  state = {};
  render() {
    return (
      <div className={classNames(styles.pro, "container")}>
        <Title title="完善的课程系统" text="完善的学习流程，帮助孩子快速吸收" />
        <div className={styles.proContainer}>
          <div className={classNames(styles.proItem, styles.proItem1)}>
            <div className={styles.proTitle} style={{ marginLeft: "105px" }}>
              线上课程
            </div>
            <div className={classNames(styles.proDetail, styles.proDetail1)}>
              <p>自由上课</p>
              <p>解放家长</p>
              <p>时间更灵活</p>
              <p>可反复查看</p>
            </div>
          </div>
          <div className={classNames(styles.proItem2, styles.proItem)}>
            <div className={styles.proTitle} style={{ marginLeft: "145px" }}>
              在线作业
            </div>
            <div className={classNames(styles.proDetail, styles.proDetail2)}>
              <p>边学边练，检验学习成果</p>
              <p>在线作业，完全还原变成环境</p>
            </div>
          </div>
          <div className={classNames(styles.proItem3, styles.proItem)}>
            <div
              className={styles.proTitle}
              style={{ marginRight: "-12px", textAlign: "right" }}
            >
              在线答疑+课外辅导老师
            </div>
            <div className={classNames(styles.proDetail, styles.proDetail3)}>
              <div className={styles.line1}>
                <p className={styles.p1}>全方位覆盖学生课堂内外</p>
              </div>
              <div className={styles.line2}>
                <p className={styles.p2}>教学无盲点</p>
                <p className={styles.p3}>学生更轻松</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Process;
