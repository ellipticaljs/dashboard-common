/// toolbar search binding
import elliptical from '../references/elliptical';
import container from '../dependencies/container';


elliptical.binding('search', function (node) {
    var Search = container.getType('Search');
    var Location = container.getType('Location');
    var $node = $(node);
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    dom.event(this.click, 'button', onClick);
    dom.event('keypress', onKeypress);

    function onClick(event) {
        var input = $node.find('input');
        var val = input.val();
        var search = new Search();
        var url = _getUrl();
        if (val !== '') {
            input.val('');
            search.find({url: url, value: val});
        }
    }

    function onKeypress(event) {
        if (event.which !== 13)  return;
        onClick(event);
    }

    function _getUrl() {
        return Location.href;
    }

    this.dispose = ()=> {
        dom.unbind();
    };
});


    