
// Sizeup — get the size of a string. Useful for checking if data is too large
// example: app.$sizeup(JSON.stringify(data)))

export default ({ }, inject) => {
  
  // const sizeup = {
  //   len: (str) => {
  //     return unescape(encodeURIComponent(JSON.stringify(str))).length
  //   },
  // }
  const sizeup = function (str) {
    return unescape(encodeURIComponent(JSON.stringify(str))).length
  }

  inject('sizeup', sizeup)
}



