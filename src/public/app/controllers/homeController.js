import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import {Progress, Morph, Label} from '../modules/ui';

var Settings = container.getType('Settings');

export default class Controller extends elliptical.Controller {
    Index(req, res, next) {
        try {
            let dashboard;
            if (this._app.context.disableDashboard && this._app.context.disableDashboard !== undefined) {
                dashboard = null;
            } else {
                dashboard = Settings.getDisplayModel();
            }
            let context = {dashboard};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }
}
    

