var displayChangedManually = false

const display = {
  split(manual = true) {
    if (!manual && displayChangedManually) return
    document.getElementById('editor').classList = 'split'
    document.getElementById('output').classList = 'split'
    if (manual) displayChangedManually = true
  },
  body(manual = true) {
    if (!manual && displayChangedManually) return
    document.getElementById('editor').classList = ''
    document.getElementById('output').classList = 'no-display'
    if (manual) displayChangedManually = true
  },
  output(manual = true) {
    if (!manual && displayChangedManually) return
    document.getElementById('editor').classList = 'no-display'
    document.getElementById('output').classList = ''
    if (manual) displayChangedManually = true
  }
}