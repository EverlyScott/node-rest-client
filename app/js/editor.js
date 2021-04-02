var editor

require.config({
  paths: {
    vs: 'vendor/monaco-editor-0.23.0/min/vs'
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
      enabled: false
    }
  })
})