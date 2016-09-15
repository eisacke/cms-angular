angular
    .module('QiAngular')
    .service('list', list)

list.$inject = ['List', '$state', '$stateParams'];
function list (List, $state, $stateParams) {
	var list = this;

	List.query(function(data) {
		list.all = data;
		list.country = data.filter(function(object) { return object.title == 'Country' });
		list.role = data.filter(function(object) { return object.title == 'Role' });
	});

}