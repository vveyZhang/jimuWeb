import fetch from 'dva/fetch';
import { message, notification } from 'antd'
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  notification.error({
    message: response.status
  })
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, params, options) {
  const defaultOptions = {
    credentials: 'include',
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    var formdata = new FormData();
    for (let key in params) {
      if (params[key] != null) formdata.append(key, params[key])

    }
    // newOptions.headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    //   ...newOptions.headers,
    // };
    newOptions.body = formdata
  } else {
    //  get 请求
    let paramsArray = [];
    //拼接参数
    if (params) {
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if(!data.status) message.error(data.msg);
      return data
    })
    .catch(err => err);
}
