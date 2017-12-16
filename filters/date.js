import moment from 'moment'

export function timestampFormat (value, format) {
  return moment(value).format(format)
}
