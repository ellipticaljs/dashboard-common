import container from '../dependencies/container';

class ConfirmDialogProvider {
    constructor() {
        this.element = null;
    }

    getElement() {
        if (this.element) return this.element;
        else {
            this.element = $('md-confirm')[0];
            return this.element;
        }
    }

    show(fn) {
        var element = this.getElement();
        element.show(fn);
    }

    setContent(title, message) {
        var element = this.getElement();
        element.setContent(title, message, false);
    }
}

container.registerType('$ConfirmDialogProvider', new ConfirmDialogProvider());
