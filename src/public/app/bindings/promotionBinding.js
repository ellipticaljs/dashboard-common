import elliptical from '../references/elliptical';
import container from '../dependencies/container';


elliptical.binding('promotion', function (node) {
    var DiscountValidate = container.getType('DiscountValidate');
    var $ViewData = container.getType('$ViewData');
    var Location = container.getType('Location');
    var DomEvent = container.getType('DomEvent');
    var dom = new DomEvent(node, this);
    dom.event('md.checkbox.change', onCheckboxChange);
    dom.event('md.select.change', onSelectChange);
    dom.event('md.input.validate', onValidation);

    var datepicker = node.querySelector('md-datepicker');
    var discounts = dom.find('[data-discount]');
    var validate = node.querySelector('md-input-validate');

    function onCheckboxChange(event, data) {
        if (data.checked) datepicker.enable();
        else {
            datepicker.disable();
            datepicker.clear();
        }
    }

    function onSelectChange(event, data) {
        var value = data.value;
        discounts.addClass('hide');
        dom.find('[data-selection="' + value + '"]').removeClass('hide');
    }

    function onValidation(event, data) {
        var code = data.value;
        DiscountValidate.get({code}, (err, data)=> {
            if (err)  validate.show('error');
            else validate.showSuccess();
        });
    }

    function bindDetail() {
        var route = Location.path;
        if (route.indexOf('/Detail') < 0) return;
        var element;
        var entity = $ViewData.get('promotion');
        if (entity.amount > 0) element = node.querySelector('[data-selection="DollarDiscount"]');
        else if (entity.percentage > 0) element = node.querySelector('[data-selection="PercentageDiscount"]');
        element.classList.remove('hide');
    }

    this.dispose = ()=> {
        dom.unbind();
    };

    bindDetail();

});

 