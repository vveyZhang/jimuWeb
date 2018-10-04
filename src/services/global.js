import request from '../utils/request';
export function getUserId(id, state) {
    return request(`/api/callbackOpe?code=${id}&state=${state}`)
}