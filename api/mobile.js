import fetch from '../utils/fetch'

export default {
  postPasswordCode: (params) => fetch('POST', '/mobile/sendChangePasswordCode', params)
}
