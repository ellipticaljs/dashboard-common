/// binds the Dashboard icon cards
import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import keys from '../references/keys';

var EVENT_NAME = 'db.datapicker.change';


elliptical.binding('cards', function (node) {
    var $node = $(node);
    var Report = container.getType('Report');
    var Event = container.getType('Event');
    var isDisabled=keys.DISABLE_DATE_RANGE;
    var DatePicker = null;
    var handle = Event.on(EVENT_NAME, populate);

    function init() {
        populate();
    }

    function populate() {
        Report.get({}, updateDom);
    }

    function updateDom(err, data) {
        if (err) return;
        var orders = $node.find('[data-id="orders"]');
        orders.text(data.orders);
        var sales = $node.find('[data-id="sales"]');
        sales.text(data.sales);
        var users = $node.find('[data-id="users"]');
        users.text(data.users);
        var visits = $node.find('[data-id="visits"]');
        visits.text(data.visits);
        updateDateRange();
    }

    function updateDateRange() {
        var span = $('[data-id="date-range"]');
        if (isDisabled) {
            span.text('N/A');
            return;
        }
        var range = DatePicker.getDateRange();
        if (range) {
            span.text(range);
        }
    }

    init();

    this.dispose = ()=> {
        Event.off(handle);
    };
});


 