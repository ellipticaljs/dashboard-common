import HelpController from './controllers/helpController';
import HomeController from './controllers/homeController';
import OrderController from './controllers/orderController';
import ProfileController from './controllers/profileController';
import PromotionController from './controllers/promotionController';
import SettingsController from './controllers/settingsController';
import UserController from './controllers/userController';
import UserOrderController from './controllers/userOrderController';

export default (app)=>{
    //-------controllers------------------------------------------------------------
    new HelpController(app,'Help','/@action');
    new HomeController(app,'Home','/@action');
    new OrderController(app,'Order','/@action/:id');
    new ProfileController(app,'Profile','/@action');
    new PromotionController(app,'Promotion','/@action/:id');
    new SettingsController(app,'Settings','/@action');
    new UserController(app,'User','/@action/:id');
    new UserOrderController(app,'UserOrder','/@action/:userid/:page');
    
}
