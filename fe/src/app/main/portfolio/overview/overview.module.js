(function () {
    'use strict';

    angular
        .module('app.portfolio.overview', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider
            .state('app.portfolio-overview', {
                url    : '/portfolio/{id:[0-9]{1,}}/overview',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolio/overview/overview.html',
                        controller : 'OverviewController as vm'
                    }
                },
                resolve: {
                    PortfolioData: function($stateParams, paApiPrtfolios) {
                        return paApiPrtfolios.searchById($stateParams.id || 0);
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolio/overview');
    }
})();