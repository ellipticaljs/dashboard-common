import container from '../dependencies/container';

export default (app)=>{
    var menuService=container.getType('MenuService');
    var Location=container.getType('Location');
    
    app.onHistory((params)=>{
        var route=params.route;
        menuService.show(route);
    });

    $(document).on('md.menu.ready',onReady);

    function onReady(){
        var delay=(app.PRELOAD_DELAY) ? app.PRELOAD_DELAY : 1100;
        var route=Location.path;
        route+=Location.search;
        setTimeout(function(){
            menuService.show(route);
            off();
        },delay);

    }

    function off(){
        $(document).off('md.menu.ready',onReady);
    }
}

