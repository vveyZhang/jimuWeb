import  { Component } from "react";
import Title from "../Title/Title";
import classNames from 'classnames'
import styles from "./index.less";
class Study extends Component {
  state = {};
  render() {
    return (
      <div className={styles.study}>
        <div className="container">
          <div style={{ height: "586px" }}>
            <Title
              theme="white"
              title="为什么学习少儿编程"
              text="提高孩子智力，全面激发孩子的潜能。"
            />
          </div>
          <div className={classNames(styles.studyText, styles.studtText1)}>
            解决问题的能力
          </div>
          <div className={classNames(styles.studyText, styles.studtText2)}>
            独立思考的能力
          </div>
          <div className={classNames(styles.studyText, styles.studtText3)}>
            激发创造力想象力
          </div>
          <div className={classNames(styles.studyText, styles.studtText4)}>
            锻炼逻辑思维能力
          </div>
          <div className={classNames(styles.studyText, styles.studtText5)}>
            培养团队写作能力
          </div>
          <div className={classNames(styles.studyText, styles.studtText6)}>
            从小增强学习能力
          </div>
          <div className={styles.studtContent}>
            <h1>积木编程是面向7～18岁的孩子的编程教育平台。</h1>
            <p>
              结合美国K12计算机科学教育标准与国内孩子的学习特点，设计好玩有趣的游戏化编程课程，精品在线课堂，课内课外双师辅导，用可视化的方式帮助孩子理解复杂的程序逻辑让孩子在解决问题和完成项目中掌握编程能力，巩固基础学科知识，迅速成长。
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Study;
