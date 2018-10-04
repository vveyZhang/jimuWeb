import  { Component } from "react";
import styles from "./index.less";
import classNames from "classnames";
import Breadcrumb from "../../components/Breadcrumb/index";
import InnerBar from "../../components/InnerBar";
import { Link } from "dva/router";
import { connect } from 'dva'
import icon from "../../assets/play-smal-icon.png";
import reportedIcon from '../../assets/reported-icon.png';
import GlobalMessage from '../../components/GlobalMessage'
function courseStatus(id, course) {
  let status = false;
  for (let item of course) {
    if (item.detailid == id) {
      status = true;
      break;
    }
  }
  return status
}

@connect(({ course, loading, global }) => ({
  courseDetail: course.courseDetail,
  courseInfo: course.courseInfo,
  user: global.user,
  userCoure: course.userCoure,
  loading: loading.effects["course/queryCourse"]
}))
class CourseDetail extends Component {
  constructor(props) {
    super(props)
    const id = props.match.params.id;
    this.fetchCourse(id);
  }
  fetchCourse(id) {
    const { dispatch, user } = this.props;
    dispatch({ type: "course/queryCourse", id });
    if (user.id) {
      dispatch({ type: "course/queryCourseUser", courseid: id, userid: user.id });
    }

  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      const id = this.props.match.params.id
      this.fetchCourse(id)
    }
  }
  render() {
    const { courseInfo, courseDetail, userCoure } = this.props;
    const pathMap = [
      {
        path: "/course",
        name: "课程"
      },
      {
        path: `course/${courseInfo.id}`,
        name: courseInfo.coursename
      }
    ];
    console.log(courseDetail)
    return (
      <div className={styles.courseDetail}>
        <div className="container">
          <GlobalMessage />
          <Breadcrumb breadcrumbMap={pathMap} />
          <div className={styles.courseHeader}>
            <div className={styles.left}>
              <h1 className={styles.title}>{courseInfo.coursename}</h1>
              <div className={styles.courseInfo}>
                价格：<b>{courseInfo.price}元</b><span>|</span>
                课时：{courseInfo.project_template}
                <span>|</span>
                学习人数：{courseInfo.learn_people}人
              </div>
              <div className={styles.courseBuy}>
                购买状态：
                <span className={styles.buy}>已购买</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.button}>开始学习 </div>
            </div>
          </div>
          <InnerBar title="课程章节" />
          <div className={styles.courseContent}>
            <div className={styles.left}>
              <div className={styles.introduce}>
                {courseInfo.description}<br />
                {courseInfo.courseinfo}
              </div>
              <div className={styles.chapterList}>
                {
                  courseDetail.map((item, index) => <Link key={index} to={`/course/video/${item.id}`} className={styles.chapterItem}>
                    <img src={icon} className={styles.icon} alt="" />
                    <span className={styles.title}>
                      {item.course_detail_name} {item.course_desc}
                    </span>
                    <span className={styles.time}>（{item.file_time}分钟）</span>
                  </Link>)
                }
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.report}>
                {
                  courseDetail.map((item, index) => (
                    <div
                      key={index}
                      className={classNames(styles.reportItem, courseStatus(item.pre_detalid, courseDetail) && styles.reported)}
                    >
                      {index + 1} 节
                      <img className={styles.icon} alt="" src={reportedIcon} />
                    </div>
                  ))
                  //   this.getReport(2).map((item, index) => (
                  //     <div key={index} className={styles.reportItem} />
                  // ))
                }
              </div>
              <div className={styles.reportText}>
                <p>
                  发布相关章节作业，并分享到朋友圈签到成功，完成本课时签到，将获得xxx小礼品！！
                </p>
                <p className={styles.min}>
                  （礼品发放方式：完善个人信息中...地址信息，我们将邮寄到该地址）
                </p>
                <div className={classNames(styles.button, styles.dispaly)}>
                  立即领取
                </div>
              </div>
              <div className={styles.weCode}>
                <img alt="" className={styles.code} />
                <p>欢迎加入家长群进行交流</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;
