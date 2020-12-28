class TemplateParser {
  static parse() {
    document.querySelectorAll('[seed]').forEach(element => {
      element.setAttribute('seed', Helpers.hash(element.getAttribute('seed')));
    });

    document.querySelectorAll('a[href^="#"]').forEach(element => {
      const type = element.getAttribute('href').substring(1);
      switch (type) {
        case 'measurement':
        case 'temperature':
          this.__parseConversionElement(element, type);
          break;
        case 'timer':
          this.__parseTimerElement(element);
          break;
      }
    });

    document.querySelectorAll('[duration]').forEach(element => {
      element.innerText = TimerManager.parseTime(element.innerText);
    });
  }

  static __parseConversionElement(element, type) {
    const value = element.innerText;
    const matches = value.match(/([0-9]+)|([a-zA-Z]+)/gi);
    const amount = matches[0];
    const unit = matches[1];

    const newElement = document.createElement('span');
    newElement.classList.add('conversion');
    newElement.setAttribute('amount', amount);
    newElement.setAttribute('unit', unit);
    newElement.setAttribute('type', type);
    newElement.innerText = newElement.innerText;
    element.parentNode.replaceChild(newElement, element);
  }

  static __parseTimerElement(element) {
    const newElement = document.createElement('span');
    const value = element.innerText;
    newElement.classList.add('timer');
    newElement.textContent = element.innerText;
    newElement.addEventListener('click', () => TimerManager.start(value));
    element.parentNode.replaceChild(newElement, element);
  }
}
