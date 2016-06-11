import elliptical from '../references/elliptical';
import container from '../dependencies/container';

var $Cookie = container.getType('$Cookie');
var Profile = container.getType('Profile');

export default class Controller extends elliptical.Controller {
    Index(req, res, next) {
        let profile = $Cookie.get('profile');
        let id = profile.id;
        Profile.get({id}, (err, data)=> {
            try {
                let context = {user: data};
                res.render(context);
            } catch (err) {
                next(err);
            }
        });
    }

    Login(req, res, next) {
        res.render();
    }

    Logout(req, res, next) {
        let profile = $Cookie.get('profile');
        let id = profile.id;
        Profile.logout({id}, (err, data)=> {
            try {
                let message = (err) ? err.message : data.message;
                let context = {message};
                res.render(context);
            } catch (err) {
                next(err);
            }
        });
    }

    Password(req, res, next) {
        let user = $Cookie.get('profile');
        let context = {user};
        res.render(context);
    }
}

   
