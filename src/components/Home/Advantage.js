import  { Component } from "react";
import classNames from 'classnames'
import Title from "../Title/Title";
import styles from "./index.less";
class Advantage extends Component {
  state = {};
  render() {
    return (
      <div className={styles.advantage}>
        <div className={classNames("container", styles.advantageContainer)}>
          <Title
            title="积木编程的优势"
            text="内容丰富，学习方式便利，对学生认真负责。"
          />
          <div className={styles.advantageContent}>
            <div
              className={classNames(
                styles.advantageText,
                styles.advantageText1
              )}
            >
              丰富的课程内容 ——
              课程内容结合英语、数学、物理等基础学科知识，学习编程的过程中巩固课本知识，做到活学活用；
            </div>
            <div
              className={classNames(
                styles.advantageText,
                styles.advantageText2
              )}
            >
              灵活的上课方式 ——
              视频课程学习新知识，在线作业完成实践，课外老师一对一辅导；
            </div>
            <div
              className={classNames(
                styles.advantageText,
                styles.advantageText3
              )}
            >
              优质的授课老师 ——
              课程编写老师及授课老师均来自国内外顶尖名校，知名公司一线工程师；
            </div>
            <div
              className={classNames(
                styles.advantageText,
                styles.advantageText4
              )}
            >
              有趣的课程设计 ——
              项目制课程，一节课完成一个小作品，让孩子获得成就感，保持持续学习的热情和专注，每节课都有收获满满；
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Advantage;
