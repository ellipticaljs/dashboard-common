import container from '../dependencies/container';


class Progress {
    start() {
        this.$provider.start();
    }

    end() {
        this.$provider.end();
    }
}

container.mapType('Progress', new Progress(), '$ProgressProvider');

 
