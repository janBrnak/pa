(function () {
    'use strict';

    angular
        .module('app.dashboard', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.dashboard', {
                url    : '/dashboard',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/dashboard/dashboard.html',
                        controller : 'DashboardController as vm'
                    }
                },
                resolve: {
                    DashboardData: function (apiResolver) {
                        return apiResolver.resolve('dashboard@get');
                    },
                    DashboardPortfoliosWidget: function () {
                        return {
                            0: {},
                            1: {}
                        };
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/dashboard');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'DASHBOARD',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.dashboard', {
            title      : 'Dashboard',
            icon       : 'icon-tile-four',
            state      : 'app.dashboard',
            translation: 'DASHBOARD.DASHBOARD_NAV',
            weight     : 1
        });
    }
})();