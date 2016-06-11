import container from '../dependencies/container';

var status = [
    {value: 'Open'},
    {value: 'Closed'},
    {value: 'Completed'},
    {value: 'Pending'},
    {value: 'Processed'},
    {value: 'Cancelled'},
    {value: 'Charged'},
    {value: 'Authorized'},
    {value: 'Recurring'},
    {value: 'Routed'},
    {value: 'Refunded'},
    {value: 'Returned'},
    {value: 'Delivered'},
    {value: 'PaymentDue'},
    {value: 'Current'},
    {value: 'Failed'},
    {value: 'Expired'},
    {value: 'AwaitingPayment'},
    {value: 'Shipped'},
    {value: 'Other'}
];

class CurrentOrderStatus {
    static get(params, callback) {
        callback(null, status);
    }

    static getAsync() {
        return new Promise(function (resolve, reject) {
            resolve(status);
        });
    }
}

container.registerType('CurrentOrderStatus', CurrentOrderStatus);

 


