const jwt = require('koa-jwt')
const config = require('config')

module.exports = () => jwt(config.get('jwt'))
