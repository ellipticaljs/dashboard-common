import container from '../dependencies/container';


class MorphProvider {
    constructor() {
        this.element = null;
        this.state = null;
    }

    getElement(callback) {
        var morph;
        var self = this;
        if (this.element) {
            callback(this.element);
        } else {
            morph = $('md-morph');
            if (morph[0]) {
                this.element = morph[0];
                callback(this.element);
            } else {
                var intervalId = setInterval(function () {
                    morph = $('md-morph');
                    if (morph[0]) {
                        clearInterval(intervalId);
                        self.element = morph[0];
                        callback(morph[0]);
                    }
                }, 50);
            }
        }
    }

    toggle() {
        var self = this;
        if (this.state) return;
        this.getElement(function (element) {
            element.toggle();
            self.state = 'toggled';
        });
    }

    reset() {
        var self = this;
        if (!this.state) return;
        this.getElement(function (element) {
            element.reset();
            self.state = null;
        });
    }
}

container.registerType('$MorphProvider', new MorphProvider());

 