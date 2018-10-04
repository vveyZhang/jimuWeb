import  { Component } from "react";
import { Switch, Route } from "dva/router";
import { getRoutes } from "../../utils/index";
import FindList from "./FindeList";
class Find extends Component {
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
        <Route exact path={match.path} render={(props) => <FindList {...props} />} />
      </Switch>
    );
  }
}

export default Find;
