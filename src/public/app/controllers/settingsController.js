import elliptical from '../references/elliptical';
import container from '../dependencies/container';

var Settings = container.getType('Settings');

export default class Controller extends elliptical.Controller {
    Index(req, res, next) {
        let settings = Settings.getDashboard();
        let disableSwitch = 'disabled';
        let context = {settings, disableSwitch};
        res.render(context);
    }
}
    
    
   

  