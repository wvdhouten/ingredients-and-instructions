const anchors = document.querySelectorAll('a');
anchors.forEach(a => {
    hash = a.href.split('#')[1];
    switch (hash){
        case 'quantity':
        case 'temperature':
            const convertedValue = unitConverter.convert(a.innerText);
            const conversionElement = createConversionElement(a.innerText, convertedValue);
            a.parentNode.replaceChild(conversionElement, a);
            break;
        case 'timer':
            const timerElement = createTimerElement(a.innerText);
            a.parentNode.replaceChild(timerElement, a);
    }
});

function createConversionElement(value, convertedValue) {
    const element = document.createElement('span');
    element.classList.add('conversion')
    element.textContent = value;
    element.title = convertedValue;
    return element;
}

function createTimerElement(value) {
    const element = document.createElement('span');
    element.classList.add('timer')
    element.textContent = value;
    element.addEventListener('click', x => timer.start(value));
    return element;
}