import fetch from '../utils/fetch'

export default {
  get: (params = {detail: 1}) => fetch('GET', '/organization/info', params),
  patch: (params = {detail: 1}) => fetch('PATCH', '/organization/update', params),
  getAttachments: (params) => fetch('GET', '/organization/attachments', params)
}
