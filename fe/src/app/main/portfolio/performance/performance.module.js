(function () {
    'use strict';

    angular
        .module('app.portfolio.performance', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider
            .state('app.portfolio-performance', {
                url    : '/portfolio/{id:[0-9]{1,}}/performance',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolio/performance/performance.html',
                        controller : 'PerformanceController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolio/performance');
    }
})();