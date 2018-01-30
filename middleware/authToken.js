const jwt = require('koa-jwt')
// TODO secret object should come from a config var
module.exports = () => jwt({ secret: 'my-little-secret' })
