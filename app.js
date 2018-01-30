const Koa = require('koa')
const staticServe = require('koa-static')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const loadRoutes = require('./routes')
const errorMiddleware = require('./middleware/error')
const loggerMiddleware = require('./middleware/logger')
const { logger } = require('./utilities')

const app = new Koa()
const router = loadRoutes()
const _use = app.use


app.use = (x) => _use.call(app, convert(x))
app.use(staticServe('./public'))
app.use(bodyParser())
app.use(views(`${__dirname}/views`, {
  map: { ejs: 'ejs' }
} ))

app.use(loggerMiddleware())
app.use(errorMiddleware())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => logger.info('Server started at port 3000'))

module.exports = app
