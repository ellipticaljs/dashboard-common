/// generic list view binding
/// node element with the ea binding in the view should have the following attributes set:
/// service,label,item-selector,detail-action
/// the items in the list/repeating item element should have a data-id attribute set
/// detail-action is a string template , e.g.,'/Detail/[id]', that replaces [id] with the data-id value

/// this binding should be complimented by a binding or listener that has an Event listener(Event.on, not a DOM listener)
/// for the EVT_CHANNEL in order to sync the count display

import elliptical from '../references/elliptical';
import container from '../dependencies/container';

var EVT_CHANNEL = 'list.change';

elliptical.binding('list', function (node) {
    var $node = $(node);
    var serviceName = $node.attr('service');
    var Async = container.getType('Async');
    var label = $node.attr('label');
    label = (label && label !== undefined) ? label : 'item(s)';
    var itemSelector = $node.attr('item-selector');
    itemSelector = (itemSelector && itemSelector !== undefined) ? itemSelector : 'li';
    var detailAction = $node.attr('detail-action');
    var Service = container.getType(serviceName);
    var ConfirmDialog = container.getType('ConfirmDialog');
    var Notify = container.getType('Notify');
    var Event = container.getType('Event');
    var Location = container.getType('Location');
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);

    var deleteItem = $node.find('[action="delete"]');
    var viewItem = $node.find('[action="view"]');
    var editItem = $node.find('[action="edit"]');


    dom.event($(document), 'md.checkbox.change', onCheckboxChange);
    dom.event(this.click, '[action="delete"]:not(.disabled)', onDelete);
    dom.event(this.click, '[action="view"]:not(.disabled)', onView);
    dom.event(this.click, '[action="edit"]:not(.disabled)', onView);

    function onCheckboxChange(event, data) {
        if (data.checked) _removeDisabledClass();
        else {
            if (!_multiChecked())_addDisabledClass();
        }
    }

    function onDelete(event) {
        var dialog = new ConfirmDialog();
        dialog.setContent('Confirm Delete', 'Are you sure you wish to delete the selected ' + label.toLowerCase() + '(s)?');
        dialog.show(function (confirmed) {
            if (confirmed) _handleDelete();
        });
    }

    function onView(event) {
        var checked = _getMultiChecked();
        var id = checked[0].dataset.id;
        var url = detailAction.replace('[id]', id);
        Location.redirect(url);
    }

    function _removeDisabledClass() {
        deleteItem.removeClass('disabled');
        viewItem.removeClass('disabled');
        editItem.removeClass('disabled');
    }

    function _addDisabledClass() {
        deleteItem.addClass('disabled');
        viewItem.addClass('disabled');
        editItem.addClass('disabled');
    }

    function _getMultiChecked() {
        return $node.find('md-checkbox[checked]');
    }

    function _multiChecked() {
        var checked = _getMultiChecked();
        return (checked.length > 1);
    }

    function _handleDelete() {
        var checked = _getMultiChecked();
        var notify = new Notify();
        if (checked.length < 2) {
            var id = checked[0].dataset.id;
            _deleteFromDOM(id);
            Service.delete({id}, (err, data)=> {
                (err) ? notify.show('Error: Error deleting ' + label.toLowerCase()) : onDeletions([id], label + ' has been deleted', 1, notify);
            });

        } else {
            var ids = _getIds(checked);
            ids.forEach(async function (id) {
                await Service.deleteAsync({id});
            });
            onDeletions(ids, label + '(s) have been deleted', ids.length, notify);
        }
    }

    function onDeletions(ids, msg, count, notify) {
        _deleteIdsFromDOM(ids);
        notify.show(msg);
        _addDisabledClass();
        Event.emit(EVT_CHANNEL, {removed: count});
    }


    function _deleteIdsFromDOM(ids) {
        ids.forEach(function (id) {
            _deleteFromDOM(id);
        });
    }

    function _deleteFromDOM(id) {
        $node.find(itemSelector + '[data-id="' + id + '"]').remove();
    }

    function _getIds(checked) {
        var ids = [];
        var length = checked.length;
        for (var i = 0; i < length; i++) {
            ids.push(checked[i].dataset.id);
        }
        return ids;
    }

    this.dispose = ()=> {
        dom.unbind();
    };

});

  