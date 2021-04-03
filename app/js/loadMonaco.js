function loadMonaco(callback) {
  const path = require('path')
  const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js')
  const amdRequire = amdLoader.require

  function uriFromPath(__path) {
    var pathName = path.resolve(__path).replace(/\\/g, '/')
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
      pathName = '/' + pathName
    }
    return encodeURI('file://' +  pathName)
  }

  amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
  })

  self.module = undefined

  amdRequire(['vs/editor/editor.main'], () => {
    callback(monaco)
  })
}