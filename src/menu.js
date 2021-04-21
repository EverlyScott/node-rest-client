const { Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  ...(isMac ? [{ role: 'appMenu' }] : []),
  ...(!isMac ? [{ role: 'fileMenu' }] : []),
  { role: 'editMenu' },
  {
    label: 'View',
    submenu: [
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  { role: 'windowMenu' }
]

module.exports = Menu.buildFromTemplate(template)