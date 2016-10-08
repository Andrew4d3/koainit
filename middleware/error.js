const boomHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error.isBoom) {
      ctx.body = error.output.payload
      ctx.status = error.output.statusCode
      return
    }

    throw error
  }
}

export default () => boomHandler;
