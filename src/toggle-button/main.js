class ToggleButton {
  constructor(element) {
    element.addEventListener('blur', this.onBlur)
    element.addEventListener('focus', this.onFocus)
    element.addEventListener('click', this.onClick)
    if (!element.classList.contains('nokeyboard')) {
      element.addEventListener('keydown', this.onKeyDown)
    }
    this.element = element
    this.enabled = false
  }

  onBlur(event) {
    event.target.classList.remove('focus')
  }

  onFocus(event) {
    event.target.classList.add('focus')
  }

  onClick = event => {
    if (!this.hasModifiers(event)) {
      this.toggle()
    }
  }

  onKeyDown = event => {
    if (this.hasModifiers(event)) {
      return // nothing to do
    }
    switch (event.key) {
      case 'Spacebar':
      case 'Enter':
        this.toggle()
      default:
        return // nothing to do
    }
    event.stopPropagation()
    event.preventDefault()
  }

  toggle() {
    if (this.enabled) {
      this.disable()
    }
    else {
      this.enable()
    }
    this.element.classList.add('focus')
    this.element.focus()
  }

  disable() {
    this.element.classList.remove('pressed')
    this.enabled = false
    // do not report state updates to assistive technologies
    // never do that, we use this trick to make the static toggle-button example work
    if (this.element.classList.contains('static')) return
    if (this.element.hasAttribute('aria-pressed')) {
      this.element.setAttribute('aria-pressed', 'false')
    }
    // aria-checked is used just to make the "messy" toggle-button example work, it **should not** be considered at all in a correct implementation
    else if (this.element.hasAttribute('aria-checked')) {
      this.element.setAttribute('aria-checked', 'false')
    }
    // you should never update the text of a toggle button when updating its state
    // we do it to let the confusing toggle button example work
    if (this.element.classList.contains('js-text')) {
      this.element.innerText = 'mute audio'
    }
  }

  enable() {
    this.element.classList.add('pressed')
    this.enabled = true
    // do not report state updates to assistive technologies
    // never do that, we use this trick to make the static toggle-button example work
    if (this.element.classList.contains('static')) return
    if (this.element.hasAttribute('aria-pressed')) {
      this.element.setAttribute('aria-pressed', 'true')
    }
    // aria-checked is used just to make the "messy" toggle-button example work, it **should not** be considered at all in a correct implementation
    else if (this.element.hasAttribute('aria-checked')) {
      this.element.setAttribute('aria-checked', 'true')
    }
    // you should never update the text of a toggle button when updating its state
    // we do it to let the confusing toggle button example work
    if (this.element.classList.contains('js-text')) {
      this.element.innerText = 'Unmute audio'
    }
  }

  hasModifiers(event) {
    return event.altKey
      || event.ctrlKey
      || event.metaKey
      || event.shiftKey
  }

}

// toggle-buttons implemented with native HTML elements do not require custom JavaScript to work ;)
const elements = document.querySelectorAll('button, .toggleButton')
for (let element of elements) {
  new ToggleButton(element)
}
