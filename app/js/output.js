var output

require.config({
  paths: {
    vs: 'vendor/monaco-editor-0.23.0/min/vs'
  }
})

require(['vs/editor/editor.main'], () => {
  output = monaco.editor.create(document.getElementById('output'), {
    value: '',
    language: 'json',
    theme: 'atomOneDark',
    tabSize: 2,
    readOnly: true,
    automaticLayout: true,
    wordWrap: 'on',
    minimap: {
      enabled: true
    }
  })
})

function setOutput(value) {
  var language = false
  try {
    JSON.parse(value)
    language = 'json'
  } catch {
    language = false
  }

  if (language == 'json') {
    document.getElementById('beautify').classList = 'beautify show'
  } else {
    document.getElementById('beautify').classList = 'beautify'
  }

  output.setValue(value)
}

function beautifyOutput() {
  output.setValue(JSON.stringify(JSON.parse(output.getValue()), null, 2))
}