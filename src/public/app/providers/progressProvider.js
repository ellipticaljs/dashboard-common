import container from '../dependencies/container';

var DELAY = 1200;
var INTERVAL_DELAY = 200;

class Progress {
    constructor() {
        this.active = false;
        this.terminate = false;
        this.element = null;
        this.maxIntervals = 5;
        this.currentInterval = 0;
        this.value = 0;
    }

    getElement() {
        if (this.element) return this.element;
        var mdProgress = $('md-progress')[0];
        this.element = mdProgress;
        return mdProgress;
    }

    start() {
        var self = this;
        this.active = false;
        this.terminate = false;
        this.currentInterval = 0;
        this.value = 0;
        setTimeout(function () {
            if (!self.terminate) {
                self.initProgress();
                self.increment();
            }
        }, DELAY);
    }

    increment() {
        this.active = true;
        this.terminate = false;
        this.runIntervals();
    }

    initProgress() {
        var progress = this.getElement();
        progress.init();
    }

    runIntervals() {
        var progress = this.getElement();
        var self = this;
        this.incrementInterval(progress);
        var intervalId = setInterval(function () {
            if (self.terminate || self.currentInterval === self.maxIntervals) {
                self.terminate = false;
                clearInterval(intervalId);
            } else {
                self.incrementInterval(progress);
            }
        }, INTERVAL_DELAY);
    }

    incrementInterval() {
        var progress = this.getElement();
        this.currentInterval += 1;
        var value = this.getIntervalValue();
        progress.increment(value);
    }

    getIntervalValue() {
        if (this.value === 0) this.value = 30;
        else this.value += 10;
        return this.value;
    }

    end() {
        this.terminate = true;
        if (this.active) {
            var progress = this.getElement();
            progress.animate();
        }
    }
}

container.registerType('$ProgressProvider', new Progress());

 
