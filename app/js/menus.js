const { remote, shell } = require('electron')
const { Menu } = remote.require('electron')

function editorMenu() {
  const template = genMenuTemplate('editor', editor)

  const menu = Menu.buildFromTemplate(template)
  menu.popup()
}

function outputMenu() {
  const template = genMenuTemplate('output', output)

  const menu = Menu.buildFromTemplate(template)
  menu.popup()
}

function genMenuTemplate(name, monacoVar) {
  var isValidJSON = true
  if (name === 'output') {
    try {
      JSON.parse(output.getValue())
    } catch {
      isValidJSON = false
    }
  }

  return [
    {
      label: 'Save to file',
      click: () => {
        const { dialog } = remote.require('electron')
        dialog.showSaveDialog({
          defaultPath: name === 'editor' ? 'body' : 'output',
          filters: name === 'editor' ? [
            { name: 'JSON', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
          ] : [
            { name: isValidJSON ? 'JSON' : 'All Files', extensions: isValidJSON ? ['json'] : ['*'] },
            { name: isValidJSON ? 'All Files' : undefined, extensions: isValidJSON ? ['*'] : undefined }
          ]
        }).then(({ canceled, filePath }) => {
          if (!canceled) {
            const fs = remote.require('fs')
            fs.writeFileSync(filePath, name === 'editor' ? editor.getValue() : output.getValue())
          }
        })
      }
    },
    {
      label: 'Open in Visual Studio Code',
      click: () => {
        const fs = remote.require('fs')
        const tmp = remote.require('os').tmpdir()

        const filename = `${tmp}/${name}-${randomStr(6)}.json`
        fs.writeFileSync(filename, monacoVar.getValue())
        remote.require('electron').shell.openExternal(`vscode://file/${filename}`)
      }
    }
  ]
}

function randomStr(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}