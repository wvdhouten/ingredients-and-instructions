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
    this.attachSystemSelectorListeners();
  }

  attachSystemSelectorListeners() {
    const themeSelectors = document.querySelectorAll("a[system]");
    themeSelectors.forEach((a) => {
      a.addEventListener("click", (event) => this.onSystemSelectorClick(event));
    });
  }

  onSystemSelectorClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.system = event.currentTarget.getAttribute("system");
  }

  initConverionElements() {
    document.querySelectorAll("a[href^='#']").forEach((a) => {
      const type = a.getAttribute("href").substring(1);
      switch (type) {
        case "measurement":
        case "temperature":
          this.createConversionElement(a, type);
          break;
        case "timer":
          this.createTimerElement(a);
          break;
      }
    });
  }

  createConversionElement(a, type) {
    const value = a.innerText;
    const matches = value.match(/([0-9]+)|([a-zA-Z]+)/gi);
    const amount = matches[0];
    const unit = matches[1];

    const element = document.createElement("span");
    element.classList.add("conversion");
    element.setAttribute("amount", amount);
    element.setAttribute("unit", unit);
    element.setAttribute("type", type);
    element.innerText = element.innerText;
    element.parentNode.replaceChild(element, element);
  }

  convertElements() {
    document.getElementById("current-system").innerText = this.system ?? "metric";
    const elements = document.querySelectorAll(".conversion");
    elements.forEach((element) => {
      switch (element.getAttribute("type")) {
        case "temperature":
          this.convertTemperature(element);
          break;
        case "measurement":
          element.innerText = this.convertMeasurement(element);
          break;
      }
    });
  }

  createTimerElement(a) {
    const element = document.createElement("span");
    const value = a.innerText;
    element.classList.add("timer");
    element.textContent = a.innerText;
    element.addEventListener("click", () => timer.start(value));
    element.parentNode.replaceChild(element, element);
  }

  convertMeasurement(element) {
    const unit = element.getAttribute("unit");
    let amount = element.getAttribute("amount");
    let type;

    switch (unit) {
      /* Misc */
      case "tsp":
        return amount === 1 ? `${amount} teaspoon` : `${amount} teaspoons`;
      case "tb":
        return amount === 1 ? `${amount} tablespoon` : `${amount} tablespoons`;
      /* Mass(m) */
      case "g":
        type = 'mass';
        break;
      case "kg":
        type = 'mass';
        amount *= 1000;
        break;
      /* Mass(i) */
      case "oz":
        type = 'mass';
        amount /= 0.035274;
        break;
      case "lb":
        type = 'mass';
        amount /= 0.035274 * 16;
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
        break;
    }

    if (type === 'mass') {
      return `${amount} gr`;
    }
  }

  convertTemperature(element) {
    const amount = element.getAttribute("amount");
    const unit = element.getAttribute("unit");

    element.innerText = this.system === "imperial"
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
