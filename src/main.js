const { app, BrowserWindow, Menu, shell } = require('electron')

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

  //Prevent monaco from opening links in a new electron window (which can cause a big security issue due to the remote module being enabled), and instead make it open in the user's default browser
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})