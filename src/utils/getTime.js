export function getTime(date) {
  console.log(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const date1 = date.getDate()
  // const day = date.getDay()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  console.log(year + '-' + month + '-' + date1 + ' ' + hour + ':' + min + ':' + sec)
  return year + '-' + month + '-' + date1 + ' ' + hour + ':' + min + ':' + sec
}
