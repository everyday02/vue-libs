import fetch from '../utils/fetch'

export default {
  list: (params) => fetch('GET', '/themes', params),
  post: (params) => fetch('POST', '/themes', params)
}
