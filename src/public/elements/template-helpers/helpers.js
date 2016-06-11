/*
 * =============================================================
 * dust helpers
 * =============================================================
 *
 */

//umd pattern

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        //commonjs
        module.exports = factory(require('dustjs'), require('dustjs-helpers'),require('moment'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['dustjs','dustjs-helpers','moment'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.dust,root.dust.helpers,root.moment);
    }
}(this, function (dust,helpers,moment) {


    dust.helpers.displayAmount=function(chunk, context, bodies, params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var percentage= dust.helpers.tap(params.percentage, chunk, context);
        var out;
        if(value) value=parseFloat(value);
        else value=0;
        if(percentage) percentage=parseFloat(percentage);
        else percentage=0;
        out=(value===0) ? percentage : value;
        return chunk.write(out);
    };

    dust.helpers.expirationDate=function(chunk, context, bodies, params){
        var value = dust.helpers.tap(params.value, chunk, context);
        var expires=dust.helpers.tap(params.expires, chunk, context);
        var format=params.format || 'MM-DD-YYYY';
        if(value && expires){
            value=moment(value).format(format);
        }else{
            value='';
        }
        return chunk.write(value);
    };

    dust.helpers.location=function(chunk, context, bodies, params){
        var address = dust.helpers.tap(params.value, chunk, context);
        var output='';
        if(!(address.zipCode && address.zipCode!=='')) output='hide';
        
        return chunk.write(output);
    };

    dust.helpers.locationZipCode=function(chunk, context, bodies, params){
        var zipCode = dust.helpers.tap(params.value, chunk, context);
        var output='';
        if(!(zipCode && zipCode!=='')) output='hide';

        return chunk.write(output);
    };


    return dust;
}));


