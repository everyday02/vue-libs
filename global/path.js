// 获取图片链接
export function resolvePicPath (pathname) {
  return `${process.env.BASE_IMAGE_URL}${pathname}`
}

export function resolveHost (pathname) {
  return `http://${window.location.host}${window.location.pathname}#`
}
