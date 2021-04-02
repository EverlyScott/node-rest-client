function makeRequest() {
  const endpoint = document.getElementById('endpoint').value
  const method = document.getElementById('method').value
  const body = editor.getValue()

  document.getElementById('endpoint').classList.remove('error')
  document.getElementById('method').classList.remove('error')
  document.getElementById('editor').classList.remove('error')

  var hasError = false

  if (endpoint == '') {
    document.getElementById('endpoint').classList.add('error')
    hasError = true
  }

  if (method == '') {
    document.getElementById('method').classList.add('error')
    hasError = true
  }

  try {
    JSON.parse(body)
  } catch {
    document.getElementById('editor').classList.add('error')
    hasError = true
  }

  if (!hasError) {
    //Make request
    fetch(endpoint, {
      method,
      headers: {
        'content-type': 'application/json'
      },
      redirect: 'follow',
      body: method == 'GET' || method == 'HEAD' ? undefined : body
    }).then(res => res.text()).then((value) => {
      setOutput(value)
    }).catch((err) => {
      console.error(err)
      document.getElementById('endpoint').classList.add('error')
      output.setValue(err.toString())
    })
    
    //Automatically switch to the correct layout
    switch (method) {
      case 'GET': {
        display.output(false)
        break
      }
      case 'HEAD': {
        display.output(false)
        break
      }
      default: {
        display.split(false)
        break
      }
    }
  }
}

document.getElementById('method').addEventListener('change', automaticLayoutChange)

function automaticLayoutChange() {
  const method = document.getElementById('method').value

  switch (method) {
    case '': {
      display.split(false)
      break
    }
    case 'GET': {
      display.output(false)
      break
    }
    case 'HEAD': {
      display.output(false)
      break
    }
    default: {
      display.body(false)
      break
    }
  }
}