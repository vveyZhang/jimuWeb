import { Route, Switch, routerRedux } from "dva/router";
import { getRouterData } from "./common/router";
import { Spin } from 'antd'
import dynamic from 'dva/dynamic';
import styles from './index.less'
const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const Layouts = routerData["/"];
  const WeChatLayouts = routerData['/wechat']
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/wechat" component={WeChatLayouts.component} />
        <Route path="/" component={Layouts.component} />
      </Switch>
    </ConnectedRouter>
  );
}
export default RouterConfig;
