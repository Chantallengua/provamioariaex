export default class Textbox {
  constructor(element) {
    element.addEventListener('blur', this.onBlur)
    element.addEventListener('focus', this.onFocus)
    if (!element.dataset.noKeyboard) {
      element.addEventListener('keydown', this.onKeyDown)
    }
    this.element = element
  }

  onBlur(event) {
    event.target.classList.remove('focus')
  }

  onFocus(event) {
    event.target.classList.add('focus')
  }

  onKeyDown = event => {
    if (this.hasModifiers(event)) {
      return // nothing to do
    }
    switch (event.key) {
      case 'Enter':
        this.send(event)
      default:
        return // nothing to do
    }
    event.stopPropagation()
    event.preventDefault()
  }

  send(event) {
    const message = event.target.innerText
    alert(`Message: ${message}`)
    event.target.innerText = ''
  }

  hasModifiers(event) {
    return event.altKey
      || event.ctrlKey
      || event.metaKey
      || event.shiftKey
  }

}
