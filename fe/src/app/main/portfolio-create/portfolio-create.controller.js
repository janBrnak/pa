(function () {
    'use strict';

    angular
        .module('app.portfolio-create')
        .controller('PortfolioCreateController', PortfolioCreateController);

    /** @ngInject */
    function PortfolioCreateController($mdDialog, $mdMedia, $document, $element, $scope) {
        var vm = this;
        
        // Data
        
        // Methods
        vm.createManualPortfolio = createManualPortfolio;
        vm.createModelPortfolio = createModelPortfolio;

        //////////

        /**
         * Create Manual Portfolio
         *
         * @returns void
         */
        function createManualPortfolio(action, id, i) {
            var data = {};

            // data action
            if ( !action )
                data.action = 'add';
            else
                data.action = action;

            // data portfolio
            if ( vm.portfolios instanceof Array && vm.portfolios.length && vm.portfolios[i] && vm.portfolios[i].id === id ) {
                data.id = vm.portfolios[i].id,
                data.name = vm.portfolios[i].name,
                data.defaultCountry = vm.portfolios[i].defaultCountry;
                data.strategy = vm.portfolios[i].strategy;
                data.useItAt = vm.portfolios[i].useItAt;
            }

            // open dialog
            $mdDialog.show({
                controller: 'ManagePortfolioController',
                controllerAs: 'vm',
                templateUrl: 'app/main/portfolios/dialogs/manage-portfolio/manage-portfolio.html',
                parent: angular.element($document.body),
                clickOutsideToClose: false,
                bindToController: true,
                locals: { data: data }
            });
        }

        /**
         * Create Model Portfolio
         *
         * @returns void
         */
        function createModelPortfolio(action, id, i) {
            var data = {};

            // data action
            if ( !action )
                data.action = 'add';
            else
                data.action = action;

            // data portfolio
            if ( vm.portfolios instanceof Array && vm.portfolios.length && vm.portfolios[i] && vm.portfolios[i].id === id ) {
                data.id = vm.portfolios[i].id,
                data.name = vm.portfolios[i].name,
                data.defaultCountry = vm.portfolios[i].defaultCountry;
                data.strategy = vm.portfolios[i].strategy;
                data.useItAt = vm.portfolios[i].useItAt;
            }

            // open dialog
            $mdDialog.show({
                controller: 'ManagePortfolioController',
                controllerAs: 'vm',
                templateUrl: 'app/main/portfolios/dialogs/manage-portfolio/manage-portfolio.html',
                parent: angular.element($document.body),
                clickOutsideToClose: false,
                bindToController: true,
                locals: { data: data }
            });
        }
    }
})();
