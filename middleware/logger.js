const { logger } = require('../utilities')
const config = require('config')

module.exports = () => async (ctx, next) => {
  const { method, url, body } = ctx.request
  const loggingBody = config.get('logger.logBody')

  logger.info(method, url, loggingBody ? `\n${JSON.stringify(body, null, 3)}` : null)
  await next()
}
