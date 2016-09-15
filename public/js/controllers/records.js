angular
    .module('QiAngular')
    .controller('RecordsController', RecordsController)

RecordsController.$inject = ['Record', 'Artist', '$state', '$stateParams', 'record', 'list']
function RecordsController (Record, Artist, $state, $stateParams, record, list) {

    // EVENT VARS
    var self = this;
    self.records = {};
    self.records = record;
    self.records.params = $stateParams.id;
    self.newRecord = {
        type: "Item"
    };
    self.records.state = $state;

    self.lists = list;

    self.artists = Artist.query();

    self.getRecord = function() {
        Record.get({ id: $stateParams.id}, function(returnedRecord){
            self.records.single = returnedRecord;
        });
    }
  
    if ($stateParams.id) {
        self.getRecord();
    }
  
    self.createRecord = function() {
        Record.save(self.newRecord, function(record) {
            self.showRecord(record);
            self.records.all.push(record);
        });
    }
  
    self.showRecord = function(record) {
        $state.go('records.show.id.content.core', { id: record._id });
    }

    self.deleteArtist = function(artist) {
        var index = self.records.single.artists.indexOf(artist);
        self.records.single.artists.splice(index, 1);
        Record.update(self.records.single);
    }

    self.updateRecord = function() {
        Record.update(self.records.single);
        self.records.all = Record.query();
    }

    self.selectizeArtistConfig = {
        valueField: '_id',
        labelField: 'name',
        delimiter: '|',
        placeholder: 'Select artists',
        searchField: 'name',
        sortField: 'name'
    }

    self.selectizeCountryConfig = {
        valueField: '_id',
        labelField: 'title',
        delimiter: '|',
        placeholder: 'Select country',
        maxItems: 1,
        searchField: "title",
        sortField: 'title'
    }

}