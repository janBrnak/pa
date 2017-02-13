(function () {
    'use strict';

    angular
        .module('app.portfolios')
        .controller('PortfoliosController', PortfoliosController);

    /** @ngInject */
    function PortfoliosController($mdDialog, $mdMedia, $document, PortfoliosData, paApiPrtfolios) {
        var vm = this;

        // Data
        vm.paging = PortfoliosData.paging;
        vm.portfolios = PortfoliosData.portfolios;
        vm.chartBar = {
            chart: {
                type: 'discreteBarChart',
                height: 50,
                width: 0,
                margin : { top: 0, right: 0, bottom: 0, left: 0 },
                x: function(d){ return d.key; },
                y: function(d){ return d.value; },
                showValues: false,
                showXAxis: true,
                showYAxis: false,
                duration: 500,
                tooltip: {
                    contentGenerator: function (d) {
                        if (d === null)
                            return '';

                        var table = d3.select(document.createElement("table"));
                        var tbodyEnter = table.selectAll("tbody")
                            .data([d])
                            .enter().append("tbody");

                        var trowEnter = tbodyEnter.selectAll("tr")
                                .data(d.series)
                                .enter()
                                .append("tr")
                                .classed("highlight", false);

                        trowEnter.append("td")
                            .classed("legend-color-guide",true)
                            .append("div")
                            .style("background-color", d.color);

                        trowEnter.append("td")
                            .classed("key",true)
                            .html(d.data.key + ": ");

                        trowEnter.append("td")
                            .classed("value",true)
                            .html(d.data.value + "%  " + d.data.tooltip);

                        return table.node().outerHTML;
                    },
                },
            }
        };

        // Methods
        vm.managePortfolioDialog = managePortfolioDialog;
        vm.removePortfolio = removePortfolio;
        
        //////////

        /**
         * Add/Edit/Clone portfolio dialog
         *
         * @param action string add|edit|clone
         * @param id integer
         * @param i integer
         * @returns boolean
         */
        function managePortfolioDialog(action, id, i) {
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
            }).then(function() { //

            },  function(data) { // save
                if (data) {
                    paApiPrtfolios.manage(data.action, data.form).then(function(data) {
                        vm.portfolios = data.portfolios;
                    });
                }
            });
        }

        /**
         * Remove portfolio
         *
         * @param id integer
         * @returns boolean
         */
        function removePortfolio(id) {
            paApiPrtfolios.remove(id).then(function(data) {
                vm.portfolios = data.portfolios;
            });
        }
    }
})();
