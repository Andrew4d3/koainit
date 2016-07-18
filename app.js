import Koa from 'koa'
import koa_router from 'koa-router'
const app = new Koa()
const router = koa_router()

// response
app.use(async (ctx, next) => {
  next()
})

router.get('/', (ctx) => {
  ctx.body = "Hello from GET /"
})
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
  ctx.body = "Hello from PUT /api with :id " + id
})
.del('/api/:id', (ctx) => {
  ctx.body = "Hello from DEL /api with :id " + id
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => console.log('server started 3000'))

export default app
