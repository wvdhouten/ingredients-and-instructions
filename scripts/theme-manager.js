class ThemeManager {
  constructor() {
    this.restoreTheme();
    this.attachThemeSelectorListeners();
  }

  restoreTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) document.body.setAttribute("theme", currentTheme);
  }

  attachThemeSelectorListeners() {
    const themeSelectors = document.querySelectorAll("a[theme]");
    themeSelectors.forEach((a) => {
      a.addEventListener("click", this.onThemeSelectorClick);
    });
  }

  onThemeSelectorClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const theme = event.currentTarget.getAttribute("theme");
    this.setTheme(theme);
  }

  setTheme(theme) {
    document.body.setAttribute("theme", theme);
    localStorage.setItem("theme", theme);
  }
}
