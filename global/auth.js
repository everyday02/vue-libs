// 设置登录用户
export function setLoginUser (user) {
  return localStorage.setItem('loginUser', user)
}

// 获取登录用户
export function getLoginUser () {
  return JSON.parse(localStorage.getItem('loginUser'))
}

// 清除登录用户
export function removeLoginUser () {
  return localStorage.removeItem('loginUser')
}

// 是否为政府用户
export function isGov () {
  const user = getLoginUser()
  return (user.organization.type === 1 || user.organization.type === 2 || user.organization.type === 3)
}
