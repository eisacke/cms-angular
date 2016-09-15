angular
    .module('QiAngular')
    .service('exhibition', exhibition)

exhibition.$inject = ['Exhibition', '$state', '$stateParams'];
function exhibition (Exhibition, $state, $stateParams) {
	var exhibition = this;

	exhibition.all = Exhibition.query();
	exhibition.single = {};

}