// TODO: Add pause/resume functionality.
class Timer {
    __timer;
    
    clear() {
        if (this.__timer)
            window.clearInterval(this.__timer);

        document.querySelector('#timer')?.remove();
    }

    start(duration) {
        this.clear();

        const timerElement = document.createElement('div');
        timerElement.id = 'timer';
        document.body.appendChild(timerElement)
    
        duration = this.__parseDuration(duration);
        const start = Date.now();
        timer = setInterval(() => {
            const delta = Date.now() - start;
            const secondsRemaining = duration - delta / 1000;
            const timeRemaining = new Date(secondsRemaining * 1000).toISOString().substr(11, 8)
    
            timerElement.innerText = timeRemaining;
    
            if (secondsRemaining <= 0)
                this.clear();
        }, 100);
    }

    stop() {
        this.clear();
    }

    __parseDuration(value){
        if (typeof(duration) === 'number')
            return duration;

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
}

const timer = new Timer();