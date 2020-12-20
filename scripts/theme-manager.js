class ThemeManager {
  get theme() {
    return localStorage.getItem("theme");
  }
  set theme(value) {
    localStorage.setItem("theme", value);
    this.restoreTheme();
  }

  constructor() {
    this.restoreTheme();
    this.attachThemeSelectorListeners();
  }

  restoreTheme() {
    document.getElementById("current-theme").innerText = this.theme ?? "default";
    document.body.setAttribute("theme", this.theme);
  }

  attachThemeSelectorListeners() {
    const themeSelectors = document.querySelectorAll("a[theme]");
    themeSelectors.forEach((a) => {
      a.addEventListener("click", (event) => {
        this.onThemeSelectorClick(event);
      });
    });
  }

  onThemeSelectorClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.theme = event.currentTarget.getAttribute("theme");
  }
}

const themeManager = new ThemeManager();
