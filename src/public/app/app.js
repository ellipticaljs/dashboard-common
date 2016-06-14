import elliptical from './references/elliptical';
import container from './dependencies/container';
import startup from './startup';
import menuHistory from './modules/menuHistory';

//create the app
var app = elliptical(); 

var PRELOAD_DELAY = 0;
var Progress = null;
app.context.siteTitle = 'My Dashboard';
app.context.displayTitle = '';///==='hide', to hide
app.context.disableDashboard = ''; ///=='disabled', to disable
app.context.fabHide = ''; ///=='hide', to hide

//-------configuration-------------------------------------------------
//views root
var viewsRoot = '/app/views';
var $Template = elliptical.$Template; ///template provider
$Template.setRoot(viewsRoot);  ///set views root
var View=elliptical.View;
View.$provider=$Template;


app.configure('production', function () {
    PRELOAD_DELAY = 3500;
});

app.configure(function () {
    //use hashTags for url routing
    app.hashTag = true;
    
    ///global callback to handle route authentication
    app.use(elliptical.globalCallback(function (req, res, next) {
        var tokenCookie = req.cookies.token;
        if (!tokenCookie && req.route !== '/profile/login') {
            res.redirect('/Profile/Login');
        } else {
            next();
        }
    }));

    //app.router
    app.use(app.router);

    //error
    app.use(elliptical.httpError());

    //http 404
    app.use(elliptical.http404());
});


//global View onBeforeRender callback
app.onBeforeRender = function (req, res, context, callback) {
    if (!Progress) Progress = container.getType('Progress');
    Progress.end();
    callback(context);
};

//enable menu history
menuHistory(app);

//bind startup(routes)
startup(app);

//-------load toolbars,menu-----------------------------------------------------
app.PRELOAD_DELAY = PRELOAD_DELAY;

/* listen */
app.listen(true, function () {
    //load in the menu and toolbar into the global layout on page load
    $.get(viewsRoot + '/shared/md-menu.html', function (data) {
        var menuPlaceholder = $('[data-menu-placeholder]');
        menuPlaceholder.html(data);
    });
    $.get(viewsRoot + '/shared/md-toolbar.html', function (data) {
        var toolbarPlaceholder = $('[data-toolbar-placeholder]');
        toolbarPlaceholder.html(data);
    });
    //set site title in title tag
    $('title').html(app.context.siteTitle);

    setTimeout(function () {
        $('body')[0].removeAttribute('preload');
        $('paper-drawer-panel').attr('style', '');
    }, PRELOAD_DELAY);

}); //single page app

export default app;