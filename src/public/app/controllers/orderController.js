import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import keys from '../references/keys';
import helper from '../modules/helper';
import {Progress, Morph, Label} from '../modules/ui';

var string = elliptical.utils.string;
var SERVER_KEY = keys.SERVER_KEY;
var MAP_KEY = keys.MAP_KEY;
var PAGE_SIZE = keys.GRID_SIZE;

var Order = container.getType('Order');
var CurrentOrderStatus = container.getType('CurrentOrderStatus');
var User = container.getType('User');
var GeoService = container.getType('GeoService');

export default class Controller extends elliptical.Controller {
    async List(req, res, next) {
        let label = "orders";
        let order = new Order();
        let page = req.params.id;
        let baseUrl = '/Order/List';
        let rawUrl = req.url;
        let pageSize = PAGE_SIZE;
        label += Label.get(req.query);
        Progress.start();
        Morph.reset();
        try {
            let result = await order.paginate({baseUrl, rawUrl, page, pageSize})
                .filter(req.query)
                .orderBy(req.query.$orderBy)
                .orderByDesc(req.query.$orderByDesc)
                .getAsync();

            let orders = result.data;
            let pagination = result.pagination;
            let count = pagination.count;
            let context = {orders, pagination, count, label};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Detail(req, res, next) {
        var id = req.params.id;
        Progress.start();
        Morph.toggle();
        try {
            let order = await Order.getAsync({id});
            order.promotion = helper.promoCodes(order);
            let user = await User.getAsync({id: order.userId});
            let notesDisplay = helper.getOrderNotesVisibility(order);
            let userType = helper.getUserType(order);
            let context = {order, notesDisplay, userType, user};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Status(req, res, next) {
        var id = req.params.id;
        Progress.start();
        Morph.toggle();
        try {
            let order = await Order.getAsync({id});
            order.selections = await CurrentOrderStatus.getAsync();
            let user = {};
            order.status = string.toTitleCase(order.orderStatus.status);
            let context = {order, user};
            res.render(context);
        } catch (err) {
            next(err)
        }
    }

    async Notify(req, res, next) {
        var id = req.params.id;
        Progress.start();
        Morph.toggle();
        try {
            let order = await Order.getAsync({id});
            let context = {order, user: {}};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Location(req, res, next) {
        var id = req.params.id;
        var key = SERVER_KEY;
        Progress.start();
        Morph.toggle();
        try {
            let order = await Order.getAsync({id});
            let user = await User.getAsync({id: order.userId});
            let address = helper.getAddress(order.shippingAddress);
            let geoResult = await GeoService.getAsync({address, key});
            let geo = geoResult.results[0].geometry.location;
            geo.key = MAP_KEY;
            let context = {order, user, geo};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }
}

   

