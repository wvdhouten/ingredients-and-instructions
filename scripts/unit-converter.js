// TODO: Consider conversion to base unit and let the UI convert to the closest unit.
class UnitConverter {
  get system() {
    return localStorage.getItem("system");
  }
  set system(value) {
    localStorage.setItem("system", value);
    this.convertElements();
  }

  constructor() {
    this.initConverionElements();
    this.convertElements();
  }

  attachSystemSelectorListeners() {
    const themeSelectors = document.querySelectorAll("a[system]");
    themeSelectors.forEach((a) => {
      a.addEventListener("click", (event) => {
        this.onSystemSelectorClick(event);
      });
    });
  }

  onSystemSelectorClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.system = event.currentTarget.getAttribute("system");
  }

  initConverionElements() {
    const anchors = document.querySelectorAll("a[href^='#']");
    anchors.forEach((a) => {
      const hash = a.getAttribute("href").substring(1);
      switch (hash) {
        case "quantity":
        case "temperature":
          this.createConversionElement(a, hash);
          break;
        case "timer":
          this.createTimerElement(a);
          break;
      }
    });
  }

  convertElements() {
    document.getElementById("current-system").innerText = this.system ?? "metric";
    const elements = document.querySelectorAll(".conversion");
    elements.forEach((element) => {
      const type = element.getAttribute("type");
      switch (type) {
        case "temperature":
          this.convertTemperature(element);
          break;
      }
    });
  }

  createConversionElement(a, hash) {
    const value = a.innerText;
    const matches = value.match(/([0-9]+)|([a-zA-Z]+)/gi);
    const amount = matches[0];
    const unit = matches[1];

    const element = document.createElement("span");
    element.classList.add("conversion");
    element.setAttribute("amount", amount);
    element.setAttribute("unit", unit);
    element.setAttribute("type", hash);
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

  convertTemperature(element) {
    const amount = element.getAttribute("amount");
    const unit = element.getAttribute("unit");

    element.innerText = this.system === 'imperial'
      ? this.convertTemperatureToImperial(amount, unit)
      : this.convertTemperatureToMetric(amount, unit);
  }

  convertTemperatureToImperial(amount, unit) {
    switch (unit) {
      case "C":
        return `${amount * 1.8 + 32} °F`;
      case "F":
        return `${amount} °F`;
    }
  }

  convertTemperatureToMetric(amount, unit) {
    switch (unit) {
      case "C":
        return `${amount} °C`;
      case "F":
        return `${(amount - 32) / 1.8} °C`;
    }
  }
}

const unitConverter = new UnitConverter();
