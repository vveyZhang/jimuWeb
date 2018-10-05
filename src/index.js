import dva from 'dva';
import './index.less';
import './polyfill';
import createLoading from 'dva-loading'
import { createHistory, browserHistory } from 'history';
// 1. Initialize
const app = dva({
    history: process.env.NODE_ENV == "development" ? createHistory : browserHistory
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
