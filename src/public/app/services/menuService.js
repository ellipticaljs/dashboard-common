import container from '../dependencies/container';


class MenuService {
    constructor() {
        this.element = null;
        this.$provider = null;
    }

    show(params) {
        this.$provider.show(params);
    }

    setElement(element) {
        this.$provider.setElement(element);
    }
}

container.mapType('MenuService', new MenuService(), '$MenuProvider');

  