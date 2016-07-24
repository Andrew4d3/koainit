import Koa from 'koa'
import koa_router from 'koa-router'
import staticServe from 'koa-static'
import convert from 'koa-convert'
const app = new Koa()
const router = koa_router()

const _use = app.use
app.use = x => _use.call(app, convert(x))

// response
app.use(staticServe('./public'))

router
.get('/api', (ctx) => {
  ctx.body = "Hello from GET /api"
})
.get('/api/:id', (ctx) => {
  const { id } = ctx.params
  ctx.body = "Hello from GET /api with :id " + id
})
.post('/api', (ctx) => {
  ctx.body = "Hello from POST /api"
})
.put('/api/:id', (ctx) => {
  const { id } = ctx.params
  ctx.body = "Hello from PUT /api with :id " + id
})
.del('/api/:id', (ctx) => {
  const { id } = ctx.params
  ctx.body = "Hello from DELETE /api with :id " + id
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => console.log('server started 3000'))

export default app
