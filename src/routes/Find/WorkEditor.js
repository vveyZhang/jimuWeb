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
    this.fetchProject(props.match.params.id);
    this.state = {
      project_title: '',
      project_desc: '',
      project_opera_instruction: ''
    }
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
  handlePush = () => {
    const { project_title, project_desc, project_opera_instruction } = this.state;
    const { project, dispatch } = this.props;
    dispatch({
      type: 'project/pushProject', params: {
        project_opera_instruction,
        project_title,
        project_desc,
        projectid: project.id
      }
    })

  }
  handleChange = (value, key) => {
    this.setState({
      [key]: value
    })
  }
  render() {
    const { project } = this.props;
    const pathMap = [
      {
        path: "/course",
        name: "课程"
      },
      {
        name: project.project_title
      }
    ];
    const { project_title, project_desc, project_opera_instruction } = this.state;
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
                <div className={styles.editorText} >
                  <h1 className={styles.title} >作品名称：</h1>
                  <input onChange={(e) => this.handleChange(e.target.value, 'project_title')} value={project_title} className={styles.titleInput} placeholder="输入作品名" />
                </div>
                <div className={styles.editorSetting} >
                  <h1 className={styles.title} >操作介绍：</h1>
                  <textarea onChange={(e) => this.handleChange(e.target.value, 'project_opera_instruction')} value={project_opera_instruction} placeholder='输入操作介绍' className={styles.settingInput} ></textarea>
                </div>
                <div className={styles.projectText} >
                  <h1 className={styles.title} >作品介绍：</h1>
                  <textarea onChange={(e) => this.handleChange(e.target.value, 'project_desc')} value={project_desc} placeholder='输入作品介绍' className={styles.settingInput}></textarea>
                </div>

                <div className={styles.btnContainer} >
                  <p className={styles.btn} onClick={() => this.handlePush()}  >发布</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkDetail;
