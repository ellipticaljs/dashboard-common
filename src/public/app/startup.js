import HelpController from './controllers/helpController';
import HomeController from './controllers/homeController';
import ProfileController from './controllers/profileController';
import SettingsController from './controllers/settingsController';

export default (app)=>{
    //-------controllers------------------------------------------------------------
    new HelpController(app,'Help','/@action');
    new HomeController(app,'Home','/@action');
    new ProfileController(app,'Profile','/@action');
    new SettingsController(app,'Settings','/@action');
    
}
