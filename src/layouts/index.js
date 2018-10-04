import { Component } from "react";
import DocumentTitle from "react-document-title";
import pathToRegexp from "path-to-regexp";
import Header from "./header";
import Footer from "./footer";
import { Switch, Route, Redirect } from "dva/router";
import PropTypes from "prop-types";
import { getRoutes } from "../utils/index";
import styles from './index.less'
import { connect } from 'dva'
@connect(({ global }) => ({
  userInfo: global.user
}))
class Layouts extends Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  };
  state = {
    winHeight: 660
  }
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData
    };
  }
  getWindowHeight = () => {
    let winHeight = 0;
    if (window.innerHeight)
      winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
      winHeight = document.body.clientHeight;
    this.setState({ winHeight })
  }
  componentDidMount() {
    this.getWindowHeight();
    window.addEventListener('resize', this.getWindowHeight)
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.getWindowHeight)
  };

  getPage() {
    const { routerData, location } = this.props;
    const { pathname, search } = location;
    console.log(location)
    let title = "积木编程";
    let currRouterData = null;
    let path = "/";
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
        path = key;
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - 积木编程`;
    }
    return { title, path };
  }

  render() {
    const page = this.getPage();
    const { winHeight } = this.state;
    const { match, routerData, userInfo } = this.props;
    const { location } = this.props;
    const { search } = location;
    return (
      <DocumentTitle title={page.title}>
        <div className={styles.mainPage}  >
          <Header path={page.path} {...userInfo} search={search} />
          <div className={styles.main} style={{ minHeight: winHeight + "px" }} >
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/" to="/home" />
            </Switch>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default Layouts;
