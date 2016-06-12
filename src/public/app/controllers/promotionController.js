import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import keys from '../references/keys';
import {Progress, Morph, Label} from '../modules/ui';


var PAGE_SIZE = keys.GRID_SIZE;

var Discount = container.getType('Discount');

export default class Controller extends elliptical.Controller {
    async List(req, res, next) {
        let label = "promotions";
        let discount = new Discount();
        let page = req.params.id;
        let baseUrl = '/Promotion/List';
        let rawUrl = req.url;
        let pageSize = PAGE_SIZE;
        Progress.start();
        try {
            label += Label.get(req.query);
            let result = await discount.paginate({baseUrl, rawUrl, page, pageSize})
                .filter(req.query)
                .orderBy(req.query.$orderBy)
                .orderByDesc(req.query.$orderByDesc)
                .getAsync();

            Morph.reset();
            let promotions = result.data;
            let pagination = result.pagination;
            let count = pagination.count;
            let context = {promotions, pagination, count, label};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Detail(req, res, next) {
        var id = req.params.id;
        Progress.start();
        try {
            let discount = await Discount.getAsync({id});
            Morph.toggle();
            let context = {promotion: discount};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    Create(req, res, next) {
        Morph.toggle();
        res.render();
    }
}

   
    
  
