(function () {
    'use strict';

    angular
        .module('app.portfolio')
        .controller('PortfolioController', PortfolioController);

    /** @ngInject */
    function PortfolioController($stateParams, $mdDialog, $mdMedia, $document, PortfolioData) {
        var vm = this;
        
        // Data
        vm.helloText = 'Portfolio';
        vm.selectedIndex = 1;
        vm.data = PortfolioData.data.data;
        vm.positions = vm.data.rootNode.positions

        // Methods
        vm.managePosition = managePosition;
        vm.removePosition = removePosition;
        
        //////////

        /**
         * Add/Edit position
         *
         * @param action string add|edit|clone
         * @param id integer
         * @param i integer
         * @returns boolean
         */
        function managePosition(action, id, i) {
            var data = {};

            // data action
            if ( !action )
                data.action = 'add';
            else
                data.action = action;

            // data positions
            // if ( vm.positions instanceof Array && vm.positions.length && vm.positions[i] && vm.positions[i].id === id ) {
            //     data.id = vm.positions[i].id,
            // }

            // open dialog
            $mdDialog.show({
                controller: 'ManagePositionController',
                controllerAs: 'vm',
                templateUrl: 'app/main/portfolio/dialogs/manage-position/manage-position.html',
                parent: angular.element($document.body),
                clickOutsideToClose: false,
                bindToController: true,
                locals: { data: data }
            });
        }

        /**
         * Remove position
         *
         * @param id integer
         * @returns boolean
         */
        function removePosition(id) {
            console.log(id);
        }
    }
})();
