import request from '../utils/request';

export function queryComments(projectid) {
    return request(`/api/getProjectCommentList/${projectid}`)
}
export function addComment(params) {
    return request(`/api/addProjectComment`, params, { method: 'POST' })
}