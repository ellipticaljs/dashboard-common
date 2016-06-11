import container from '../dependencies/container';


class ConfirmDialog {
    show(fn) {
        return this.constructor.show(fn);
    }

    setContent(title, message) {
        return this.constructor.setContent(title, message);
    }

    static show(fn) {
        return this.$provider.show(fn);
    }

    static setContent(title, message) {
        return this.$provider.setContent(title, message);
    }
}

container.mapType('ConfirmDialog', ConfirmDialog, '$ConfirmDialogProvider');

  