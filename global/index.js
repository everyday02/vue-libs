import * as auth from './auth'
import * as path from './path'
import * as base from './base'

export default{
  install (Vue, options) {
    // 全局属性
    const G = {
      base,
      auth,
      path
    }
    Vue.prototype.G = G
  }
}
