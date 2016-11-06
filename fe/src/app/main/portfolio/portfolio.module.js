(function () {
    'use strict';

    angular
        .module('app.portfolio', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.portfolio', {
                url    : '/portfolio/{id:[0-9]{1,}}',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolio/portfolio.html',
                        controller : 'PortfolioController as vm'
                    }
                },
                resolve: {
                    PortfolioData: function($resource, $http, $stateParams) {
                        return $http({
                            method: 'GET',
                            url: 'http://localhost:3333/portfolios/' + ($stateParams.id || 0),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        });
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolio');

        // Navigation
        // msNavigationServiceProvider.saveItem('fuse', {
        //     title : 'PORTFOLIOS',
        //     group : true,
        //     weight: 1
        // });

        // msNavigationServiceProvider.saveItem('fuse.portfolio', {
        //     title      : 'Portfolio',
        //     icon       : 'icon-view-list',
        //     state      : 'app.portfolio',
        //     translation: 'PORTFOLIO.PORTFOLIO_NAV',
        //     weight     : 1
        // });
    }
})();