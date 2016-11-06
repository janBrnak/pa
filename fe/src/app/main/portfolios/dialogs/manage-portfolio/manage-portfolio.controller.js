(function () {
    'use strict';

    angular
        .module('app.portfolios')
        .controller('ManagePortfolioController', ManagePortfolioController);

    /** @ngInject */
    function ManagePortfolioController($mdDialog) {
        var vm = this;

        // Data
        vm.title = "Create Portfolio";

        if ( vm.data ) {
            // title
            if ( vm.data.action && vm.data.action === "edit" ) 
                vm.title = "Edit Portfolio";
            else if (vm.data.action && vm.data.action === "clone")
                vm.title = "Clone Portfolio";

            // portfolio
            vm.managePortfolio = {
                id:             (typeof vm.data.id === "number" && vm.data.id > 0 ? vm.data.id : null),
                name:           (typeof vm.data.name === "string" && vm.data.name.length > 0 ? vm.data.name : null),
                defaultCountry: (typeof vm.data.defaultCountry === "string" && vm.data.defaultCountry.length > 0 ? vm.data.defaultCountry : null),
                strategy:       (typeof vm.data.strategy === "string" && vm.data.strategy.length > 0 ? vm.data.strategy : null),
                useItAt:        (typeof vm.data.useItAt === "string" && vm.data.useItAt.length > 0 ? vm.data.useItAt : null), 
            }
        }

        // Methods
        vm.managePortfolioAction = managePortfolioAction;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Manage portfolio
         * @param data object
         * @return null
         */
        function managePortfolioAction( data ) {
            var action = vm.data.action;

            if ( action ) {
                switch (action) {
                    case 'add':
                        console.log('add portfolio');
                        break;
                    case 'edit':
                        console.log('edit portfolio');
                        break;
                    case 'clone':
                        console.log('clone portfolio');
                        break;
                }
            }

            console.log(data);
            $mdDialog.cancel();
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