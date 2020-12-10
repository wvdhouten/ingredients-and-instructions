const anchors = document.querySelectorAll('a');
anchors.forEach(a => {
    if (a.href.startsWith('#')) {
        console.log(a);
    }
});