export default (callback) => {
  let array = []
  const handler = {
    get: (target, prop) => {
      if (prop === 'push') {
        return (item) => {
          array[array.length] = item
          callback(array, item)
        }
      }
      if (prop === 'pop') {
        return (item) => {
          const index = array.indexOf(item)
          array = [
            ...array.slice(0, index),
            ...array.slice(index + 1)
          ]
          callback(array, item)
        }
      }
    }
  }
  return new Proxy(array, handler)
}
