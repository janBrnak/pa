(function () {
    'use strict';

    angular
        .module('app.pa-core')
        .component('paSubmenu', {
            controller: paSubmenuController,
            templateUrl: 'app/pa-core/directives/pa-submenu/pa-submenu.html',
            bindings: {
                active: '@',
                items: '=',
            },
        });

    /** @ngInject */
    function paSubmenuController() {
        // var ctrl = this;
    }
})();