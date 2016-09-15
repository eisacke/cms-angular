angular
    .module('QiAngular')
    .factory('Record', Record);

Record.$inject = ['$resource'];

function Record($resource) {
    var url = 'http://localhost:3000/api'

    var RecordResource = $resource(
    url + '/records/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' },
        'saveOrder': { 
            url: url + '/records/saveOrder',
            method: 'POST' 
        },
    });
    return RecordResource;
}