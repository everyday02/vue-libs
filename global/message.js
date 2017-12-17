import { Message } from 'element-ui'

export function info (message, options) {
  Message({
    message,
    ...options
  })
}

export function success (message, options) {
  Message({
    type: 'success',
    message,
    ...options
  })
}

export function error (message, options) {
  Message({
    type: 'error',
    message,
    ...options
  })
}

export function warning (message, options) {
  Message({
    type: 'warning',
    message,
    ...options
  })
}
