/// user detail view binding
import elliptical from '../references/elliptical';
import container from '../dependencies/container';

elliptical.binding('user-detail', function (node) {
    var Location = container.getType('Location');
    var referrer = Location.referrer;
    var User = container.getType('User');
    var ConfirmDialog = container.getType('ConfirmDialog');
    var Notify = container.getType('Notify');
    var $node = $(node);
    var deleteItem = $node.find('[action="delete"]');
    var blockItem = $node.find('[action="block"]');
    var activeItem = $('[active]');
    var blockedItem = $('[blocked]');
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    dom.event(this.click, '[action="delete"]:not(.disabled)', onDelete);
    dom.event(this.click, '[action="block"]:not(.disabled)', onBlock);


    function onDelete(event) {
        var dialog = new ConfirmDialog();
        dialog.setContent('Confirm Delete', 'Are you sure you wish to delete this user?');
        dialog.show(function (confirmed) {
            if (confirmed) _handleDelete();
        });
    }


    function onBlock(event) {
        var message = _getBlockMessage();
        var dialog = new ConfirmDialog();
        dialog.setContent(message.title, message.text);
        dialog.show(function (confirmed) {
            if (confirmed) _handleBlockUser();
        });
    }


    function _handleDelete() {
        var id = deleteItem[0].dataset.id;
        User.delete({id}, (err, data)=> {
            var message;
            if (err) {
                message = 'Error: Error deleting user';
                Notify.show(message);
            } else {
                message = 'User has been deleted';
                Notify.show(message);
                setTimeout(function () {
                    Location.href = referrer
                }, 750);
            }
        });
    }

    function _handleBlockUser() {
        var status = _getBlockStatus();
        _getUser(function (err, user) {
            if (!err) {
                User.put(user, (err, data)=> {
                    var message = (err) ? status.error : status.success;
                    Notify.show(message);
                    _updateDOM(user.active);
                });
            } else {
                Notify.show('Error retieving user');
            }
        });
    }


    function _getUserStatus() {
        return blockItem[0].dataset.active;
    }


    function _getBlockMessage() {
        var message = {};
        var active = _getUserStatus();
        if (active === "true") {
            message.title = "Confirm Block User";
            message.text = "Are you sure you wish to block this user's account?";
        } else {
            message.title = "Confirm Unblock User";
            message.text = "Are you sure you wish to re-enable this user's account?";
        }
        return message;
    }

    function _getBlockStatus() {
        var message = {};
        var active = _getUserStatus();
        if (active === "true") {
            message.success = "The user account has been blocked";
            message.error = "Error: Error blocking user";
        } else {
            message.success = "The user account has been re-enabled";
            message.error = "Error: Error unblocking user";
        }
        return message;
    }

    function _getUser(callback) {
        var active = _getUserStatus();
        active = !(active === 'true');
        var id = deleteItem[0].dataset.id;
        User.get({id}, (err, data)=> {
            data.active = active;
            callback(err, data);
        });
    }

    function _updateDOM(active) {
        if (active) {
            activeItem.removeClass('hide');
            blockedItem.addClass('hide');
        } else {
            activeItem.addClass('hide');
            blockedItem.removeClass('hide');
        }

        blockItem[0].dataset.active = active;
    }

    this.dispose = ()=> {
        dom.unbind();
    };

});
