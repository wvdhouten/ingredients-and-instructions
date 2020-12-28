class UnitConverter {
  static get units() {
    return {
      tsp: { key: 'tsp', label: 'teaspoon', factor: 1 },
      tb: { key: 'tb', label: 'tablespoon', factor: 1 },
      /* Mass(m) */
      g: { key: 'g', label: 'gram', factor: 1, max: 1000, next: 'kg' },
      kg: { key: 'kg', label: 'kilogram', factor: 1000, min: 1, prev: 'g' },
      /* Mass(i) */
      oz: { key: 'oz', label: 'ounce', factor: 28.3495, max: 16, next: 'lb' },
      lb: { key: 'lb', label: 'pound', factor: 453.592, min: 1, prev: 'oz' },
      /* Length(m) */
      mm: { key: 'mm', label: 'milimeter', factor: 0.001 },
      cm: { key: 'cm', label: 'centimeter', factor: 0.01, min: 1, prev: 'mm' },
      m: { key: 'm', label: 'meter', factor: 1, min: 1, prev: 'cm' },
      /* Length(i) */
      in: { key: 'in', label: 'inch', factor: 39.3701, max: 12, next: 'ft' },
      ft: { key: 'ft', label: 'feet', factor: 3.28084, max: 3, next: 'yd' },
      yd: { key: 'yd', label: 'yard', factor: 1.09361 },
      /* Volume(m) */
      ml: { key: 'ml', label: 'mililiter', factor: 0.001 },
      cl: { key: 'cl', label: 'centiliter', factor: 0.01, min: 1, prev: 'ml' },
      l: { key: 'l', label: 'liter', factor: 1, min: 1, prev: 'cl' },
      /* Volume(i) */
      'fl-oz': { key: 'fl-oz', label: 'fluid ounce', factor: 33.814, max: 19.2152, next: 'pt' },
      pt: { key: 'pt', label: 'pint', factor: 1.75975, max: 6.66139, next: 'gal' },
      gal: { key: 'gal', label: 'gallon', factor: 0.264172 },
    };
  }

  get system() {
    return localStorage.getItem('system');
  }
  set system(value) {
    localStorage.setItem('system', value);
    this.convertElements();
  }

  constructor() {
    this.convertElements();
    this.attachSystemSelectorListeners();
  }

  attachSystemSelectorListeners() {
    const themeSelectors = document.querySelectorAll('a[system]');
    themeSelectors.forEach((a) => {
      a.addEventListener('click', (event) => this.onSystemSelectorClick(event));
    });
  }

  onSystemSelectorClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.system = event.currentTarget.getAttribute('system');
  }

  convertElements() {
    document.getElementById('current-system').innerText = this.system ?? 'metric';
    const elements = document.querySelectorAll('.conversion');
    elements.forEach((element) => {
      switch (element.getAttribute('type')) {
        case 'temperature':
          this.convertTemperature(element);
          break;
        case 'measurement':
          element.innerText = this.convertMeasurement(element);
          break;
      }
    });
  }

  convertMeasurement(element) {
    const unit = element.getAttribute('unit');
    let amount = parseFloat(element.getAttribute('amount'));

    switch (unit) {
      /* Misc */
      case 'tsp':
        return amount === 1 ? `${amount} teaspoon` : `${amount} teaspoons`;
      case 'tb':
        return amount === 1 ? `${amount} tablespoon` : `${amount} tablespoons`;
      /* Mass(m) */
      case 'g':
      case 'kg':
      /* Mass(i) */
      case 'oz':
      case 'lb':
        return this.convertMass(amount, unit);
      /* Length(m) */
      case 'mm':
      case 'cm':
      case 'm':
      /* Length(i) */
      case 'in':
      case 'ft':
      case 'yd':
        return this.convertLength(amount, unit);
      /* Volume(m) */
      case 'ml':
      case 'cl':
      case 'l':
      /* Volume(i) */
      case 'fl-oz':
      case 'pt':
      case 'gal':
        return this.convertVolume(amount, unit);
      default:
        return amount;
    }
  }

  convertMass(amount, unit) {
    const base = amount * UnitConverter.units[unit].factor;
    let result = base;
    let outputUnit = this.system === 'imperial' ? UnitConverter.units['oz'] : UnitConverter.units['g'];
    while (true) {
      result = base / outputUnit.factor;
      if (outputUnit.min && result < outputUnit.min) {
        outputUnit = UnitConverter.units[outputUnit.prev];
        continue;
      }
      if (outputUnit.max && result >= outputUnit.max) {
        outputUnit = UnitConverter.units[outputUnit.next];
        continue;
      }
      break;
    }
    return `${Math.round(result * 100) / 100} ${outputUnit.key}`;
  }

  convertLength(amount, unit) {
    const base = amount * UnitConverter.units[unit].factor;
    let result = base;
    let outputUnit = this.system === 'imperial' ? UnitConverter.units['in'] : UnitConverter.units['m'];
    while (true) {
      result = base / outputUnit.factor;
      if (outputUnit.min && result < outputUnit.min) {
        outputUnit = UnitConverter.units[outputUnit.prev];
        continue;
      }
      if (outputUnit.max && result >= outputUnit.max) {
        outputUnit = UnitConverter.units[outputUnit.next];
        continue;
      }
      break;
    }
    return `${Math.round(result * 100) / 100} ${outputUnit.key}`;
  }

  convertVolume(amount, unit) {
    const base = amount * UnitConverter.units[unit].factor;
    let result = base;
    let outputUnit = this.system === 'imperial' ? UnitConverter.units['gal'] : UnitConverter.units['l'];
    while (true) {
      result = base / outputUnit.factor;
      if (outputUnit.min && result < outputUnit.min) {
        outputUnit = UnitConverter.units[outputUnit.prev];
        continue;
      }
      if (outputUnit.max && result >= outputUnit.max) {
        outputUnit = UnitConverter.units[outputUnit.next];
        continue;
      }
      break;
    }
    return `${Math.round(result * 100) / 100} ${outputUnit.key}`;
  }

  convertTemperature(element) {
    const amount = element.getAttribute('amount');
    const unit = element.getAttribute('unit');

    element.innerText = this.system === 'imperial' ? this.convertTemperatureToImperial(amount, unit) : this.convertTemperatureToMetric(amount, unit);
  }

  convertTemperatureToImperial(amount, unit) {
    switch (unit) {
      case 'C':
        return `${amount * 1.8 + 32} °F`;
      case 'F':
        return `${amount} °F`;
    }
  }

  convertTemperatureToMetric(amount, unit) {
    switch (unit) {
      case 'C':
        return `${amount} °C`;
      case 'F':
        return `${(amount - 32) / 1.8} °C`;
    }
  }
}

const unitConverter = new UnitConverter();
