    (function () {
    'use strict';

    angular
        .module('app.portfolio.position', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider
            .state('app.portfolio-position', {
                url    : '/portfolio/{id:[0-9]{1,}}/position/{positionId:[0-9]{1,}}',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/portfolio/position/position.html',
                        controller : 'PositionController as vm'
                    }
                },
                resolve: { }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/portfolio/position');
    }
})();