import { bindClient, postMessage } from '../services/message'
import { message } from 'antd'
export default {
    namespace: 'message',
    state: {
        list: [],
        webSocket: false,
        content: '',
        messageCount: 0,
        visiable: false
    },
    effects: {
        *bindClient({ payload }, { call, put }) {  // eslint-disable-line
            yield call(bindClient, payload);
            yield put({
                type: 'save', payload: {
                    webSocket: true
                }
            })
        },
        *postMessage({ payload }, { call, put }) {  // eslint-disable-line
            const data = yield call(postMessage, payload);
            // if (!data.status) return message.warn('发送失败');
            yield put({
                type: 'saveMessage', payload: {
                    content: payload.message,
                    type: 'user'
                }
            })
            yield put({
                type: 'save', payload: {
                    content: ''
                }
            })
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
        saveMessage(state, { payload }) {
            return { ...state, list: [...state.list, payload] }
        }
    },

};
