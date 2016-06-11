import container from '../dependencies/container';

class Label {
    static get(query) {
        var keys = Object.keys(query);
        var q;
        if (keys[0] && keys[0] !== '$orderBy' && keys[0] !== '$orderByDesc') {
            q = query[keys[0]];
            var decoded = decodeURIComponent(q);
            return ' match "' + decoded + '"';
        } else return '';
    }
}

container.registerType('Label', Label);

  