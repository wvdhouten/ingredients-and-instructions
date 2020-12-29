class SvgIcon extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'icon'];
  }

  src = '/assets/icons.svg';

  icon = '';

  constructor() {
    super();

    const use = document.createElement('use');
    const svg = document.createElement('svg');
    svg.appendChild(use);
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(svg);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.shadowRoot.querySelector('use').setAttribute('href', `${this.src}#${this.icon}`)
  }
}

customElements.define('svg-icon', SvgIcon);
