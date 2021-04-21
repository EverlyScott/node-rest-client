const { remote } = require('electron')
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
  const currentLang = monacoVar.getModel()._languageIdentifier.language

  var isValidJSON = true
  if (name === 'output') {
    try {
      JSON.parse(output.getValue())
    } catch {
      isValidJSON = false
    }
  }

  const outputLangTypes = {
    json: [
      { name: 'JSON', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    javascript: [
      { name: 'JavaScript', extensions: ['js', 'mjs'] },
      { name: 'TypeScript', extensions: ['ts'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    c: [
      { name: 'C', extensions: ['c'] },
      { name:' All Files', extensions: ['*'] }
    ],
    'c++': [
      { name: 'C++', extensions: ['cpp'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    'c#': [
      { name: 'C#', extensions: ['cs'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    python: [
      { name: 'Python', extensions: ['py'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    java: [
      { name: 'Java', extensions: ['java'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    html: [
      { name: 'HTML', extensions: ['html', 'htm', 'mhtml'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    css: [
      { name: 'CSS', extensions: ['css'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    less: [
      { name: 'LESS', extensions: ['less'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    scss: [
      { name: 'SCSS', extensions: ['scss'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    ruby: [
      { name: 'Ruby', extensions: ['rb'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    go: [
      { name: 'Go', extensions: ['go'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    php: [
      { name: 'PHP', extensions: ['php'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    xml: [
      { name: 'XML', extensions: ['xml'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    razor: [
      { name: 'Razor', extensions: ['cshtml'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    markdown: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    vb: [
      { name: 'Visual Basic', extensions: ['vb'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    coffeescript: [
      { name: 'CoffeeScript', extensions: ['coffee', 'litcoffee'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    handlebars: [
      { name: 'Handlebars', extensions: ['hbs', 'handlebars'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    batch: [
      { name: 'Batch', extensions: ['bat'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    pug: [
      { name: 'Pug', extensions: ['pug'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    'f#': [
      { name: 'F#', extensions: ['fs'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    lua: [
      { name: 'Lua', extensions: ['lua'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    powershell: [
      { name: 'Powershell', extensions: ['ps'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    sass: [
      { name: 'Sass', extensions: ['sass'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    r: [
      { name: 'R', extensions: ['r'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    plaintext: [
      { name: 'All Files', extensions: ['*'] },
      { name: 'Plain Text', extensions: ['txt'] },
      { name: 'C', extensions: ['c'] },
      { name: 'C++', extensions: ['cpp'] },
      { name: 'C#', extensions: ['cs'] },
      { name: 'F#', extensions: ['fs'] },
      { name: 'R', extensions: ['r'] },
      { name: 'Python', extensions: ['py'] },
      { name: 'Java', extensions: ['java'] },
      { name: 'Markdown', extensions: ['md'] },
      { name: 'XML', extensions: ['xml'] },
      { name: 'HTML', extensions: ['html', 'htm', 'mhtml'] },
      { name: 'Razor', extensions: ['cshtml'] },
      { name: 'CSS', extensions: ['css'] },
      { name: 'LESS', extensions: ['less'] },
      { name: 'SCSS', extensions: ['scss'] },
      { name: 'Sass', extensions: ['sass'] },
      { name: 'JSON', extensions: ['json'] },
      { name: 'JavaScript', extensions: ['js', 'mjs'] },
      { name: 'TypeScript', extensions: ['ts'] },
      { name: 'CoffeeScript', extensions: ['coffee', 'litcoffee'] },
      { name: 'Ruby', extensions: ['rb'] },
      { name: 'Go', extensions: ['go'] },
      { name: 'PHP', extensions: ['php'] },
      { name: 'Visual Basic', extensions: ['vb'] },
      { name: 'Handlebars', extensions: ['hbs', 'handlebars'] },
      { name: 'Batch', extensions: ['bat'] },
      { name: 'Powershell', extensions: ['ps'] },
      { name: 'Pug', extensions: ['pug'] },
      { name: 'Lua', extensions: ['lua'] }
    ]
  }

  const langToExt = {
    plaintext: 'txt',
    c: 'c',
    'c++': 'cpp',
    'c#': 'cs',
    'f#': 'fs',
    r: 'r',
    python: 'py',
    java: 'java',
    markdown: 'md',
    xml: 'xml',
    html: 'html',
    razor: 'cshtml',
    css: 'css',
    less: 'less',
    scss: 'scss',
    sass: 'sass',
    javascript: 'js',
    json: 'json',
    typescript: 'ts',
    ruby: 'rb',
    go: 'go',
    php: 'php',
    vb: 'vb',
    coffeescript: 'coffee',
    handlebars: 'hbs',
    batch: 'bat',
    powershell: 'ps',
    pug: 'pug',
    lua: 'lua'
  }

  var menu = [
    {
      label: 'Save to file',
      click: () => {
        const { dialog } = remote.require('electron')
        dialog.showSaveDialog({
          defaultPath: name === 'editor' ? 'body' : 'output',
          filters: name === 'editor' ? [
            { name: 'JSON', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
          ] : outputLangTypes[currentLang]
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

        const filename = `${tmp}/noderestclient-tmp-${name}-${randomStr(6)}.${name === 'editor' ? 'json' : langToExt[currentLang]}`
        fs.writeFileSync(filename, monacoVar.getValue())
        const openVSCode = remote.require('child_process').spawn('code', [filename], { shell: true })
        openVSCode.on('error', (err) => {
          //If vscode fails to open, try using it's URI instead (maybe the user doesn't have the cli installed)
          remote.require('electron').shell.openExternal(`vscode://file/${filename}`)
        })
      }
    }
  ]

  if (name === 'output') {
    menu.push(
      {
        label: 'Language',
        submenu: [
          {
            label: 'Plain Text',
            type: 'radio',
            checked: currentLang === 'plaintext',
            click: () => {
              changeLang('plaintext')
            }
          },
          {
            label: 'C',
            type: 'radio',
            checked: currentLang === 'c',
            click: () => {
              changeLang('c')
            }
          },
          {
            label: 'C++',
            type: 'radio',
            checked: currentLang === 'c++',
            click: () => {
              changeLang('c++')
            }
          },
          {
            label: 'C#',
            type: 'radio',
            checked: currentLang === 'c#',
            click: () => {
              changeLang('c#')
            }
          },
          {
            label: 'F#',
            type: 'radio',
            checked: currentLang === 'f#',
            click: () => {
              changeLang('f#')
            }
          },
          {
            label: 'R',
            type: 'radio',
            checked: currentLang === 'r',
            click: () => {
              changeLang('r')
            }
          },
          {
            label: 'Python',
            type: 'radio',
            checked: currentLang === 'python',
            click: () => {
              changeLang('python')
            }
          },
          {
            label: 'Java',
            type: 'radio',
            checked: currentLang === 'java',
            click: () => {
              changeLang('java')
            }
          },
          {
            label: 'Markdown',
            type: 'radio',
            checked: currentLang === 'md',
            click: () => {
              changeLang('md')
            }
          },
          {
            label: 'XML',
            type: 'radio',
            checked: currentLang === 'xml',
            click: () => {
              changeLang('xml')
            }
          },
          {
            label: 'HTML',
            type: 'radio',
            checked: currentLang === 'html',
            click: () => {
              changeLang('html')
            }
          },
          {
            label: 'Razor',
            type: 'radio',
            checked: currentLang === 'razor',
            click: () => {
              changeLang('razor')
            }
          },
          {
            label: 'CSS',
            type: 'radio',
            checked: currentLang === 'css',
            click: () => {
              changeLang('css')
            }
          },
          {
            label: 'LESS',
            type: 'radio',
            checked: currentLang === 'less',
            click: () => {
              changeLang('less')
            }
          },
          {
            label: 'SCSS',
            type: 'radio',
            checked: currentLang === 'scss',
            click: () => {
              changeLang('scss')
            }
          },
          {
            label: 'Sass',
            type: 'radio',
            checked: currentLang === 'sass',
            click: () => {
              changeLang('sass')
            }
          },
          {
            label: 'JSON',
            type: 'radio',
            checked: currentLang === 'json',
            click: () => [
              changeLang('json')
            ]
          },
          {
            label: 'JavaScript',
            type: 'radio',
            checked: currentLang === 'javascript',
            click: () => {
              changeLang('javascript')
            }
          },
          {
            label: 'TypeScript',
            type: 'radio',
            checked: currentLang === 'typescript',
            click: () => {
              changeLang('typescript')
            }
          },
          {
            label: 'CoffeeScript',
            type: 'radio',
            checked: currentLang === 'coffeescript',
            click: () => {
              changeLang('python')
            }
          },
          {
            label: 'Ruby',
            type: 'radio',
            checked: currentLang === 'ruby',
            click: () => {
              changeLang('ruby')
            }
          },
          {
            label: 'Go',
            type: 'radio',
            checked: currentLang === 'go',
            click: () => {
              changeLang('go')
            }
          },
          {
            label: 'PHP',
            type: 'radio',
            checked: currentLang === 'php',
            click: () => {
              changeLang('php')
            }
          },
          {
            label: 'Visual Basic',
            type: 'radio',
            checked: currentLang === 'vb',
            click: () => {
              changeLang('vb')
            }
          },
          {
            label: 'Handlebars',
            type: 'radio',
            checked: currentLang === 'handlebars',
            click: () => {
              changeLang('handlebars')
            }
          },
          {
            label: 'Batch',
            type: 'radio',
            checked: currentLang === 'batch',
            click: () => {
              changeLang('batch')
            }
          },
          {
            label: 'Powershell',
            type: 'radio',
            checked: currentLang === 'powershell',
            click: () => {
              changeLang('powershell')
            }
          },
          {
            label: 'Pug',
            type: 'radio',
            checked: currentLang === 'pug',
            click: () => {
              changeLang('pug')
            }
          },
          {
            label: 'Lua',
            type: 'radio',
            checked: currentLang === 'lua',
            click: () => {
              changeLang('lua')
            }
          },
        ]
      }
    )
  }
  
  function changeLang(lang) {
    setOutput(output.getValue(), lang)
  }
  
  return menu
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