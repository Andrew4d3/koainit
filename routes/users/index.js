const { logger } = require('../../utilities')

const prefix = '/users'
const routes = [
  {
    path: '/route1',
    method: 'get',
    controller: (ctx) => {
      ctx.body = 'Hello from some route 1 in users'
    }
  },
  {
    path: '/route2',
    method: 'get',
    controller: [
      (ctx, next) => {
        logger.info('Running middleware in users')
        next()
      },
      (ctx) => {
        ctx.body = 'Hello from some route 2 in users'
      }
    ]
  }
]

module.exports = () => ({ routes, prefix })
