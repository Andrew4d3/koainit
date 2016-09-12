import Koa from 'koa'
import staticServe from 'koa-static'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import loadRoutes from './routes'
const app = new Koa()
const router = loadRoutes()
const _use = app.use
app.use = x => _use.call(app, convert(x))

app.use(staticServe('./public'))
app.use(bodyParser())
app.use(views(`${__dirname}/views`, {
  map: { ejs: 'ejs' }
} ))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => console.log('server started 3000'))

export default app
