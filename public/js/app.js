angular
    .module('QiAngular', ['ngResource', 'ui.router', 'selectize'])
    .constant('API', 'http://localhost:3000/api')
    .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            abstract: true,
            templateUrl: "js/views/main.html",
        })
        .state('home', {
            url: '/',
            templateUrl: "js/views/home/home.html"
        })
        .state('lists', {
            url: '/lists',
            parent: 'index',
            views: {
                'sidebar': {
                    templateUrl: "js/views/sidebar/lists.html",
                    controller: 'SidebarController',
                    controllerAs: 'sidebar',
                },
                'header': {
                    templateUrl: "js/views/common/header.html",
                    controller: 'ListsController',
                    controllerAs: 'lists',
                },
                'content': { templateUrl: "js/views/common/body.html" }
            }
        })
        .state('lists.new', {
            controller: 'ListsController',
            controllerAs: 'lists',
            url: '/new',
            templateUrl: "js/views/lists/new.html",
        })
        .state('lists.show', {
            controller: 'ListsController',
            controllerAs: 'lists',
            url: '/show',
            abstract: true,
            templateUrl: "js/views/lists/show.html",
        })
        .state('lists.show.id', {
            url: '/:id',
            // abstract: true,
            views: {
                'data@lists.show': {
                    templateUrl: "js/views/lists/data.html",
                    controller: 'ListsController',
                    controllerAs: 'lists',
                }
            }
        })
        .state('content', {
            url: '/content',
            parent: 'index',
            views: {
                'sidebar': {
                    templateUrl: "js/views/sidebar/content.html",
                    controller: 'SidebarController',
                    controllerAs: 'sidebar',
                }
            }
        })
        .state('artists', {
            url: '/artists',
            parent: 'index',
            views: {
                'sidebar': {
                    templateUrl: "js/views/sidebar/artists.html",
                    controller: 'SidebarController',
                    controllerAs: 'sidebar',
                },
                'header': {
                    templateUrl: "js/views/common/header.html",
                    controller: 'ArtistsController',
                    controllerAs: 'artists',
                },
                'content': { templateUrl: "js/views/common/body.html" }
            }
        })
        .state('artists.new', {
            controller: 'ArtistsController',
            controllerAs: 'artists',
            url: '/new',
            templateUrl: "js/views/artists/new.html",
        })
        .state('artists.show', {
            controller: 'ArtistsController',
            controllerAs: 'artists',
            url: '/show',
            abstract: true,
            templateUrl: "js/views/artists/show.html",
        })
        .state('artists.show.id', {
            url: '/:id',
            views: {
                'data@artists.show': {
                    templateUrl: "js/views/artists/data.html",
                    controller: 'ArtistsController',
                    controllerAs: 'artists',
                }
            }
        })
        .state('artists.show.id.content', {
            url: '/content',
            templateUrl: "js/views/artists/data/content.html",
            controller: 'ArtistsController',
            controllerAs: 'artists',
        })
        .state('artists.show.id.content.core', {
            url: '/core',
            views: {
                'core@artists.show.id.content': {
                    templateUrl: "js/views/artists/data/core.html",
                    controller: 'ArtistsController',
                    controllerAs: 'artists',
                }
            }
        })
        .state('artists.show.id.content.additional', {
            url: '/additional',
            views: {
                'core@artists.show.id.content': {
                    templateUrl: "js/views/artists/data/additional.html",
                    controller: 'ArtistsController',
                    controllerAs: 'artists',
                }
            }
        })
        .state('artists.show.id.content.metadata', {
            url: '/metadata',
            views: {
                'core@artists.show.id.content': {
                    templateUrl: "js/views/artists/data/metadata.html",
                    controller: 'ArtistsController',
                    controllerAs: 'artists',
                }
            }
        })
        .state('artists.show.id.images', {
            url: '/images',
            templateUrl: "js/views/artists/data/images.html",
            controller: 'ArtistsController',
            controllerAs: 'artists',
        })
        .state('artists.show.id.documents', {
            url: '/documents',
            templateUrl: "js/views/artists/data/documents.html",
            controller: 'ArtistsController',
            controllerAs: 'artists',
        })
        .state('records', {
            url: '/records',
            parent: 'index',
            views: {
                'sidebar': {
                    templateUrl: "js/views/sidebar/records.html",
                    controller: 'SidebarController',
                    controllerAs: 'sidebar',
                },
                'header': {
                    templateUrl: "js/views/common/header.html",
                    controller: 'RecordsController',
                    controllerAs: 'records',
                },
                'content': { templateUrl: "js/views/common/body.html" }
            }
        })
        .state('records.new', {
            controller: 'RecordsController',
            controllerAs: 'records',
            url: '/new',
            templateUrl: "js/views/records/new.html",
        })
        .state('records.show', {
            controller: 'RecordsController',
            controllerAs: 'records',
            url: '/show',
            abstract: true,
            templateUrl: "js/views/records/show.html",
        })
        .state('records.show.id', {
            url: '/:id',
            views: {
                'data@records.show': {
                    templateUrl: "js/views/records/data.html",
                    controller: 'RecordsController',
                    controllerAs: 'records',
                },
                'relationships@records.show': {
                    templateUrl: "js/views/records/relationships.html",
                    controller: 'RecordsController',
                    controllerAs: 'records',
                }
            }
        })
        .state('records.show.id.content', {
            url: '/content',
            templateUrl: "js/views/records/data/content.html",
            controller: 'RecordsController',
            controllerAs: 'records',
        })
        .state('records.show.id.content.core', {
            url: '/core',
            views: {
                'core@records.show.id.content': {
                    templateUrl: "js/views/records/data/core.html",
                    controller: 'RecordsController',
                    controllerAs: 'records',
                }
            }
        })
        .state('records.show.id.content.additional', {
            url: '/additional',
            views: {
                'core@records.show.id.content': {
                    templateUrl: "js/views/records/data/additional.html",
                    controller: 'RecordsController',
                    controllerAs: 'records',
                }
            }
        })
        .state('records.show.id.content.metadata', {
            url: '/metadata',
            views: {
                'core@records.show.id.content': {
                    templateUrl: "js/views/records/data/metadata.html",
                    controller: 'RecordsController',
                    controllerAs: 'records',
                }
            }
        })
        .state('records.show.id.images', {
            url: '/images',
            templateUrl: "js/views/records/data/images.html",
            controller: 'UploaderController',
            controllerAs: 'uploader',
        })
        .state('records.show.id.documents', {
            url: '/documents',
            templateUrl: "js/views/records/data/documents.html",
            controller: 'RecordsController',
            controllerAs: 'records',
        })
        .state('exhibitions', {
            url: '/exhibitions',
            parent: 'index',
            views: {
                'sidebar': {
                    templateUrl: "js/views/sidebar/exhibitions.html",
                    controller: 'SidebarController',
                    controllerAs: 'sidebar',
                },
                'header': {
                    templateUrl: "js/views/common/header.html",
                    controller: 'ExhibitionsController',
                    controllerAs: 'exhibitions',
                },
                'content': { templateUrl: "js/views/common/body.html" }
            }
        })
        .state('exhibitions.new', {
            controller: 'ExhibitionsController',
            controllerAs: 'exhibitions',
            url: '/new',
            templateUrl: "js/views/exhibitions/new.html",
        })
        .state('exhibitions.show', {
            controller: 'ExhibitionsController',
            controllerAs: 'exhibitions',
            url: '/show',
            abstract: true,
            templateUrl: "js/views/exhibitions/show.html",
        })
        .state('exhibitions.show.id', {
            url: '/:id',
            views: {
                'data@exhibitions.show': {
                    templateUrl: "js/views/exhibitions/data.html",
                    controller: 'ExhibitionsController',
                    controllerAs: 'exhibitions',
                }
            }
        })
        .state('exhibitions.show.id.content', {
            url: '/content',
            templateUrl: "js/views/exhibitions/data/content.html",
            controller: 'ExhibitionsController',
            controllerAs: 'exhibitions',
        })
        .state('exhibitions.show.id.content.core', {
            url: '/core',
            views: {
                'core@exhibitions.show.id.content': {
                    templateUrl: "js/views/exhibitions/data/core.html",
                    controller: 'ExhibitionsController',
                    controllerAs: 'exhibitions',
                }
            }
        })
        .state('exhibitions.show.id.content.additional', {
            url: '/additional',
            views: {
                'core@exhibitions.show.id.content': {
                    templateUrl: "js/views/exhibitions/data/additional.html",
                    controller: 'ExhibitionsController',
                    controllerAs: 'exhibitions',
                }
            }
        })
        .state('exhibitions.show.id.content.metadata', {
            url: '/metadata',
            views: {
                'core@exhibitions.show.id.content': {
                    templateUrl: "js/views/exhibitions/data/metadata.html",
                    controller: 'ExhibitionsController',
                    controllerAs: 'exhibitions',
                }
            }
        })
        .state('exhibitions.show.id.images', {
            url: '/images',
            templateUrl: "js/views/exhibitions/data/images.html",
            controller: 'ExhibitionsController',
            controllerAs: 'exhibitions',
        })
        .state('exhibitions.show.id.documents', {
            url: '/documents',
            templateUrl: "js/views/exhibitions/data/documents.html",
            controller: 'ExhibitionsController',
            controllerAs: 'exhibitions',
        });
    $urlRouterProvider.otherwise("/");
}