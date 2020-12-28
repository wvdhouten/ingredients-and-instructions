class ThemeManager {
  static get theme() {
    return localStorage.getItem('theme');
  }
  static set theme(value) {
    localStorage.setItem('theme', value);
    this.applyTheme();
  }

  static init() {
    this.__attachListeners();
    this.applyTheme();
  }

  static applyTheme(theme) {
    document.getElementById('current-theme').innerText = theme ?? this.theme ?? 'default';
    document.body.setAttribute('theme', this.theme);
  }

  static __attachListeners() {
    const themeSelectors = document.querySelectorAll('a[theme]');
    themeSelectors.forEach((a) => {
      a.addEventListener('click', (event) => {
        this.__onThemeSelectorClick(event);
      });
    });
  }

  static __onThemeSelectorClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.theme = event.currentTarget.getAttribute('theme');
  }
}
