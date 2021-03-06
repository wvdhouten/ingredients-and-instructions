class TimerManager {
  static get __container() {
    return document.getElementById('timers');
  }

  static template;

  static init() {
    this.template = document.getElementById('timer');
    this.template.remove();
  }

  static start(duration) {
    const timerElement = this.__createTimerElement();

    duration = this.__parseDuration(duration);
    const start = Date.now();
    this.__timer = setInterval(() => {
      const delta = Date.now() - start;
      const secondsRemaining = duration - delta / 1000;
      const timeRemaining = new Date(secondsRemaining * 1000).toISOString().substr(11, 8);

      timerElement.querySelector('.time').innerText = timeRemaining;

      if (secondsRemaining <= 0) this.clear();
    }, 100);
  }

  static pause(id) {}

  static setStatus(timer, status) {
    const svg = timer.querySelector('.status use');
    const currentUrl = svg.getAttribute('href');
    svg.setAttribute('href', currentUrl.replace(/(.+)#(.+)/, `$1#${status}`));
  }

  static cancel(id) {}

  static parseTime(duration) {
    if (typeof duration === 'number') return duration;

    const match = duration.match(/((\d+)h)?((\d+)m)?((\d+)s?)?/);
    duration = 0;
    if (match[1]) duration += parseInt(match[2]) * 3600;
    if (match[3]) duration += parseInt(match[4]) * 60;
    if (match[5]) duration += parseInt(match[6]);
    return duration;
  }

  static restoreTimers() {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (!key.startsWith('timer')) {
        return;
      }

      const timerDetails = JSON.parse(localStorage.getItem(key));
    });
  }

  static __parseDuration(duration) {
    if (typeof duration === 'number') return duration;

    const match = duration.match(/((\d+)h)?((\d+)m)?((\d+)s?)?/);
    duration = 0;
    if (match[1]) duration += parseInt(match[2]) * 3600;
    if (match[3]) duration += parseInt(match[4]) * 60;
    if (match[5]) duration += parseInt(match[6]);
    return duration;
  }

  static __createTimerElement() {
    const fragment = this.template.content.cloneNode(true);
    const timerElement = fragment.querySelector('.timer');
    this.__container.appendChild(fragment);

    timerElement.querySelector('.status').attachEventListener('click', e => {});
    timerElement.querySelector('.cancel').attachEventListener('click', e => {});

    return timerElement;
  }
}
