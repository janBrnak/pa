(function () {
    'use strict';

    angular
        .module('app.portfolio')
        .controller('ManagePositionController', ManagePositionController);

    /** @ngInject */
    function ManagePositionController($mdDialog, $document) {
        var vm = this;

        // Data
        vm.title = "Add Positions";

        if ( vm.data ) {
            // title
            if ( vm.data.action && vm.data.action === "edit" ) 
                vm.title = "Edit Position";

            // position
            vm.managePosition = [
                { id: null, symbol: '', shares: null, price: null, date: new Date() }
            ];

            if (vm.data && vm.data.positions && vm.data.positions.length) {
                vm.managePosition = [];
                vm.data.positions.forEach(function(position) {
                    vm.managePosition.push({
                        id: position.id, 
                        symbol: position.symbol, 
                        shares: position.shares, 
                        price: 100, 
                        date: new Date() 
                    });
                });
            }
        }

        // Methods
        vm.managePositionAction = managePositionAction;
        vm.clonePositionEmpty = clonePositionEmpty;
        vm.closeDialog = closeDialog;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;

        //////////

        /**
         * Manage position
         * @param data object
         * @return null
         */
        function managePositionAction(form) {
            $mdDialog.cancel({action: vm.data.action, form: form});
        }

        function clonePositionEmpty (positions) {
            var button = angular.element('.add-position-empty');

            // add into object
            vm.managePosition[positions.length] = { symbol: '', shares: null, price: null, date: new Date() };

            // hide button for add position empty
            if ( positions.length === 10 ) {
                button.css({display: 'none'});
            }

            // show empty position
            // if ( positions.length ) {
            //     positions.first().css({display: 'block'});
            // }
        }

        /**
         * Close the dialog
         * @return null
         */
        function closeDialog() {
            $mdDialog.cancel();
        }

        function querySearch () {
            var positions = [];

            positions.push({id: 1000, symbol: 'SPY', quantity: null});
            positions.push({id: 1001, symbol: 'EWG', quantity: null});
            positions.push({id: 1002, symbol: 'XLV', quantity: null});
            positions.push({id: 1003, symbol: 'DIA', quantity: null});

            return positions;
        }

        function selectedItemChange(item) {

        }
    }
})();