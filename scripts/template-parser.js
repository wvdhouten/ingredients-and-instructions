class TemplateParser {
constructor(){
  this.parse();
}

  parse() {
    document.querySelectorAll("a[href^='#']").forEach((a) => {
      const type = a.getAttribute("href").substring(1);
      switch (type) {
        case "measurement":
        case "temperature":
          this.parseConversionElement(a, type);
          break;
        case "timer":
          this.parseTimerElement(a);
          break;
      }
    });
  }

  parseConversionElement(a, type) {
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
    a.parentNode.replaceChild(element, a);
  }

  parseTimerElement(a) {
    const element = document.createElement("span");
    const value = a.innerText;
    element.classList.add("timer");
    element.textContent = a.innerText;
    element.addEventListener("click", () => timer.start(value));
    a.parentNode.replaceChild(element, a);
  }
}

const templateParser = new TemplateParser();
