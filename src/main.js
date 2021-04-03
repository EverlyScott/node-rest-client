const { app, BrowserWindow } = require('electron')

var mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 550,
    height: 720,
    minHeight: 430,
    title: 'Node REST Client',
    fullscreenable: true,
    resizable: true
  })

  mainWindow.loadFile('app/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})