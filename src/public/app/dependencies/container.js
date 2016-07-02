
import elliptical from '../references/elliptical';

var container=elliptical.container;

var http = elliptical.http;
var Service = elliptical.Service;
var Location = elliptical.Location;
var Event = elliptical.Event;
var $Cookie = elliptical.$Cookie;
var $Session = elliptical.$Session;
var Sort = elliptical.Sort;
var $Sort = elliptical.$Sort;
var DomEvent = elliptical.DomEvent;
var $Rest = elliptical.$Rest;
var $Pagination = elliptical.$Pagination;

//set Rest endpoint props
$Rest.protocol = 'http';
$Rest.host = '';
$Rest.path = '/api';
$Rest.port = 80;

var $rest = new $Rest();


//Google Rest
var $googleRest = new $Rest({
    protocol: 'https',
    path: '/maps/api/geocode/json',
    port: 443,
    host: 'maps.googleapis.com'
});


class GeoService extends Service {
}

//define onSend handler to set basic authorization for requests
$rest.onSend = function (options, entity, callback) {
    var token = $Cookie.get('token');
    options.authorization = http.encodeBasicToken(token);
    callback.call(this, null, options);
};

//asp.net OData prop settings for pagination
Service.$paginationProvider = $Pagination;
Service.$paginationProvider.count = 'count';
Service.$paginationProvider.data = 'items';

//registrations
container.mapType('Service', Service, $rest);
container.mapType('GeoService', GeoService, $googleRest);
container.mapType('Sort', Sort, $Sort);
container.mapType('Notify', elliptical.Notify, elliptical.$Notify);
container.registerType('$Rest', $Rest);
container.registerType('Location', Location);
container.registerType('Event', Event);
container.registerType('$Local', elliptical.$Local);
container.registerType('$Cookie', $Cookie);
container.registerType('$Session', $Session);
container.registerType('DomEvent', DomEvent);
container.registerType('$ViewData', elliptical.$ViewData);
container.registerType('Search', elliptical.Search);
container.registerType('crypto', elliptical.crypto);
container.registerType('Store', elliptical.Store);


export default container;
