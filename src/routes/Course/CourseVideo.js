import { Component } from "react";
import Breadcrumb from "../../components/Breadcrumb/index";
import InnerBar from "../../components/InnerBar";
import { Link, routerRedux } from "dva/router";
import { connect } from 'dva'
import classNames from 'classnames'
import icon from "../../assets/play-smal-icon.png";
import "react-html5video/dist/styles.css";
import styles from "./index.less";
import GlobalMessage from '../../components/GlobalMessage'
@connect(({ course, loading, global }) => ({
  courseVideo: course.courseVideo,
  courseDetail: course.courseDetail,
  user: global.user,
  loading: loading.effects["course/queryVedio"]
}))
class CourseVideo extends Component {
  constructor(props) {
    super(props)
    const id = props.match.params.id;
    this.fetchVideo(id);
    const { user, dispatch } = props;
    if (!user.status) dispatch(routerRedux.push('/exception'))
  }
  fetchVideo(id) {
    const { dispatch, user } = this.props;
    dispatch({ type: "course/queryVedio", id, userid: user.id });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      const id = this.props.match.params.id
      this.fetchVideo(id)
    }
  }
  render() {
    const { courseVideo, courseDetail } = this.props;
    const pathMap = [
      {
        path: "/course",
        name: "课程"
      },
      {
        path: `/course/detail/${courseVideo.courseid}`,
        name: courseVideo.belong_course_title
      },
      {
        path: "/course/video/2",
        name: courseVideo.course_detail_name
      }
    ];
    console.log(courseVideo)
    return (
      <div className={styles.courseVideo}>
        <GlobalMessage />
        <div className="container">
          <Breadcrumb breadcrumbMap={pathMap} />
          <h1 className={styles.courseTitle}>{courseVideo.belong_course_title}</h1>
          <div className={styles.courseVideoContainer}>
            {
              courseVideo.file_url ? <video
                 className={styles.videoContainer}
                // class="video-js"
                controls
                // preload="auto"
                // poster={}
                data-setup='{}'>
                <source src={courseVideo.file_url} type="video/mp4"></source>
                <p className="vjs-no-js">
                  您的浏览器不支持视频播放，请下载最新版本
            <a href="http://videojs.com/html5-video-support/" target="_blank">点击查看</a>
                </p>
              </video> : null
            }

          </div>
          <InnerBar title="课程章节" id={courseVideo.belong_course_template_project_file} />
          <div className={styles.courseListVideo}>
            <div className={styles.introduce}>
              {courseVideo.belong_course_courseinfo}<br />
              {courseVideo.belong_course_description}
            </div>
            <div className={styles.chapterList}>
              {
                courseDetail.map((item, index) => <a key={index} href={`/course/video/${item.id}`}

                  className={classNames(styles.chapterItem, item.id == this.props.match.params.id && styles.now)}>
                  <img src={icon} className={styles.icon} alt="" />
                  <span className={styles.title}>
                    {item.course_detail_name} {item.course_desc}
                  </span>
                  <span className={styles.time}>（{item.file_time}分钟）</span>
                </a>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseVideo;
