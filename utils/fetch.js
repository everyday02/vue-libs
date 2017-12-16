import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

// 转化GET请求，data参数为url地址参数
const formatGET = (config) => {
  const data = config.data
  console.info(config.data)
  if (['get'].indexOf(config.method.toLowerCase()) > -1 && data &&
    config.url.indexOf('?') < 0
  ) {
    config.url = config.url + '?' + Object.keys(data).map(
      (key) => {
        if (data[key] === null || data[key] === undefined) return null
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      }
    ).filter(
      (item) => (item !== null && item !== undefined)
    ).join('&')
  }
  return config
}

/**
 * Responsible for all HTTP requests.
 */

const fetch = {
  request (method, url, data) {
    method = method.toLowerCase()
    if (!navigator.onLine) Message.error('网络异常，请确认你的电脑处于联网状态！')
    if (data && data._progress === true) NProgress.start()
    return axios.request({ url, data, method })
  },

  get (url, data = {}, progress = false) {
    return this.request('get', url, data, progress)
  },

  post (url, data = {}, progress = false) {
    return this.request('post', url, data, progress)
  },

  put (url, data = {}, progress = false) {
    return this.request('put', url, data, progress)
  },

  delete (url, data = {}, progress = false) {
    return this.request('delete', url, data, progress)
  },

  /**
   * Init the service.
   */
  init () {
    axios.defaults.baseURL = `${process.env.BASE_API_URL}`
    console.info(`baseURL:${process.env.BASE_API_URL}`)
    // Intercept the request to make sure the token is injected into the header.
    axios.interceptors.request.use(config => {
      config = formatGET(config)
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
      if (error.response && error.response.status === 401) {
        Message.error('登录失效，请重新登录！')
        setTimeout(window.location.href = '/#/login', 1000)
      }
      // 服务器相应错误信息
      if (error.response && error.response.status === 400) {
        console.info(error.response)
        Message.error(error.response.data && error.response.data.message)
      }
      return Promise.reject(error)
    })
  }
}

fetch.init()

export default fetch.request
