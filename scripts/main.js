const anchors = document.querySelectorAll("a");
anchors.forEach((a) => {
  hash = a.href.split("#")[1];
  switch (hash) {
    case "quantity":
      let convertedValue = unitConverter.convertQuantity(a.innerText);
      let conversionElement = createConversionElement(
        a.innerText,
        convertedValue
      );
      a.classList.forEach((c) => conversionElement.classList.add(c));
      a.parentNode.replaceChild(conversionElement, a);
      break;
    case "temperature":
      convertedValue = unitConverter.convertTemperature(a.innerText);
      conversionElement = createConversionElement(a.innerText, convertedValue);
      a.parentNode.replaceChild(conversionElement, a);
      break;
    case "timer":
      const timerElement = createTimerElement(a.innerText);
      a.parentNode.replaceChild(timerElement, a);
      break;
  }
});

const currentTheme = localStorage.getItem("theme");
if (currentTheme) window.body.setAttribute("theme", currentTheme);

const themeSelectors = document.querySelectorAll("[theme]");
themeSelectors.forEach((a) => {
  a.addEventListener("click", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const theme = ev.currentTarget.getAttribute("theme");
    document.body.setAttribute("theme", theme);
    localStorage.setItem("theme", theme);
  });
});

function createConversionElement(value, convertedValue) {
  const element = document.createElement("span");
  element.classList.add("conversion");
  element.textContent = value;
  element.title = convertedValue;
  return element;
}

function createTimerElement(value) {
  const element = document.createElement("span");
  element.classList.add("timer");
  element.textContent = value;
  element.addEventListener("click", (x) => timer.start(value));
  return element;
}
