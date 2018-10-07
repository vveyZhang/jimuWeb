import { createElement } from "react";
import Loadable from "react-loadable";
import Loading from '../components/Loading'
let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf("/") + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf(".then(") < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache
          });
      });
    },
    loading: () => {
      return <Loading loading={true} />;
    }
  });
};
export const getRouterData = app => {
  const routerConfig = {
    "/": {
      component: dynamicWrapper(app, ['global', 'message'], () => import("../layouts/index")),
      exact: true
    },
    "/home": {
      component: dynamicWrapper(app, [], () => import("../routes/Home")),
      exact: false
    },
    "/course": {
      component: dynamicWrapper(app, ['course'], () => import("../routes/Course")),
      exact: false
    },
    "/course/detail/:id": {
      component: dynamicWrapper(app, ['course'], () =>
        import("../routes/Course/CourseDetail")
      ),
      exact: false
    },
    "/course/video/:id": {
      component: dynamicWrapper(app, ['course'], () =>
        import("../routes/Course/CourseVideo")
      ),
      exact: false
    },
    "/find": {
      component: dynamicWrapper(app, ['project'], () => import("../routes/Find")),
      exact: false
    },
    "/find/detail/:id": {
      component: dynamicWrapper(app, ['project', 'comments'], () =>
        import("../routes/Find/WorkDetail")
      ),
      exact: false
    },
    "/find/editor/:id": {
      component: dynamicWrapper(app, ['project'], () =>
        import("../routes/Find/WorkEditor")
      ),
      exact: false
    },
    "/mine": {
      component: dynamicWrapper(app, [], () => import("../routes/Mine/Mine")),
      exact: false
    },
    "/mine/course": {
      component: dynamicWrapper(app, ['user'], () => import("../routes/Mine/MineCourse")),
      exact: false
    },
    "/mine/project": {
      component: dynamicWrapper(app, ['user'], () => import("../routes/Mine/MineProject")),
      exact: false
    },
    "/mine/setting": {
      component: dynamicWrapper(app, ['user'], () => import("../routes/Mine/MineSetting")),
      exact: false
    },
    "/wechat": {
      component: dynamicWrapper(app, ['course'], () =>
        import("../layouts/WeChat")
      ),
      exact: false
    },
    "/wechat/course": {
      component: dynamicWrapper(app, ['course', 'user'], () =>
        import("../routes/WeChat/WCrouseList")
      ),
      exact: false
    },
    "/wechat/buy/:id": {
      component: dynamicWrapper(app, ['course'], () =>
        import("../routes/WeChat/BuyCrouse")
      ),
      exact: false
    }, "/wechat/order/:id": {
      component: dynamicWrapper(app, ['course'], () =>
        import("../routes/WeChat/ConfirmOrder")
      ),
      exact: false
    },
    "/exception": {
      component: dynamicWrapper(app, [], () =>
        import("../routes/Exception")
      ),
      exact: false
    },
  };
  let routes = {};
  Object.keys(routerConfig).forEach(key => {
    const router = {
      ...routerConfig[key],
      key
    };
    routes[key] = router;
  });
  return routes;
};
