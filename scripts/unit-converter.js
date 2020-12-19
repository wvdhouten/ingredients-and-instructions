// TODO: Consider conversion to base unit and let the UI convert to the closest unit.
class UnitConverter {
  constructor() {
    this.initConverions();
  }

  initConverions() {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((a) => {
      const hash = a.getAttribute('href');
      switch (hash) {
        case "#quantity":
        case "#temperature":
          this.createConversionElement(a, hash)
          break;
        case "#timer":
          this.createTimerElement(a);
          break;
      }
    });
  }

  createConversionElement(a) {
    const hash = a.getAttribute('href');
    const value = a.innerText;
    const matches = value.match(/([0-9]+)|([a-zA-Z]+)/gi);
    const amount = matches[0];
    const unit = matches[1];

    const element = document.createElement("span");
    element.classList.add('conversion');
    element.setAttribute('amount', amount);
    element.setAttribute('unit', unit);
    element.setAttribute('type', hash);
    element.innerText = a.innerText;
    a.parentNode.replaceChild(element, a);
  }

  createTimerElement(a) {
    const element = document.createElement("span");
    const value = a.innerText;
    element.classList.add("timer");
    element.textContent = a.innerText;
    element.addEventListener("click", () => timer.start(value));
    a.parentNode.replaceChild(element, a);
  }

  convertQuantity(input) {
    const matches = input.match(/([0-9]+)|([a-zA-Z]+)/gi);
    const amount = matches[0];
    const unit = matches[1];

    switch (unit) {
      /* Mass(m) */
      case "mg":
      case "g":
      case "kg":
      /* Mass(i) */
      case "oz":
      case "lb":
      /* Length(m) */
      case "mm":
      case "cm":
      case "m":
      /* Length(i) */
      case "in":
      case "ft":
      case "yd":
      /* Volume(m) */
      case "ml":
      case "cl":
      case "l":
      /* Volume(i) */
      case "fl-oz":
      case "pt":
      case "qt":
      case "gal":
        return this.__conversionResult(amount, unit, amount, unit);
    }
  }

  convertTemperature(input) {
    const matches = input.match(/([0-9]+)|([a-zA-Z]+)/gi);
    const amount = parseFloat(matches[0]);
    const unit = matches[1];

    switch (unit) {
      case "c":
        return this.__conversionResult(amount, "c", amount * 1.8 + 32, "f");
      case "f":
        return this.__conversionResult((amount - 32) / 1.8, "c", amount, "f");
    }

    return input;
  }
}

const unitConverter = new UnitConverter();
