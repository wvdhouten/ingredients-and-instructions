const anchors = document.querySelectorAll('a');
anchors.forEach(a => {
    hash = a.href.split('#')[1];
    switch (hash){
        case 'quantity':
        case 'temperature':
            const convertedValue = convertUnit(a.innerText);
            const conversionElement = createConversionElement(a.innerText, convertedValue);
            a.parentNode.replaceChild(conversionElement, convertedValue);
            break;
    }
});

function createConversionElement(value, convertedValue) {
    const element = document.createElement('span');
    element.classList.add('conversion')
    element.textContent = value;
    element.title = convertedValue;
    return element;
}