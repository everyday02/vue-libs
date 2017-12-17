import * as auth from './auth'
import * as path from './path'
import * as base from './base'
import * as message from './message'
export default{
  install (Vue, options) {
    // 全局属性
    const G = {
      base,
      auth,
      path,
      message
    }
    Vue.prototype.G = G
    window.G = G
  }
}
