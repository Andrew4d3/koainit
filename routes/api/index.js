const Boom = require('boom')
const authToken = require('../../middleware/authToken')

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
  },
  {
    path: '/throw/error',
    method: 'get',
    controller: async (ctx) => {
      throw Boom.unauthorized('You are not supposed to be here!');
    }
  },
  {
    path: '/throw/error2',
    method: 'get',
    controller: async (ctx) => {
      // Default Koa2 error throwing
      ctx.throw(401, "Hey")
    }
  },
  {
    path: '/jwt/endpoint',
    method: 'post',
    controller: [
      authToken(),
      (ctx) => {
        ctx.body = 'This is an authorized response'
      }
    ]
  }
]

module.exports = () => ({ routes, prefix })
