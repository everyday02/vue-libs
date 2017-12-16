import fetch from '../utils/fetch'

export default {
  getBaseData: (params) => fetch('GET', '/util/baseData', params),
  upload: (params) => fetch('POST', '/util/upload', params),
  getWeixinTicket: (params) => fetch('GET', '/util/weixinTicket', params)
}
