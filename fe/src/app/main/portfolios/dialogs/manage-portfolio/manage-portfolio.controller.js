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
            if ( vm.data.action && vm.data.action === "update" ) 
                vm.title = "Edit Portfolio";
            else if (vm.data.action && vm.data.action === "clone")
                vm.title = "Clone Portfolio";

            // portfolio
            vm.managePortfolio = {
                id:             (parseInt(vm.data.id) ? parseInt(vm.data.id) : null),
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
        function managePortfolioAction(form) {
            $mdDialog.cancel({action: vm.data.action, form: form});
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