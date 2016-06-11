/// order detail view binding
import elliptical from '../references/elliptical';
import container from '../dependencies/container';

elliptical.binding('order-detail', function (node) {
    var Order = container.getType('Order');
    var ConfirmDialog = container.getType('ConfirmDialog');
    var Notify = container.getType('Notify');
    var $node = $(node);
    var navList = $node.find('nav-list');
    var deleteItem = $node.find('[action="delete"]');
    var editItem = $node.find('[action="edit"]');
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    dom.event($(document), 'md.menu.url.404', onUrl404);
    dom.event(this.click, '[action="delete"]:not(.disabled)', onDelete);
    dom.event($(document), 'md.radio.change', onStatusChange);

    function onUrl404() {

    }

    function onDelete(event) {
        var dialog = new ConfirmDialog();
        dialog.setContent('Confirm Delete', 'Are you sure you wish to delete this order?');
        dialog.show(function (confirmed) {
            if (confirmed) _handleDelete();
        });
    }

    async function _handleDelete() {
        var id = deleteItem[0].dataset.id;
        var notify = new Notify();
        var message;
        try {
            await Order.deleteAsync({id});
            message = "Order has been deleted";
            _addDisabledClass();
        } catch (err) {
            message = "Error: Error deleting order";
        }
        notify.show(message);
    }

    function _addDisabledClass() {
        deleteItem.addClass('disabled');
        editItem.addClass('disabled');
    }

    async function onStatusChange(event, data) {
        var id = navList[0].dataset.id;
        var status = data.id;
        var orderStatus = $node.find('[order-status]');
        orderStatus.attr('class', '')
            .addClass(status)
            .text(status);

        var order = await Order.getAsync({id});
        await Order.putAsync(order);
    }

    this.dispose = ()=> {
        dom.unbind();
    };


});


  