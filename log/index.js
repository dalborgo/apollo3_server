const log = require('loglevel')
const isObj = obj => typeof obj === 'object'
const isError = obj => obj instanceof Error

const originalFactory = log.methodFactory

function getColor (methodName) {
  switch (methodName) {
    case 'debug':
      return 'lightgreen'
    case 'info':
      return 'cyan'
    default:
      return ''
  }
}

log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName)
  return function () {
    const messages = []
    for (let index = 0; index < arguments.length; index++) {
      const isEr = isError(arguments[index])
      const isOb = isObj(arguments[index])
      const message = isOb && !isEr ? JSON.stringify(arguments[index], null, 2) : arguments[index]
      const color = getColor(methodName)
      if (color && !index) {
        messages.push(`%c${message}`, `color: ${color}`)
      } else {
        messages.push(message)
      }
    }
    return rawMethod.apply(undefined, messages)
  }
}

module.exports = { log }
