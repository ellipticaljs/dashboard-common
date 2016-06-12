import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import keys from '../references/keys';
import helper from '../modules/helper';
import {Progress, Morph, Label} from '../modules/ui';

var PAGE_SIZE = keys.PAGE_SIZE;
var SERVER_KEY = keys.SERVER_KEY;
var MAP_KEY = keys.MAP_KEY;

var User = container.getType('User');
var GeoService = container.getType('GeoService');

export default class Controller extends elliptical.Controller {
    async List(req, res, next) {
        let label = "users";
        let user = new User();
        let page = req.params.id;
        let baseUrl = '/User/List';
        let rawUrl = req.url;
        let pageSize = PAGE_SIZE;
        label += Label.get(req.query);
        Morph.reset();
        Progress.start();
        try {
            let result = await user.paginate({baseUrl, rawUrl, page, pageSize})
                .filter(req.query)
                .getAsync();
            let users = result.data;
            let pagination = result.pagination;
            let count = pagination.count;
            let context = {users, pagination, count, label};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Detail(req, res, next) {
        let id = req.params.id;
        Morph.toggle();
        Progress.start();
        try {
            let user = await User.getAsync({id});
            let activeHide = (user.active) ? '' : 'hide';
            let blockHide = 'hide';
            let context = {user, activeHide, blockHide};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Password(req, res, next) {
        let id = req.params.id;
        Morph.toggle();
        Progress.start();
        try {
            let user = await User.getAsync({id});
            let context = {user};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Notify(req, res, next) {
        let id = req.params.id;
        Morph.toggle();
        Progress.start();
        try {
            let user = await User.getAsync({id});
            let context = {user};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Location(req, res, next) {
        req.query.id = req.params.id;
        let address = helper.getAddress(req.query.street, req.query.city, req.query.state, req.query.zipCode);
        let key = SERVER_KEY;
        Morph.toggle();
        Progress.start();
        try {
            let geoResult = await GeoService.getAsync({address, key});
            let user = req.query;
            let geo = geoResult.results[0].geometry.location;
            geo.key = MAP_KEY;
            let context = {user, geo};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    Create(req, res, next) {
        Morph.toggle();
        let context = {user: {}};
        res.render(context);
    }
}

    
       