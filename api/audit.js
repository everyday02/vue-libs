import fetch from '../utils/fetch'

export default {
  logs: (params) => fetch('GET', '/audit/logs', params)
}
