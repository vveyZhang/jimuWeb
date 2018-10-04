import request from '../utils/request';

export function queryALLCourse() {
  return request('/api/getAllCourse');
}
export function queryCourse(id) {
  return request(`/api/getCourseList/${id}`);
}
export function queryCourseUser(courseId, userId) {
  return request(`/api/getCourseLearnStatus/${courseId}/${userId}`)
}
export function queryVedio(courseId, userId) {
  return request(`/api/getCourseDetail/${courseId}/${userId}`);
}