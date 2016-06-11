import container from '../dependencies/container';
import moment from '../references/moment';

var EVENT_NAME = 'db.datapicker.change';
var FORMATTER = 'MMMM D, YYYY';
var Location = container.getType('Location');
var Event = container.getType('Event');

function $DatePicker() {
    this.type = null;
    this.value = null;
    this.dateValue = null;
    this.dateRange = null;

    this.set = function (type, val) {
        var filter = '';
        var url = '/Order/List/1?$filter=';
        var now = moment().format('l');
        var _now = moment(now);
        var strNow = _now.format(FORMATTER);
        if (type === 'today') {
            filter = this.setToday(now, _now, strNow);

        } else if (type === 'year-to-date') {
            filter = this.setYearToDate(strNow);

        } else if (type === 'month-to-date') {
            filter = this.setMonthToDate(strNow)

        } else if (type === 'range') {
            filter = this.setRange(val);
        }
        url += filter;
        var currentPath = Location.path;
        if (currentPath !== '/') {
            Location.redirect(url);
        } else {
            Event.emit(EVENT_NAME, this.dateValue);
        }
    };

    this.get = function () {
        return this.value;
    };

    this.getDate = function () {
        return this.dateValue;
    };

    this.getType = function () {
        return this.type;
    };

    this._getDateRange = function (obj) {
       
        var now = moment().format('l');
        var _now = moment(now);
        var strNow = _now.format(FORMATTER);
        return obj.format(FORMATTER) + ' - ' + strNow;
    };

    this.setToday = function (now, _now, strNow) {
        var filter = 'Date eq ' + now;
        this.value = 'today';
        this.type = 'today';
        this.dateValue = _now;
        this.dateRange = strNow;
        return filter;
    };

    this.setYearToDate = function (strNow) {
        var currentYear = moment().format('YYYY');
        var yearDate = '1/1/' + currentYear;
        var filter = 'Date ge ' + yearDate;
        this.value = 'year to date';
        this.type = 'year-to-date';
        this.dateValue = moment(yearDate);
        this.dateRange = this.dateValue.format(FORMATTER) + ' - ' + strNow;
        return filter;
    };

    this.setMonthToDate = function (strNow) {
        var currentMonth = moment().format('MM');
        var currentYear = moment().format('YYYY');
        var monthDate = currentMonth + '/1/' + currentYear;
        var filter = 'Date ge ' + monthDate;
        this.value = 'month to date';
        this.type = 'month-to-date';
        this.dateValue = moment(monthDate);
        this.dateRange = this.dateValue.format(FORMATTER) + ' - ' + strNow;
        return filter;
    };

    this.setRange = function (val) {
        var filter = 'Date ge ' + val.start + ' le ' + val.end;
        this.value = val.start + ' - ' + val.end;
        this.type = 'range';
        this.dateValue = {
            start: moment(val.start),
            end: moment(val.end)
        };
        this.dateRange = this.dateValue.start.format(FORMATTER) + ' - ' + this.dateValue.end.format(FORMATTER);
        return filter;
    };
}

container.registerType('$DatePickerProvider', new $DatePicker());

   