angular
    .module('QiAngular')
    .controller('ExhibitionsController', ExhibitionsController)

ExhibitionsController.$inject = ['Exhibition', 'Artist', 'List', 'ListItem', 'Record', '$state', '$stateParams', 'record', 'list', 'artist', 'exhibition']
function ExhibitionsController (Exhibition, Artist, List, ListItem, Record, $state, $stateParams, record, list, artist, exhibition) {

    var self = this;
    self.exhibitions = exhibition;
    self.newExhibition = {
        active: true
    };
    self.exhibitions.params = $stateParams.id;

    // SERVICES
    self.records = record;
    self.artists = artist;
    self.lists = list;

    // RELATIONSHIPS
    self.newPerson = {
        personId: {
            name: "",
        },
        role: {
            title: ""
        }
    };

    self.getExhibition = function() {
        Exhibition.get({ id: $stateParams.id}, function(returnedExhibition){
            self.exhibitions.single = returnedExhibition;
            self.exhibitions.single.openingDate = new Date(self.exhibitions.single.openingDate);
            self.exhibitions.single.closingDate = new Date(self.exhibitions.single.closingDate);
        });
    }
  
    if ($stateParams.id) {
        self.getExhibition();
    }
  
    self.createExhibition = function() {
        Exhibition.save(self.newExhibition, function(exhibition) {
            self.showExhibition(exhibition);
            self.exhibitions.all.push(exhibition);
        });
    }
  
    self.showExhibition = function(exhibition) {
        $state.go('exhibitions.show.id.content.core', { id: exhibition._id });
    }

    self.deleteExhibition = function(exhibition) {
        var index = self.exhibitions.single.exhibitions.indexOf(exhibition);
        self.exhibitions.single.exhibitions.splice(index, 1);
        Exhibition.update(self.exhibitions.single);
    }

    self.updateExhibition = function() {
        Exhibition.update(self.exhibitions.single);
        self.exhibitions.all = Exhibition.query();
    }

    self.addPersonRelationship = function() {
        var person = {
            'personId': self.relationship.people.personId,
            'role': self.relationship.people.role
        }
        self.exhibitions.single.people.push(person);
        Exhibition.update(self.exhibitions.single);

        // HACK
        setTimeout(function() {
            var $newRelationship = $('.relationships__item:last-of-type');
            $newRelationship.find('p').html(self.newPerson.name);
            $newRelationship.find('span').html(self.newPerson.role);
        }, 10)
    }

    self.deletePersonRelationship = function(person) {
        person.exhibitionId = self.exhibitions.params;
        Exhibition.deletePerson(person);
        var index = self.exhibitions.single.people.indexOf(person);
        self.exhibitions.single.people.splice(index, 1);
    }

    self.updatePersonRelationship = function(person, status) {
        person.active = status;
        Exhibition.update(self.exhibitions.single);
    }

    self.selectizeArtistConfig = {
        valueField: '_id',
        labelField: 'name',
        delimiter: '|',
        placeholder: 'Select a person or organization',
        searchField: "name",
        maxItems: 1,
        onItemAdd: function(value, $item) {
            self.newPerson.name = $item[0].innerText;
        }
    }

    self.selectizeRoleConfig = {
        valueField: '_id',
        labelField: 'title',
        delimiter: '|',
        placeholder: 'Select a role',
        searchField: "title",
        maxItems: 1,
        sortField: 'rank',
        onItemAdd: function(value, $item) {
            self.newPerson.role = $item[0].innerText;
        }
    }
}