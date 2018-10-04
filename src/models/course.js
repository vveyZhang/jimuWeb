import { queryALLCourse, queryCourse, queryVedio, queryCourseUser } from '../services/course'
export default {
    namespace: 'course',
    state: {
        courseList: [],
        courseDetail: [],
        courseInfo: {},
        courseVideo: {
            courseid: ''
        },
        userCoure: [],
        createOrder: false,
    },
    effects: {
        *queryALLCourse({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(queryALLCourse);
            if (!data.status) return;
            yield put({
                type: 'save', payload: {
                    courseList: data.data
                }
            })
        },
        *queryCourse({ id }, { call, put }) {
            const data = yield call(queryCourse, id);
            if (!data.status) return;
            yield put({
                type: 'save', payload: data.data
            })
        },
        *queryVedio({ id, userid }, { call, put }) {
            const data = yield call(queryVedio, id, userid);
            if (!data.status) return;
            yield put({
                type: 'save', payload: {
                    courseVideo: data.data.courseDetail,
                    courseDetail: data.data.allCourseDetail
                }
            })
        },
        *queryCourseUser({ courseid, userid }, { call, put }) {
            const data = yield call(queryCourseUser, courseid, userid);
            if (!data.status) return;
            yield put({
                type: 'save', payload: {
                    userCoure: data.data
                }
            })
        }
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
