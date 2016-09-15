angular
    .module('QiAngular')
    .service('record', record)

record.$inject = ['Record', '$state', '$stateParams'];
function record (Record, $state, $stateParams) {
	var record = this;

	record.all = Record.query();
	record.single = {};

}