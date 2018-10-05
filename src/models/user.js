import { userPay, getUserCourse, getUserProject, updateUserInfo } from '../services/user'
import { message } from 'antd'
import { WXPayment } from '../utils/pay'
export default {
    namespace: 'user',
    state: {
        userCourse: [],
        userProject: []
    },
    effects: {
        *userPay({ params }, { call, put }) {
            const { data } = yield call(userPay, params);
            if (data) {
                yield call(WXPayment, data)
            }
        },
        *getUserCourse({ id }, { call, put }) {
            const userRes = yield call(getUserCourse, id);
            if (!userRes || !userRes.status) return;
            yield put({ type: 'save', payload: { userCourse: userRes.data } })
        },
        *getUserProject({ id }, { call, put }) {
            const userRes = yield call(getUserProject, id);
            if (!userRes || !userRes.status) return;
            yield put({ type: 'save', payload: { userProject: userRes.data } })
        },
        *updateUserInfo({ params }, { call, put }) {
            const userRes = yield call(updateUserInfo, params);
            if (!userRes || !userRes.status) return;
            yield put({ type: 'global/getUserInfo', id: params.userid })
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
