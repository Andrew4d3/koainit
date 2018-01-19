const koa_router = require('koa-router')
const glob = require('glob')
const router = koa_router()

const mainPrefix = "" // Empty string for '/'. Suggestion: Load this from config file

function getRouteImports(){
  return new Promise((resolve,reject) => {
    glob(__dirname + '/*/index.js', {}, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

function validateRoute(route){
  let routeValid = true
  if(!route.path){
    console.log("Warning: Route without 'path' attribute. Skipping")
    routeValid = false
  }
  if(!route.method){
    console.log("Warning: Route without 'method' attribute. Skipping")
    routeValid = false
  }
  if(!route.controller){
    console.log("Warning: Route without 'controller' attribute. Skipping")
    routeValid = false
  }
  return routeValid
}

module.exports = function loader(){
  console.log("Loading routes...")
  const files = glob.sync(__dirname + '/*/index.js', {})
  if(!files.length){
    console.log("There are not routes loaded. Please add your routes files in /routes folder")
    return router
  }

  files.forEach((f) => {
    const moduleFile = require(f)()
    if(moduleFile.routes){
      moduleFile.routes.forEach((route) => {
        if(validateRoute(route)){
          const prefix = moduleFile.prefix && moduleFile.prefix !== "/" ? moduleFile.prefix : ""
          const finalPath = mainPrefix + prefix + route.path
          const middleware = !Array.isArray(route.controller) ? [route.controller] : route.controller
          router[route.method.toLowerCase()](finalPath, ...middleware)
        }
      })
    }
  })
  console.log("Routes successfully loaded.")

  return router
}
