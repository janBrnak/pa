(function () {
    'use strict';

    angular
        .module('app.portfolios')
        .controller('ManagePortfolioController', ManagePortfolioController);

    /** @ngInject */
    function ManagePortfolioController($mdDialog, $location) {
        var vm = this;

        // Data
        vm.title = "Create Portfolio";
        vm.type = 'manual';     // manual || model

        if ( vm.data ) {
            // title
            if ( vm.data.action && vm.data.action === "update" ) {
                vm.title = "Edit Portfolio";
            }
            else if (vm.data.action && vm.data.action === "clone") {
                vm.title = "Clone Portfolio";
            }
            else if (vm.data.action && vm.data.action === "add-model") {
                vm.title = "Create Model Portfolio";
                vm.type = 'model'
            }

            // portfolio
            vm.managePortfolio = {
                id:             (parseInt(vm.data.id) ? parseInt(vm.data.id) : null),
                name:           (typeof vm.data.name === "string" && vm.data.name.length > 0 ? vm.data.name : null),
                defaultCountry: (typeof vm.data.defaultCountry === "string" && vm.data.defaultCountry.length > 0 ? vm.data.defaultCountry : null),
                strategy:       (typeof vm.data.strategy === "string" && vm.data.strategy.length > 0 ? vm.data.strategy : null),
                useItAt:        (typeof vm.data.useItAt === "string" && vm.data.useItAt.length > 0 ? vm.data.useItAt : null), 
                horizont:       6,
                riskTolerance:  50,
                budget:         10000,
            }

            if ( vm.data.action && (vm.data.action === "update" || vm.data.action === "clone") ) {
                vm.managePortfolio.defaultCountry = 'US';
                vm.managePortfolio.strategy = 'balanced';
                vm.managePortfolio.useItAt = 'play-portfolio';
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