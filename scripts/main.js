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

function resetTimer()
{
    if (timer)
        window.clearInterval(timer);

    document.querySelector('#timer')?.remove();
}

function parseDuration(value){
    const match = value.match(/((\d+)h)?((\d+)m)?((\d+)s?)?/);
    let duration = 0;
    if (match[1])
        duration += parseInt(match[2]) * 3600; 
    if (match[3])
        duration += parseInt(match[4]) * 60; 
    if (match[5])
        duration += parseInt(match[6]);
    return duration; 
}

function startTimer(value){
    resetTimer();

    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    document.body.appendChild(timerElement)

    const duration = parseDuration(value);
    const start = Date.now();
    timer = setInterval(() => {
        const delta = Date.now() - start;
        const secondsRemaining = duration - delta / 1000;
        const timeRemaining = new Date(secondsRemaining * 1000).toISOString().substr(11, 8)

        timerElement.innerText = timeRemaining;

        if (secondsRemaining <= 0)
            resetTimer();
    }, 100);
}