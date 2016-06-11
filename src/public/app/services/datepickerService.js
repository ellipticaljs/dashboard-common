///DatePicker Service:
/// Sets Dates and Date Ranges from Selections made by the FAB Dashboard Datepicker
/// Also returns the current selections, get-->returns a text label for the selected range. getDate-->returns a valid JS date/date range
/// If get returns nothing, the service will set a default 'month-to-date' date range
/// the service will also update Settings values from an injected $Settings provider. This is to allow persistence across sessions
/// Finally, the service will set the Url filter string and notify any listeners of updated values
import container from '../dependencies/container';
import moment from '../references/moment';

var FORMATTER = 'MMMM D, YYYY';
var Settings = container.getType('$Settings');

function DatePicker() {
    this.$provider = this.constructor.$provider;
    this.set = function (type, val) {
        this.$provider.set(type, val);
        var value = this.$provider.value;
        var dateValue = this.$provider.dateValue;
        var dateRange = this.$provider.dateRange;
        var _type = this.$provider.type;
        var now = moment();
        Settings.set('range', value);
        Settings.set('dateValue', dateValue);
        Settings.set('dateRange', dateRange);
        Settings.set('now', now);
        Settings.set('type', _type);
    };
    this.get = function () {
        return this.$provider.get();
    };
    this.getDate = function () {
        ///return dateValue
        var value = this.$provider.getDate();
        var type = Settings.get('type');

        ///if range and value, return value (range is not dependent on a 'to-date' to today calculation)
        if (value && type === 'range') {
            return value;
        } else if (type === 'range') {
            var _dateValue = Settings.get('dateValue');
            if (_dateValue) {
                var start_ = moment(_dateValue.start);
                var end_ = moment(_dateValue.end);
                return {start: start_, end: end_};
            }
        }

        var invalidNow = true;
        var now = moment().format('l');
        var _now = moment(now);
        var strNow = _now.format(FORMATTER);
        var settingsNow = Settings.get('now');
        if (settingsNow) {
            settingsNow = moment(settingsNow);
            invalidNow = (_now === settingsNow);
        }

        ///if settings now is a valid now and value exists, return value
        if (value && !invalidNow) {
            return value;
        }

        //if no type in settings, defaults to 'month-to-date'
        if (!type) {
            type = 'month-to-date';
        }
        ///else, we need to update the settings now
        ///e.g., avoid Datepicker set for 'today', login a week later and getting 'today' as last week's value
        switch (type) {
            case 'today':
            {
                this.$provider.setToday(now, _now, strNow);
                return this.$provider.dateValue;
            }
            case 'month-to-date':
            {
                this.$provider.setMonthToDate(strNow);
                return this.$provider.dateValue;
            }
            case 'year-to-date':
            {
                this.$provider.setYearToDate(strNow);
                return this.$provider.dateValue;
            }

        }

        return null;
    };

    this.getType = function () {
        var type = this.$provider.type;
        if (!type) {
            type = Settings.get('type');
            if (!type) {
                return 'month-to-date';
            } else {
                return type;
            }
        } else {
            return type;
        }
    };

    this.getDateRange = function () {
        var range = this.$provider.dateRange;
        if (range) {
            return range;
        } else {
            range = Settings.get('dateRange');
            if (range) {
                this.$provider.dateRange = range;
            }
            return range;
        }
    };
}

container.mapType('DatePicker', new DatePicker(), '$DatePickerProvider');

 