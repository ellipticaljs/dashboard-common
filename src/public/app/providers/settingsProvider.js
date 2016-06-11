import container from '../dependencies/container';

var $Local = elliptical.$Local;

function _get(model, key) {
    return _.find(model, function (obj) {
        return obj.key === key;
    })
}

function _replace(model, key, newObj) {
    var old = _get(model, key);
    for (var k in old) {
        if (old.hasOwnProperty(k)) {
            if (newObj[k] !== undefined) {
                old[k] = newObj[k];
            }
        }
    }
}

class _Settings {
    init() {
        var model = {
            range: 'month-to-date',
            type: 'month-to-date',
            dateValue: null,
            dateRange: null,
            now: null,
            dashboard: []
        };

        model.dashboard.push(this.createComponent('StatisticsGraph', 'Statistics Graph', true));
        model.dashboard.push(this.createComponent('TrendsGraph', 'Trends Graph', true));
        model.dashboard.push(this.createComponent('RealTimeGraph', 'Real Time Graph', true));
        model.dashboard.push(this.createComponent('SocialGraph', 'Social Graph', true));
        model.dashboard.push(this.createComponent('BrowserUsage', 'Browser Usage', true));
        model.dashboard.push(this.createComponent('DeviceUsage', 'Device Usage', true));

        return model;
    }

    createComponent(key, name, active) {
        return {
            key: key,
            name: name,
            active: active
        }
    }
}

class Settings {
    constructor() {
        this.constructor.key = 'Settings';
    }

    create() {
        var settings = new _Settings();
        var obj = settings.init();
        $Local.set(this.key, obj);
        return obj;
    }

    get(key) {
        var settings = $Local.get(this.key);
        if (!settings && settings !== undefined) settings = this.create();
        if (key) return settings[key];
        else return settings;
    }

    set(key, value) {
        var settings = this.get();
        settings[key] = value;
        $Local.set(this.key, settings);
    }

    getDashboard(key) {
        var settings = this.get();
        if (key === undefined) return settings.dashboard;
        else {
            return _.find(settings.dashboard, function (obj) {
                return obj.key === key;
            });
        }
    }

    setDashboard(key, value) {
        var settings = this.get();
        var dashboard = settings.dashboard;
        _replace(dashboard, key, value);
        $Local.set(this.key, settings);
    }

    getDisplayModel() {
        var settings = this.get();
        var dashboard = settings.dashboard;
        var display = {};
        for (var i = 0; i < dashboard.length; i++) {
            display[dashboard[i].key] = (dashboard[i].active) ? {} : '';
        }

        return display;
    }

}

container.registerType('$Settings', new Settings());

