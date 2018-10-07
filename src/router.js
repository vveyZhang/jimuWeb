import { Route, Switch, routerRedux } from "dva/router";
import { getRouterData } from "./common/router";
const { ConnectedRouter } = routerRedux;
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const Layouts = routerData["/"];
  const WeChatLayouts = routerData['/wechat']
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/wechat"   render={WeChatLayouts.component} />
        <Route path="/" render={Layouts.component} />
      </Switch>
    </ConnectedRouter>
  );
}
export default RouterConfig;
