import { Component } from "react";
import Breadcrumb from "../../components/Breadcrumb/index";
import styles from "./index.less";
import { Link } from 'dva/router'
import Scratch from '../../components/Scratch'
import Loading from '../../components/Loading'
import { connect } from 'dva';
@connect(({ project, loading, global }) => ({
  project: project.projectDetail,
  user: global.user,
  loading: loading.effects['project/queryProject'],
}))
class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchProject(props.match.params.id)
  }
  fetchProject = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'project/queryProject', id });
    dispatch({ type: 'comments/queryComments', id })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      const id = this.props.match.params.id
      this.fetchProject(id)
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.getWindowSize);
  }
  UNSAFE_componentWillMount() {
    window.removeEventListener("resize", this.getWindowSize);
  }
  handleComment = (content, reply_userid = null) => {
    const { project, user, dispatch } = this.props;
    dispatch({
      type: 'comments/addComment', params: {
        projectid: project.id,
        userid: user.id,
        content,
        reply_userid
      }
    })
  }
  render() {
    const { project, commentsList, user, commentsLoding } = this.props;
    const pathMap = [
      {
        path: "/course",
        name: "课程"
      },
      {
        name: project.project_title
      }
    ];
    return (
      <div>
        <div className="container">
          <Breadcrumb breadcrumbMap={pathMap} isBlack={true} />
          <div className={styles.workDetailContent}>
            <div className={styles.workDetailWrap}>
              <div className={styles.projectWrap} >
                <Scratch imgSrc={project.project_image} url={project.project_file} />
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectText} >
                  <h1 className={styles.title} >作品介绍：</h1>
                  <div className={styles.content} >{project.project_desc}</div>
                </div>
                <div className={styles.projectSetting} >
                  <h1 className={styles.title} >操作介绍：</h1>
                  <div className={styles.content} >{project.project_opera_instruction}</div>
                </div>
                <div className={styles.btnContainer} >
                  {
                    user.id == project.userid ?
                      <Link to={`/scratch/proid=${project.id}`} className={styles.btn}  >去修改</Link>
                      : null
                  }
                </div>
              </div>
            </div>
            <div className={styles.commentContainer} >
              <CommentsInput login={user.status} onInput={this.handleComment} />
            </div>
          </div>
          <div className={styles.commentList} >
            <Loading loading={commentsLoding} />
            {
              commentsList.map((comments, index) => <Comments handleComment={this.handleComment} login={user.status} {...comments} key={index} />)
            }

          </div>
        </div>
      </div>
    );
  }
}

export default WorkDetail;
