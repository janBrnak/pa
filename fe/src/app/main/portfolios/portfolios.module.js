(function () {
    'use strict';

    angular
        .module('app.portfolios', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.portfolios', {
                url    : '/portfolios',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolios/portfolios.html',
                        controller : 'PortfoliosController as vm'
                    }
                },
                resolve: {
                    PortfoliosData: function(paApiPrtfolios) {
                        return paApiPrtfolios.list();
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolios');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'PORTFOLIOS',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.portfolios', {
            title      : 'Portfolios',
            icon       : 'icon-view-list',
            state      : 'app.portfolios',
            translation: 'PORTFOLIOS.PORTFOLIOS_NAV',
            weight     : 1
        });
    }
})();