import container from '../dependencies/container';


class MorphService {
    toggle() {
        this.$provider.toggle();
    }

    reset() {
        this.$provider.reset();
    }
}

container.mapType('Morph', new MorphService(), '$MorphProvider');

    