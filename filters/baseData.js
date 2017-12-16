let baseData = JSON.parse(sessionStorage.getItem('dic'))
export function baseDataMap (value, type) {
  if (!baseData) baseData = JSON.parse(sessionStorage.getItem('dic'))
  let dataMap = {}
  Object.keys(baseData).forEach(function (key) {
    let itemMap = {}
    baseData[key].forEach(function (item) {
      itemMap[item.id] = item.name
    })
    dataMap[key] = itemMap
  })
  return dataMap[type][value]
}
