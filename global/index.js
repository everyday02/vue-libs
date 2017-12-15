import * as auth from './auth'

export default{
  install (Vue, options) {
    // 全局属性
    const G = { auth }
    Vue.prototype.G = G
  }
}
