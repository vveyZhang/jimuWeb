import request from '../utils/request';

export function bindClient(params) {
    return request(`/api/bindClient`, params, { method: 'POST' })
}
export function postMessage(params) {
    return request('/api/sendMessageToClient', params, { method: 'POST' })
}