angular
    .module('QiAngular')
    .controller('SidebarController', SidebarController)

SidebarController.$inject = ['Record', 'List', 'Artist', 'Exhibition', '$state', '$stateParams', 'record', 'list', 'artist', 'exhibition']
function SidebarController (Record, List, Artist, Exhibition, $state, $stateParams, record, list, artist, exhibition) {

    var self = this;
    self.records = record;
    self.lists = list;
    self.artists = artist;
    self.exhibitions = exhibition;

    self.updateRecord = function(record, active) {
        record.active = active;
        Record.update(record);
    }

    self.updateList = function(list, active) {
        list.active = active;
        List.update(list);
    }

    self.updateArtist = function(artist, active) {
        artist.active = active;
        Artist.update(artist);
    }

    self.updateExhibition = function(exhibition, active) {
        exhibition.active = active;
        Exhibition.update(exhibition);
    }

    self.deleteRecord = function(record) {
        Record.delete({id: record._id});
        var index = self.records.all.indexOf(record);
        self.records.all.splice(index, 1);
        $state.go('records.new');
    }

    self.deleteList = function(list) {
        List.delete({id: list._id});
        var index = self.lists.all.indexOf(list);
        self.lists.all.splice(index, 1);
        $state.go('lists.new');
    }

    self.deleteArtist = function(artist) {
        Artist.delete({id: artist._id});
        var index = self.artists.all.indexOf(artist);
        self.artists.all.splice(index, 1);
        $state.go('artists.new');
    }

    self.deleteExhibition = function(exhibition) {
        Exhibition.delete({id: exhibition._id});
        var index = self.exhibitions.all.indexOf(exhibition);
        self.exhibitions.all.splice(index, 1);
        $state.go('exhibitions.new');
    }

}