//2018-04-07T01:45:05.000Z
function getDate(dateString) {
  let date = dateString.split('T')[1]
  return date.substring(0, date.lastIndexOf('.'))
}

module.exports = {
  getDate
}