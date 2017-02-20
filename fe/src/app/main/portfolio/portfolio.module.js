(function () {
    'use strict';

    angular
        .module('app.portfolio', [
            'app.portfolio.overview',
            'app.portfolio.performance',
            'app.portfolio.risk',
            'app.portfolio.position',
        ])
        .config(config);

    /** @ngInject */
    function config() {

    }
})();