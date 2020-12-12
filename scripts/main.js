const anchors = document.querySelectorAll('a');
anchors.forEach(a => {
    hash = a.href.split('#')[1];
    switch (hash){
        case 'quantity':
        case 'temperature':
            const convertedValue = convertUnit(a.innerText);
            const conversionElement = createConversionElement(a.innerText, convertedValue);
            a.parentNode.replaceChild(conversionElement, a);
            break;
        case 'timer':
            const value = a.innerHTML;
            const conversionElement = createTimerElement(a.innerText);
            a.parentNode.replaceChild(conversionElement, a);
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
    element.addEventListener('click', x => startTimer(value));
    return element;
}

let timer;

function startTimer(value){
    if (timer){
        window.clearInterval(timer);
    }

    const timerRegex = /(\d+h)?(\d+m)?(\d+s)?/;
    const match = value.match(timerRegex);

    console.log(match);

    var start = Date.now();
    timer = setInterval(function() {
        var delta = Date.now() - start;
        output(Math.floor(delta / 1000));
    }, 1000);
}