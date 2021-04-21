const detectLang = remote.require('lang-detector')
const beautify = remote.require('js-beautify')
var output

loadMonaco((monaco) => {
  output = monaco.editor.create(document.getElementById('output'), {
    value: '',
    language: 'plaintext',
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

function setOutput(value, language = false) {
  if (!language) {    
    try {
      JSON.parse(value)
      language = 'json'
    } catch {
      language = detectLang(value).toLowerCase()
    }
  }

  console.log(language)
  
  if (language === 'json' || language === 'xml' || language === 'html' || language === 'css' || language === 'javascript') {
    document.getElementById('beautify').classList = 'option show'
  } else if (language == 'Unknown') {
    document.getElementById('beautify').classList = 'option'
    language = 'plaintext'
  } else {
    document.getElementById('beautify').classList = 'option'
  }

  const model = monaco.editor.createModel(value, language)

  output.setModel(model)
}

function beautifyOutput() {
  const beautifylangs = {
    xml: beautify.html,
    html: beautify.html,
    css: beautify.css,
    javascript: beautify.js
  }

  const lang = output.getModel()._languageIdentifier.language
  if (lang === 'json') {
    output.setValue(JSON.stringify(JSON.parse(output.getValue()), null, 2))
  } else if (lang === 'xml' || lang === 'html' || lang === 'css' || lang === 'javascript') {
    output.setValue(beautifylangs[lang](output.getValue(), { 'indent_size': 2 }))
  } else {
    alert('Cannot beautify this file!')
  }
}