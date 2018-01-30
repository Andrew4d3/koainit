const { logger } = require('../utilities')

module.exports = () => async (ctx, next) => {
  const { method, url, body } = ctx.request
  const loggingBody = true // TODO config var here

  logger.info(method, url, loggingBody ? `\n${JSON.stringify(body, null, 3)}` : null)
  await next()
}
