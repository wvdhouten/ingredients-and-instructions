const anchors = document.querySelectorAll('a');
anchors.forEach(a => {
    hash = a.href.split('#')[1];
    switch (hash){
        case 'temperature':
            const convertedValue = convertUnit(a.innerText);
            console.log(convertedValue);
            break;
    }
});