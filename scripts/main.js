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
    element.addEventListener('click', x => startTimer(value));
    return element;
}

let timer;

function startTimer(value){
    if (timer){
        window.clearInterval(timer);
    }

    const timerRegex = /((\d+)h)?((\d+)m)?((\d+)s?)?/;
    const match = value.match(timerRegex);

    let duration = 0;
    if (match[1])
        duration += parseInt(match[2]) * 3600; 
    if (match[3])
        duration += parseInt(match[4]) * 60; 
    if (match[5])
        duration += parseInt(match[6]); 

    console.log(match);
    console.log(duration);

    const start = Date.now();
    timer = setInterval(function() {
        const delta = Date.now() - start;
        const timeRemaining = duration - delta / 1000;
        console.log(timeRemaining);
        if (timeRemaining <= 0){
            clearInterval(timer);
            alert('done');
        }
    }, 1000);
}