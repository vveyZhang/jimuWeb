import { getUserInfo, getUserId, getUserCourse, getUserProject, updateUserInfo } from '../services/user'
import { message } from 'antd'
export default {
    namespace: 'user',
    state: {
        userCourse: [],
        userProject: []
    },
    effects: {
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
