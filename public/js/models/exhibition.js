angular
    .module('QiAngular')
    .factory('Exhibition', Exhibition);

Exhibition.$inject = ['$resource'];

function Exhibition($resource) {
    var url = 'http://localhost:3000/api'

    var ExhibitionResource = $resource(
    url + '/exhibitions/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' },
        'deletePerson': { 
            url: url + '/exhibitions/update/person',
            method: 'PUT'
        }
    });
    return ExhibitionResource;
}