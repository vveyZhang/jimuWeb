import  { Component } from "react";
import Bar from "../../components/Bar";
import styles from "./index.less";
import WorkItem from "../../components/WorkItem";
import Loading from '../../components/Loading'
import { connect } from 'dva'
@connect(({ project, loading }) => ({
  list: project.projectList,
  loading: loading.effects["project/queryAllProject"]
}))
class FindList extends Component {
  constructor(props) {
    super(props)
    props.dispatch({ type: "project/queryAllProject" })
  }
  state = {};
  render() {
    const { loading, list } = this.props;
    return (
      <div className={styles.find}>
        <div className="container">
          <Bar tab={["最新"]} name="作品" />
          <div className={styles.findList}>
            <Loading loading={loading} />
            {
              list.map((item, index) => <WorkItem {...item} key={index} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FindList;
