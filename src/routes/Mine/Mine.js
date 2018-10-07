import  { Component } from 'react'
import styles from './index.less'
import { connect } from 'dva';
import { Switch, Route, Redirect } from "dva/router";
import { getRoutes } from "../../utils/index";
import Exception from '../Exception'
@connect(({ global }) => ({
    user: global.user
}))
export default class Mine extends Component {
    render() {
        const { user, match, routerData } = this.props;
        return (
            <div>
                <div className={styles.header} >
                    <div className={styles.userbanner} ></div>
                    <div className={styles.userImage} >
                        <img alt='' src={user.pic} />
                    </div>
                    <div className={styles.userName} >
                        {user.nick}
                    </div>
                </div>
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
                        <Redirect exact from="/mine" to="/mine/course" />
                        <Route component={Exception} />
                    </Switch>
                </div>
            </div>
        )
    }
}
