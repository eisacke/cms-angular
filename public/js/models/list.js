angular
    .module('QiAngular')
    .factory('List', List);

List.$inject = ['$resource'];

function List($resource) {
    var url = 'http://localhost:3000/api'

    var ListResource = $resource(
    url + '/lists/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' }
    });
    return ListResource;
}