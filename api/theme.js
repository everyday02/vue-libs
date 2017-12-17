import fetch from '../utils/fetch'

export default {
  get: (params) => fetch('GET', '/theme/info', params),
  similar: (params) => fetch('GET', '/theme/similar', params),
  list: (params) => fetch('GET', '/themes', params),
  post: (params) => fetch('POST', '/themes', params),
  follow: (params) => fetch('POST', '/theme/follow', params),
  unfollow: (params) => fetch('POST', '/theme/unfollow', params)
}
