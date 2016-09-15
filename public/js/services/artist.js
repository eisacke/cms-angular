angular
    .module('QiAngular')
    .service('artist', artist)

artist.$inject = ['Artist', '$state', '$stateParams'];
function artist (Artist, $state, $stateParams) {
	var artist = this;

	artist.all = Artist.query();
	artist.single = {};

}