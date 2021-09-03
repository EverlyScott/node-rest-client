const prompt = remote.require('electron-prompt')

const promptStyle = 'app/css/prompt.css'

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
    const loadModel = monaco.editor.createModel('', 'plaintext')
    output.setModel(loadModel)
    document.getElementById('loadbar').classList.add('animated')
    //Make request
    fetch(endpoint, {
      method,
      headers: {
        'content-type': 'application/json'
      },
      redirect: 'follow',
      body: method == 'GET' || method == 'HEAD' ? undefined : body
    }).then(res => checkStatus(res, endpoint, method, body)).then((value) => {
      document.getElementById('loadbar').classList.remove('animated')
      setOutput(value)
    }).catch((err) => {
      document.getElementById('loadbar').classList.remove('animated')
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

async function checkStatus(res, endpoint, method, body) {
  if (res.status === 401) {
    const username = await prompt({
      title: 'This endopoint requires HTTP authentication!',
      label: 'Please enter your username:',
      type: 'input',
      inputAttrs: {
        type: 'text'
      },
      customStylesheet: promptStyle
    })

    const password = await prompt({
      title: 'This endpoint requires HTTP authentication!',
      label: 'Please enter your password:',
      type: 'input',
      inputAttrs: {
        type: 'password'
      },
      customStylesheet: promptStyle
    })

    const newres = await fetch(endpoint, {
      method,
      headers: {
        'content-type': 'application/json',
        authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
      },
      body: method == 'GET' || method == 'HEAD' ? undefined : body
    })
    return await newres.text()
  }
  return await res.text()
}