import request from '../utils/request';
export function getUserIdWeb(params) {
  return request('/api/callbackOpen', params)
}
export function getUserWechat(params) {
  return request(`/api/callback`, params);
}
export function getUserInfo(id) {
  return request(`/api/getUserInfoByUnionId/${id}`);
}
export function getUserCourse(id) {
  return request(`/api/getBuiedCourse/${id}`)
}

export function getUserProject(id) {
  return request(`/api/getProjectDetailByUserid/${id}`)
}
export function updateUserInfo(params) {
  return request(`/api/updateUserInfo`, params, { method: 'POST' })
}
export function userPay(params){
  return request(`/api/pay`, params, { method: 'POST' })
}