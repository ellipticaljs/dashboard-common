// generic detail view binding
/// node element with the ea binding in the view should have the following attributes set:
/// label,service
import elliptical from '../references/elliptical';
import container from '../dependencies/container';


elliptical.binding('detail', function (node) {
    var $node = $(node);
    var serviceName = $node.attr('service');
    var label = $node.attr('label');
    var Location = container.getType('Location');
    var referrer = Location.referrer;
    var Service = container.getType(serviceName);
    var ConfirmDialog = container.getType('ConfirmDialog');
    var Notify = container.getType('Notify');
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    var deleteItem = $node.find('[action="delete"]');
    dom.event($node, this.click, '[action="delete"]:not(.disabled)', onDelete);

    function onDelete(event) {
        var dialog = new ConfirmDialog();
        dialog.setContent('Confirm Delete', 'Are you sure you wish to delete this ' + label.toLowerCase() + '?');
        dialog.show(function (confirmed) {
            if (confirmed)_handleDelete();
        });
    }

    function _handleDelete() {
        var id = deleteItem[0].dataset.id;
        var message;
        Service.delete({id: id}, function (err, data) {
            if (err) {
                message = 'Error: Error deleting ' + label.toLowerCase();
                Notify.show(message);
            } else {
                message = label + ' has been deleted';
                Notify.show(message);
                setTimeout(function () {
                    Location.href = referrer
                }, 750);
            }
        });
    }

    this.dispose = ()=> {
        dom.unbind();
    };

});


   