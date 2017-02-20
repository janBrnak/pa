(function () {
    'use strict';

    angular
        .module('app.portfolio.risk', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider
            .state('app.portfolio-risk', {
                url    : '/portfolio/{id:[0-9]{1,}}/risk',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolio/risk/risk.html',
                        controller : 'RiskController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolio/risk');
    }
})();