import fetch from '../utils/fetch'

export default {
  get: (params) => fetch('GET', '/request/info', params),
  counts: (params) => fetch('GET', '/request/counts', params),
  listAll: (params) => fetch('GET', '/request/all', params),
  listDrafts: (params) => fetch('GET', '/request/draft', params),
  listPedding: (params) => fetch('GET', '/request/pending', params),
  listPassed: (params) => fetch('GET', '/request/passed', params),
  listNopass: (params) => fetch('GET', '/request/notpass', params),
  listAppropriated: (params) => fetch('GET', '/request/appropriated', params)
}
