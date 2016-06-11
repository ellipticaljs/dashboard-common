///Dashboard Settings Binding: Listens for changes in the switch settings in Settings > Dashboard and calls the Settings service
/// to update the persistence store
import elliptical from '../references/elliptical';
import container from '../dependencies/container';


elliptical.binding('dashboard-settings', function (node) {
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    dom.event($(document), 'md.switch.change', onChange);

    function onChange(event, data) {
        var Settings = container.getType('Settings');
        var component = Settings.getDashboard(data.id);
        component.active = data.checked;
        Settings.setDashboard(data.id, component);
    }

    this.dispose = ()=> {
        dom.unbind();
    };
});


  