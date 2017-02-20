(function () {
    'use strict';

    angular
        .module('app.portfolio-create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.portfolio-create', {
                url    : '/portfolio-create',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolio-create/portfolio-create.html',
                        controller : 'PortfolioCreateController as vm'
                    }
                },
                resolve: {}
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolio-create');

        // Navigation
        msNavigationServiceProvider.saveItem('portfolio-create', {
            title      : 'Create Portfolio',
            icon       : 'icon-plus',
            state      : 'app.portfolio-create',
            translation: 'PORTFOLIO_CREATE.PORTFOLIO_CREATE_NAV',
            weight     : 2
        });
    }
})();