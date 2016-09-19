angular
    .module('QiAngular')
    .controller('ArtistsController', ArtistsController)

ArtistsController.$inject = ['Artist', 'Record', '$state', '$stateParams', 'record', 'list', 'artist']
function ArtistsController (Artist, Record, $state, $stateParams, record, list, artist) {

    // EVENT VARS
    var self = this;

    self.artists = artist;
    self.newArtist = {
        active: true
    };
    self.artists.params = $stateParams.id;

    self.getArtist = function() {
        Artist.get({ id: $stateParams.id}, function(returnedArtist){
            self.artists.single = returnedArtist;
        });
    }
  
    if ($stateParams.id) {
        self.getArtist();
    }
  
    self.createArtist = function() {
        Artist.save(self.newArtist, function(artist) {
            self.showArtist(artist);
            self.artists.all.push(artist);
        });
    }
  
    self.showArtist = function(artist) {
        $state.go('artists.show.id.content.core', { id: artist._id });
    }

    self.deleteArtist = function(artist) {
        var index = self.artists.single.artists.indexOf(artist);
        self.artists.single.artists.splice(index, 1);
        Artist.update(self.artists.single);
    }

    self.updateArtist = function() {
        Artist.update(self.artists.single);
        self.artists.all = Artist.query();
    }

}