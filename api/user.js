import fetch from '../utils/fetch'

export default {
  get: (params) => fetch('GET', '/user/info', params),
  put: (params) => fetch('PUT', '/user/update', params),
  putPassWord: (params) => fetch('POST', '/user/changePassword', params)
}
