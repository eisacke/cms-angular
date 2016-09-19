angular
    .module('QiAngular')
    .factory('Image', Image);

Image.$inject = ['$resource'];

function Image($resource) {
    var url = 'http://localhost:3000/api'

    var ImageResource = $resource(
    url + '/images/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' }
    });
    return ImageResource;
}