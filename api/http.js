import axios from 'axios'
import NProgress from 'nprogress'

/**
 * Responsible for all HTTP requests.
 */
export const http = {
  request (method, url, data) {
    method = method.toLowerCase()
    return axios.request({ url, data, method })
  },

  get (url, data) {
    return this.request('get', url, data)
  },

  post (url, data) {
    return this.request('post', url, data)
  },

  put (url, data) {
    return this.request('put', url, data)
  },

  delete (url, data = {}) {
    return this.request('delete', url, data)
  },

  /**
   * Init the service.
   */
  init () {
    axios.defaults.baseURL = `${process.env.BASE_API_URL}`

    // Intercept the request to make sure the token is injected into the header.
    axios.interceptors.request.use(config => {
      // config.headers.Authorization = `Bearer ${ls.get('jwt-token')}`
      config.headers.token = localStorage.getItem('token')
      return config
    })

    // Intercept the response and…
    axios.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      // Also, if we receive a Bad Request / Unauthorized error
      if (error.response.status === 400 || error.response.status === 401) window.location.href = '/#/login'

      return Promise.reject(error)
    })
  }
}
