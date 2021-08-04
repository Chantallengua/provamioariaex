class Button {
  constructor(element) {
    element.addEventListener('blur', this.onBlur)
    element.addEventListener('focus', this.onFocus)
    element.addEventListener('click', this.onClick)
    if (!element.classList.contains('nokeyboard')) {
      element.addEventListener('keydown', this.onKeyDown)
    }
  }

  onBlur(event) {
    event.target.classList.remove('focus')
  }

  onFocus(event) {
    event.target.classList.add('focus')
  }

  onClick = event => {
    if (!this.hasModifiers(event)) {
      this.press()
    }
  }

  onKeyDown = event => {
    if (this.hasModifiers(event)) {
      return // nothing to do
    }
    switch (event.key) {
      case 'Spacebar':
      case 'Enter':
        this.press()
      default:
        return // nothing to do
    }
    event.stopPropagation()
    event.preventDefault()
  }

  press() {
    alert('Button pressed!')
  }

  hasModifiers(event) {
    return event.altKey
      || event.ctrlKey
      || event.metaKey
      || event.shiftKey
  }

}


// Native HTML button elements do not require any JavaScript code to be accessible ;)
const exampleElements = $('button, .button')
for (let exampleElement of exampleElements) {
  new Button(exampleElement)
}
