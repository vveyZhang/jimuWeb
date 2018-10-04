import  { Component } from "react";
import styles from "./index.less";
import Bar from "../../components/Bar";
import CourseItem from "../../components/CourseItem";
import InnerBar from "../../components/InnerBar";
import Loading from '../../components/Loading'
import { connect } from 'dva'

@connect(({ course, loading }) => ({
  list: course.courseList,
  loading: loading.effects["course/queryALLCourse"]
}))
class CourseList extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props;
    dispatch({ type: 'course/queryALLCourse' })
  }

  render() {
    const { list, loading } = this.props;
    return (
      <div className={styles.course} >
        <div className="container">
          <Bar tab={["最新", "最热"]} name="课程" />
          <div className={styles.courseList}>
            <Loading loading={loading} />
            {list.map((item, index) => <CourseItem {...item} key={index} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseList;
