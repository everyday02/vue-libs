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

// 是否已登录
export function isLogin () {
  const loginUser = getLoginUser()
  return (loginUser !== 'null' && loginUser !== null && loginUser)
}

// 是否为政府用户
export function isGov () {
  const loginUser = getLoginUser()
  return (loginUser.organization.type === 1 || loginUser.organization.type === 2 || loginUser.organization.type === 3)
}
