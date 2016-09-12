const prefix = '/'
const routes = [
  {
    path: '/api',
    method: 'get',
    controller: (ctx) => {
      ctx.body = "Hello from GET /api"
    }
  },
  {
    path: '/api/:id',
    method: 'get',
    controller: (ctx) => {
      const { id } = ctx.params
      ctx.body = "Hello from GET /api with :id " + id
    }
  },
  {
    path: '/api',
    method: 'post',
    controller: (ctx) => {
      ctx.body = "Hello from POST /api"
    }
  },
  {
    path: '/api/:id',
    method: 'put',
    controller: (ctx) => {
      const { id } = ctx.params
      ctx.body = "Hello from PUT /api with :id " + id
    }
  },
  {
    path: '/api/:id',
    method: 'del',
    controller: (ctx) => {
      const { id } = ctx.params
      ctx.body = "Hello from DELETE /api with :id " + id
    }
  },
  {
    path: '/echo/request',
    method: 'post',
    controller: (ctx) => {
      ctx.body = { echo: ctx.request.body }
    }
  },
  {
    path: '/view/welcome',
    method: 'get',
    controller: async (ctx) => {
      await ctx.render('welcome.ejs', { name: 'Koa2' })
    }
  }
]

module.exports = () => ({ routes, prefix })
