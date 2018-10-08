import { Component } from "react";
import Breadcrumb from "../../components/Breadcrumb/index";
import InnerBar from "../../components/InnerBar";
import { DefaultPlayer as Video } from "react-html5video";
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
    return (
      <div className={styles.courseVideo}>
        <GlobalMessage />
        <div className="container">
          <Breadcrumb breadcrumbMap={pathMap} />
          <h1 className={styles.courseTitle}>{courseVideo.belong_course_title}</h1>
          <div className={styles.courseVideoContainer}>
            <Video
              loop
              controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
              poster={courseVideo.belong_course_template_project_image}
            >
              <source
                src={"http://" + courseVideo.file_url}
                type="video/mp4"
              />
            </Video>
          </div>
          {
            // <InnerBar title="课程章节" id={courseVideo.project_template}  />
          }
          <div className={styles.courseListVideo}>
            <div className={styles.introduce}>
              {courseVideo.belong_course_courseinfo}<br />
              {courseVideo.belong_course_description}
            </div>
            <div className={styles.chapterList}>
              {
                courseDetail.map((item, index) => <Link key={index} to={`/course/video/${item.id}`}

                  className={classNames(styles.chapterItem, item.id == this.props.match.params.id && styles.now)}>
                  <img src={icon} className={styles.icon} alt="" />
                  <span className={styles.title}>
                    {item.course_detail_name} {item.course_desc}
                  </span>
                  <span className={styles.time}>（{item.file_time}分钟）</span>
                </Link>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseVideo;
