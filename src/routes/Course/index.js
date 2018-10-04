import  { Component } from "react";
import { Switch, Route } from "dva/router";
import { getRoutes } from "../../utils/index";
import CourseList from "./CourseList";
class Course extends Component {
  render() {
    const { match, routerData } = this.props;
    return (
      <Switch>
        {getRoutes(match.path, routerData).map(item => (
          <Route
            key={item.key}
            path={item.path}
            component={item.component}
            exact={item.exact}
          />
        ))}
        <Route exact path={match.path} render={(props) => <CourseList {...props} />} />
      </Switch>
    );
  }
}

export default Course;
