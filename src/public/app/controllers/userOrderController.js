import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import keys from '../references/keys';
import {Progress, Morph, Label} from '../modules/ui';

var PAGE_SIZE = keys.GRID_SIZE;
var User = container.getType('User');
var UserOrder = container.getType('UserOrder');

export default class Controller extends elliptical.Controller {
    async List(req, res, next) {
        let id = req.params.userid;
        let page = req.params.page;
        let userOrder = new UserOrder();
        let baseUrl = '/UserOrder/List/' + id;
        let rawUrl = req.url;
        let pageSize = PAGE_SIZE;
        Progress.start();
        try {
            Morph.toggle();
            let userId = id;
            let user = await User.getAsync({id});
            let orders = await userOrder.paginate({baseUrl, rawUrl, page, pageSize})
                .orderBy(req.query.$orderBy)
                .orderByDesc(req.query.$orderByDesc)
                .getAsync({id});
            let pagination = orders.pagination;
            let count = pagination.count;
            let hide = (count > 0) ? '' : 'hide-important';
            let context = {user, userId, orders:orders.data, pagination, count, hide};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }
}

   

    

  