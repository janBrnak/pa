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
            vm.managePosition = {
                0: { symbol: '', shares: null, price: null, date: new Date() }
            }
        }

        // Methods
        vm.managePositionAction = managePositionAction;
        vm.clonePositionEmpty = clonePositionEmpty;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Manage position
         * @param data object
         * @return null
         */
        function managePositionAction( data ) {
            var action = vm.data.action;

            if ( action ) {
                switch (action) {
                    case 'add':
                        console.log('add position');
                        break;
                    case 'edit':
                        console.log('edit position');
                        break;
                }
            }

            console.log(data);
            $mdDialog.cancel();
        }

        function clonePositionEmpty () {
            var items = angular.element('.manage-position-item:hidden');
            var button = angular.element('.add-position-empty');

            // add into object
            vm.managePosition[10 - items.length] = { symbol: '', shares: null, price: null, date: new Date() };

            // hide button for add position empty
            if ( items.length - 1 === 0 )
                button.css({display: 'none'});

            // show empty position
            if ( items.length )
                items.first().css({display: 'block'});
        }

        /**
         * Close the dialog
         * @return null
         */
        function closeDialog() {
            $mdDialog.cancel();
        }
    }
})();