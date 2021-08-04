class Switch {
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
    this.element.classList.remove('checked')
    this.enabled = false
    // aria-selected is used just to make the "messy" switch example work, it **should not** be considered at all in a correct implementation
    if (this.element.hasAttribute('aria-checked')) {
      this.element.setAttribute('aria-checked', 'false')
    }
    else if (this.element.hasAttribute('aria-selected')) {
      this.element.setAttribute('aria-selected', 'false')
    }
  }

  enable() {
    this.element.classList.add('checked')
    this.enabled = true
    // aria-selected is used just to make the "messy" switch example work, it **should not** be considered at all in a correct implementation
    if (this.element.hasAttribute('aria-checked')) {
      this.element.setAttribute('aria-checked', 'true')
    }
    else if (this.element.hasAttribute('aria-selected')) {
      this.element.setAttribute('aria-selected', 'true')
    }
  }

  hasModifiers(event) {
    return event.altKey
      || event.ctrlKey
      || event.metaKey
      || event.shiftKey
  }

}

// Switch implemented with native HTML elements do not require custom JavaScript to work ;)
const elements = document.getElementsByClassName('switch')
for (let element of elements) {
  new Switch(element)
}
