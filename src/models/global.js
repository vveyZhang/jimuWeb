import localStorage from 'localStorage';
import { getUserInfo, getUserIdWeb, getUserWechat } from '../services/user'
import { message } from 'antd'
import qs from 'qs'
let user = localStorage.getItem('user')
user = JSON.parse(user)
export default {
  namespace: 'global',
  state: {
    loginVisiable: false,
    user: {
      status: false,
      ...user,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((his) => {
        const urlStr = his.search.split('?')[1];
        const params = qs.parse(urlStr)
        if (!params.code || !params.state) {
          let userInfo = localStorage.getItem('user');
          if (!userInfo) {
            window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx25631b805a2faeb5&redirect_uri=' +
              'http://www.jimubiancheng.com' + his.pathname + his.search +
              '&response_type=code&scope=snsapi_userinfo&state=123456789012#wechat_redirect';
          }
        };
        try {
          let userInfo = localStorage.getItem('user');
          let userIno = JSON.parse(userInfo)
          if (userIno.status) return;
          if (his.pathname.indexOf('/wechat') == 0) {
            dispatch({
              type: 'loginWechat', params: {
                code: params.code,
                state: params.state
              }
            })
          } else {
            dispatch({
              type: 'loginWeb', params: {
                code: params.code,
                state: params.state
              }
            })
          }

        } catch (error) {
          if (his.pathname.indexOf('/wechat') == 0) {
            dispatch({
              type: 'loginWechat', params: {
                code: params.code,
                state: params.state
              }
            })
          } else {
            dispatch({
              type: 'loginWeb', params: {
                code: params.code,
                state: params.state
              }
            })
          }
        }
      });
    },
  },
  effects: {
    *loginWeb({ params }, { call, put }) {
      const { data } = yield call(getUserIdWeb, params);
      if (data) {
        yield put({ type: 'getUserInfo', id: data.unionid });
      }
    },
    *loginWechat({ params }, { call, put }) {
      const { data } = yield call(getUserWechat, params);
      if (data) {
        yield put({ type: 'getUserInfo', id: data.unionid });
      }
    },
    *getUserInfo({ id }, { call, put }) {
      const userRes = yield call(getUserInfo, id);
      if (!userRes || !userRes.status) return message.error('获取用户信息失败');
      yield put({
        type: 'saveUser', playload: {
          ...userRes.data,
          status: true
        }
      });
    }
  },

  reducers: {
    save(state, { playload }) {
      return { ...state, ...playload };
    },
    saveUser(state, { playload }) {
      localStorage.setItem('user', JSON.stringify({ ...state.user, ...playload }))
      return { ...state, user: { ...state.user, ...playload } };
    }
  },

};
