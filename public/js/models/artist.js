angular
    .module('QiAngular')
    .factory('Artist', Artist);

Artist.$inject = ['$resource'];

function Artist($resource) {
    var url = 'http://localhost:3000/api'

    var ArtistResource = $resource(
    url + '/artists/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' }
    });
    return ArtistResource;
}