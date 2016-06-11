import container from '../dependencies/container';


class MenuProvider {
    constructor() {
        this.element = null;
    }

    show(url) {
        var element = this.getElement();
        element[0].show(url);
    }

    setElement(element) {
        this.element = element;
    }

    getElement() {
        if (!this.element) {
            this.element = $('md-menu');
            return this.element;
        } else return this.element;
    }
}

container.registerType('$MenuProvider', new MenuProvider());

  