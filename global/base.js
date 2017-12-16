var baseData = null
// 获取基础数据
export function getBaseData () {
  if (!baseData) baseData = JSON.parse(sessionStorage.getItem('dic'))
  return baseData
}

// 获取基础数据指定属性
export function getBaseDataProperty (key) {
  return getBaseData()[key]
}
