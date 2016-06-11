import container from '../dependencies/container';

var Store = container.getType('Store');

class Settings extends Store {
    static getDashboard(key) {
        return this.$provider.getDashboard(key);
    }

    static setDashboard(key, value) {
        this.$provider.setDashboard(key, value)
    }

    static getDisplayModel() {
        return this.$provider.getDisplayModel()
    }

    getDashboard(key) {
        return this.constructor.getDashboard(key);
    }

    setDashboard(key, value) {
        this.constructor.setDashboard(key, value);
    }

    getDisplayModel() {
        return this.constructor.getDisplayModel();
    }
}

container.mapType('Settings', Settings, '$Settings');

   