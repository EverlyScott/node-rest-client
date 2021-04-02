var editor

require.config({
  paths: {
    vs: '../node_modules/monaco-editor/min/vs'
  }
})

require(['vs/editor/editor.main'], () => {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: '{\n  \n}',
    language: 'json',
    theme: 'atomOneDark',
    tabSize: 2,
    automaticLayout: true,
    wordWrap: 'on',
    minimap: {
      enabled: true
    }
  })
})