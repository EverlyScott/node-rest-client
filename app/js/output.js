var output

loadMonaco((monaco) => {
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
    document.getElementById('beautify').classList = 'option show'
  } else {
    document.getElementById('beautify').classList = 'option'
  }

  output.setValue(value)
}

function beautifyOutput() {
  output.setValue(JSON.stringify(JSON.parse(output.getValue()), null, 2))
}