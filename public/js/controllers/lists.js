angular
    .module('QiAngular')
    .controller('ListsController', ListsController)

ListsController.$inject = ['Record', 'Artist', 'List', 'ListItem', '$state', '$stateParams', 'record', 'list']
function ListsController (Record, Artist, List, ListItem, $state, $stateParams, record, list) {

    var self = this;
    self.lists = {};
    self.lists = list;
    self.lists.params = $stateParams.id;
    self.listItem = {
        active: true
    };
    self.newList = {
        active: true
    };
    self.newListItem = {};

    self.artists = Artist.query();

    self.getList = function() {
        List.get({ id: $stateParams.id}, function(returnedList){
            self.lists.single = returnedList;
        });
    }
  
    if ($stateParams.id) {
        self.getList();
    }
  
    self.createList = function() {
        List.save(self.newList, function(list) {
            self.showList(list);
            self.lists.all.push(list);
        });
    }

    self.createListItem = function(isValid) {
        self.submitted = true;
        if (isValid) {
            self.newListItem.listId = $stateParams.id;
            ListItem.save(self.newListItem, function(list) {
                self.newListItem = {};
                self.listItemForm.$setPristine();
                self.listItemForm.$setUntouched();
                self.submitted = false;
                self.getList();
            });
        }
    };
  
    self.showList = function(list) {
        $state.go('lists.show.id', { id: list._id });
    }

    self.updateList = function() {
        List.update(self.lists.single);
        self.lists.all = List.query();
    }

    self.listItemToggleForm = function(item) {
        var id = item._id;
        self.listItem = item;
        $('[data-id="'+id+'"]').toggleClass('active');
    }

    self.updateListItem = function(listItem, active) {
        if (active != null) {
            listItem.active = active;
        } else {
            self.listItemToggleForm(listItem);
        }
        ListItem.update(listItem);
    }

    self.deleteListItem = function(listItem) {
        ListItem.delete({id: listItem._id});
        var index = self.lists.single.items.indexOf(listItem);
        self.lists.single.items.splice(index, 1);
    }

    function updateOrder() {
        var data = $('.lists__list').sortable("toArray");
        console.log(data);
        ListItem.saveOrder({data: data});
    }

    function initSortable() {
        $( ".lists__list" ).sortable({ 
            placeholder: "ui-sortable-placeholder",
            update: updateOrder,
            cursor: 'pointer',
            start: function(e, ui){
                ui.placeholder.height(ui.item.outerHeight());
            }
        });
    }

    function init() { console.log('init');
        initSortable();
    }

    init();

}