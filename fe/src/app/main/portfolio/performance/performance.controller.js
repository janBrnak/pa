(function () {
    'use strict';

    angular
        .module('app.portfolio.performance')
        .controller('PerformanceController', PerformanceController);

    /** @ngInject */
    function PerformanceController($stateParams) {
        var vm = this;
        
        // Data
        vm.submenu = [
            {'key': 'overview', 'title': 'Overview', 'href': '/portfolio/' + $stateParams.id + '/overview'},
            {'key': 'performance', 'title': 'Performance', 'href': '/portfolio/' + $stateParams.id + '/performance'},
            {'key': 'risk', 'title': 'Risk', 'href': '/portfolio/' + $stateParams.id + '/risk'},
        ];

        // Methods

        //////////
    }
})();
