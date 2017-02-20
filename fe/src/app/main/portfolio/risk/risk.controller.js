(function () {
    'use strict';

    angular
        .module('app.portfolio.risk')
        .controller('RiskController', RiskController);

    /** @ngInject */
    function RiskController() {
        var vm = this;
        
        // Data
        vm.submenu = [
            {'key': 'overview', 'title': 'Overview', 'href': '/portfolio/1/overview'},
            {'key': 'performance', 'title': 'Performance', 'href': '/portfolio/1/performance'},
            {'key': 'risk', 'title': 'Risk', 'href': '/portfolio/1/risk'},
        ];

        // Methods

        //////////
    }
})();
