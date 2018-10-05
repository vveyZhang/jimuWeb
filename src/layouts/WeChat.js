import  { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { Switch, Route, Redirect } from "dva/router";
import { getRoutes } from "../utils/index";
import pathToRegexp from "path-to-regexp";
export default class WeChat extends Component {
    getPage() {
        const { routerData, location } = this.props;
        const { pathname } = location;
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
        const { match, routerData } = this.props;
        return (
            <DocumentTitle title={page.title} >
                <div>
                    <Switch>
                        {getRoutes(match.path, routerData).map(item => (
                            <Route
                                key={item.key}
                                path={item.path}
                                component={item.component}
                                exact={item.exact}
                            />
                        ))}
                        <Redirect exact from="/wechat/" to="/wechat/course" />
                    </Switch>
                </div>
            </DocumentTitle>
        )
    }
}
