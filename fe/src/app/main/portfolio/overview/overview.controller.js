(function () {
    'use strict';

    angular
        .module('app.portfolio.overview')
        .controller('OverviewController', OverviewController);

    /** @ngInject */
    function OverviewController($stateParams, $mdDialog, $mdMedia, $document, paSettingsOfCharts, PortfolioData, paApiPositions, paApiPrtfolios) {
        var vm = this;
        
        // Data
        vm.selectedIndex = 1;
        vm.portfolioName = PortfolioData.name;
        vm.positions = [];
        vm.lineChartPortfolio = paSettingsOfCharts.lineChartPortfolio();
        vm.lineChartPortfolioData = [];

        vm.submenu = [
            {'key': 'overview', 'title': 'Overview', 'href': '/portfolio/1/overview'},
            {'key': 'performance', 'title': 'Performance', 'href': '/portfolio/1/performance'},
            {'key': 'risk', 'title': 'Risk', 'href': '/portfolio/1/risk'},
        ];

        vm.positions = {
            head: {
                symbol: {name: 'Symbol', layout: {flex: 10, class: 'text-left'}, sub: false},
                name: {name: 'Name', layout: {flex: false, class: 'text-left'}, sub: false},
                return: {name: 'Return', layout: {flex: 15, class: 'text-center'}, sub: {
                    return_qtd: {name: 'QTD', layout: {flex: 33, class: 'text-right'}},
                    return_ytd: {name: 'YTD', layout: {flex: 33, class: 'text-right'}},
                    return_oney: {name: '1Y', layout: {flex: 33, class: 'text-right'}},
                }},
            },
            bodyLayout: {
                symbol: {flex: 10, class: 'text-left'}, 
                name: {flex: false, class: 'text-left'}, 
                return_qtd: {flex: 5, class: 'text-right'}, 
                return_ytd: {flex: 5, class: 'text-right'},
                return_oney: {flex: 5, class: 'text-right'},
            },
            body: [],
            footer: {}
        };

        // positions body
        if (PortfolioData && PortfolioData.rootNode && PortfolioData.rootNode.positions) {
            PortfolioData.rootNode.positions.forEach(function (position) {
                vm.positions.body.push({
                    id: position.id, 
                    symbol: position.value, 
                    name: position.name, 
                    shares: parseInt(position.quantity),
                    return_qtd: parseInt(position.quantity), 
                    return_ytd: 44.44, 
                    return_oney: 43.44, 
                    transactions: null
                });
            })
        }

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

            data.positions = vm.positions.body;

            // open dialog
            $mdDialog.show({
                controller: 'ManagePositionController',
                controllerAs: 'vm',
                templateUrl: 'app/main/portfolio/dialogs/manage-position/manage-position.html',
                parent: angular.element($document.body),
                clickOutsideToClose: false,
                bindToController: true,
                locals: { data: data }
            }).then(function() { //

            },  function(data) { // save
                if (data) {
                    paApiPositions.manage(data.action, data.form).then(function(positions) {
                        var positionsId = [];

                        if (positions.length) {
                            vm.positions.body = [];
                        }

                        positions.forEach(function(position) {
                            positionsId.push('DbPos~' + position.id);
                            vm.positions.body.push({
                                id: position.id, 
                                symbol: position.symbol, 
                                name: position.name, 
                                shares: parseInt(position.shares),
                                return_qtd: parseInt(position.shares), 
                                return_ytd: 44.44, 
                                return_oney: 43.44, 
                                transactions: null
                            });
                        });

                        paApiPrtfolios.manage('update', {id: $stateParams.id, name: vm.portfolioName, positions: positionsId.toString()});
                    });
                }
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
