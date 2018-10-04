import { queryComments, addComment } from '../services/comments'
import { message } from 'antd'
export default {
    namespace: 'comments',
    state: {
        list: []
    },
    effects: {
        *queryComments({ id }, { call, put }) {  // eslint-disable-line
            const data = yield call(queryComments, id);
            if (!data.status) return;
            yield put({
                type: 'save', payload: {
                    list: data.data
                }
            })
        },
        *addComment({ params }, { call, put }) {
            const data = yield call(addComment, params);
            if (!data.status) return;
            message.success(`${params.reply_userid == null ? '评论' : '回复'}成功`);
            yield put({ type: "queryComments", id: params.projectid })
        }
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
