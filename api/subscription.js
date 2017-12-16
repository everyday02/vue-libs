import fetch from '../utils/fetch'

export default {
  getObservable: (params) => fetch('GET', '/subscription/observable', params),
  subscribe: (params) => fetch('POST', '/subscription/subscribe', params),
  unsubscribe: (params) => fetch('POST', '/subscription/unsubscribe', params)
}
