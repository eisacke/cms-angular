angular
    .module('QiAngular')
    .factory('ListItem', ListItem);

ListItem.$inject = ['$resource'];

function ListItem($resource) {
    var url = 'http://localhost:3000/api'

    var ListItemResource = $resource(
    url + '/listItems/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' }
    });
    return ListItemResource;
}