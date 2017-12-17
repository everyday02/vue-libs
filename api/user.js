import fetch from '../utils/fetch'

export default {
  get: (params) => fetch('GET', '/user/info', params),
  post: (params) => fetch('POST', '/user/add', params),
  put: (params) => fetch('PUT', '/user/update', params),
  delete: (params) => fetch('DELETE', '/user/delete', params),
  putPassWord: (params) => fetch('POST', '/user/changePassword', params)
}
