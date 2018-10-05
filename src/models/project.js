import { queryAllProject, queryProject, pushProject } from '../services/project';
import { message } from 'antd'
export default {
    namespace: 'project',
    state: {
        projectList: [],
        projectDetail: {
            project_file: ''
        },
    },
    effects: {
        *queryAllProject({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(queryAllProject);
            if (!data.status) return;
            yield put({
                type: 'save', payload: {
                    projectList: data.data
                }
            })
        },
        *queryProject({ id }, { call, put }) {
            const data = yield call(queryProject, id);
            if (!data.status) return;
            yield put({
                type: 'save', payload: {
                    projectDetail: data.data
                }
            })
        },
        *pushProject({ params }, { call }) {
            const data = yield call(pushProject, params);
            if (!data.status) return;
            message.success('编辑成功')
        }
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
