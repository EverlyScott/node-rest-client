var editor

loadMonaco((monaco) => {
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