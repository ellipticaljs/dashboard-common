let moment=window.moment;

Object.defineProperty(window, 'moment', {
    get: function() { return moment; },
    enumerable: true,
    configurable: true
});

export default moment;
