/// Handles setting the correct menu path on page load
/// also handles menu 404--menu can't match menu item to a route(applies mainly to history events, i.e back button)
import elliptical from '../references/elliptical';
import container from '../dependencies/container';


elliptical.binding('menu', function (node) {
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    dom.event($(document), 'md.menu.url.404', onUrl404);

    var menuService = container.getType('MenuService');
    menuService.setElement($(node));
    var Location = container.getType('Location');
    var path = Location.path;
    menuService.show(path);

    function onUrl404(event, data) {

    }

    this.dispose = ()=> {
        dom.unbind();
    };

});


   