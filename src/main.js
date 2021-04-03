const { app, BrowserWindow, Menu } = require('electron')

var mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    minWidth: 550,
    height: 720,
    minHeight: 430,
    title: 'Node REST Client',
    fullscreenable: true,
    resizable: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true
    },
    autoHideMenuBar: true
  })

  mainWindow.loadFile('app/index.html')

  Menu.setApplicationMenu(require('./menu'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})