import request from '../utils/request';

export function queryAllProject() {
  return request('/api/getAllProject');
}
export function queryProject(id) {
  return request(`/api/getProjectDetail/${id}`)
}

export function pushProject(params) {
  return request(`/api/editProjectContent`, params, { method: 'POST' })
}