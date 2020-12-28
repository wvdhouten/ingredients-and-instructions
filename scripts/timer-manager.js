class TimerManager {
  __container;

  constructor() {
    this.createTimerContainer();
    this.restoreTimers();
  }

  createTimerContainer() {
    this.__container = document.createElement('div');
    this.__container.id = 'timers';
    document.body.appendChild(this.__container);
  }

  restoreTimers(){
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (!key.startsWith('timer')){
        return;
      }

      const timerDetails = JSON.parse(localStorage.getItem(key));
    });
  }

  start(duration) {
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    this.__container.appendChild(timerElement);

    duration = this.__parseDuration(duration);
    const start = Date.now();
    this.__timer = setInterval(() => {
      const delta = Date.now() - start;
      const secondsRemaining = duration - delta / 1000;
      const timeRemaining = new Date(secondsRemaining * 1000).toISOString().substr(11, 8);

      timerElement.innerText = timeRemaining;

      if (secondsRemaining <= 0) this.clear();
    }, 100);
  }

  __parseDuration(duration) {
    if (typeof duration === 'number') return duration;

    const match = duration.match(/((\d+)h)?((\d+)m)?((\d+)s?)?/);
    duration = 0;
    if (match[1]) duration += parseInt(match[2]) * 3600;
    if (match[3]) duration += parseInt(match[4]) * 60;
    if (match[5]) duration += parseInt(match[6]);
    return duration;
  }
}

const timerManager = new TimerManager();
