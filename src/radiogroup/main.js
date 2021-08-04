class Radiogroup {
  constructor(element) {
    this.currentRadio = null
    this.radios = []
    element.querySelectorAll('.radio')
      .forEach((radioElement, index) => {
        const radio = new Radio(radioElement, index, this)
        this.radios.push(radio)
      })
  }

  selectNextRadio(index) {
    const nextIndex = (index + 1) % this.radios.length
    console.log('vado su ' + nextIndex + ' da ' + index)
    this.selectRadio(nextIndex)
  }

  selectPreviousRadio(index) {
    const prevIndex = (this.radios.length + index - 1) % this.radios.length
    this.selectRadio(prevIndex)
  }

  selectRadio(index) {
    if (this.currentRadio !== null) {
      this.currentRadio.deselect()
    }
    this.currentRadio = this.radios[index]
    this.currentRadio.select()
  }

}


class Radio {
  constructor(element, index, radiogroup) {
    element.addEventListener('blur', this.onBlur)
    element.addEventListener('focus', this.onFocus)
    element.addEventListener('click', this.onClick)
    if (!element.classList.contains('nokeyboard')) {
      element.addEventListener('keydown', this.onKeyDown)
    }
    this.element = element
    this.index = index
    this.radiogroup = radiogroup
  }

  onBlur(event) {
    event.target.classList.remove('focus')
  }

  onFocus(event) {
    event.target.classList.add('focus')
  }

  onClick = event => {
    if (!this.hasModifiers(event)) {
      this.radiogroup.selectRadio(this.index)
    }
  }

  onKeyDown = event => {
    if (this.hasModifiers(event)) {
      return // nothing to do
    }
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        this.radiogroup.selectNextRadio(this.index)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        this.radiogroup.selectPreviousRadio(this.index)
        break
      default:
        return // nothing to do
    }
    event.stopPropagation()
    event.preventDefault()
  }

  deselect() {
    this.element.classList.remove('checked', 'focus')
    // aria-selected is used just to make the "messy" radiogroup example work, it **should not** be considered at all in a correct implementation
    if (this.element.hasAttribute('aria-checked')) {
      this.element.setAttribute('aria-checked', 'false')
    }
    else if (this.element.hasAttribute('aria-selected')) {
      this.element.setAttribute('aria-selected', 'false')
    }
    this.element.tabIndex = -1
  }

  select() {
    this.element.classList.add('checked', 'focus')
    // aria-selected is used just to make the "messy" radiogroup example work, it **should not** be considered at all in a correct implementation
    if (this.element.hasAttribute('aria-checked')) {
      this.element.setAttribute('aria-checked', 'true')
    }
    else if (this.element.hasAttribute('aria-selected')) {
      this.element.setAttribute('aria-selected', 'true')
    }
    this.element.tabIndex = 0
    this.element.focus()
  }

  hasModifiers(event) {
    return event.altKey
      || event.ctrlKey
      || event.metaKey
      || event.shiftKey
  }

}


// Radiogroup implementations leveraging native HTML elements do not require custom JavaScript to work ;)
const exampleElements = document.getElementsByClassName('radiogroup')
for (let exampleElement of exampleElements) {
  new Radiogroup(exampleElement)
}
