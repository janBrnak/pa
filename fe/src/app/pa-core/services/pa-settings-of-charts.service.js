(function () {

	'use strict';

	angular
		.module('app.pa-core')
		.factory('paSettingsOfCharts', paSettingsOfCharts);

	/** @ngInject */
	function paSettingsOfCharts() {
		var service = {
            pieChartPositions: pieChartPositions,
            lineChartPositions: lineChartPositions,
            lineChartPortfolio: lineChartPortfolio,
        };

        return service;

        //////////

        /**
         * Setting pie chart
         *
         * @param options {object}
         * @returns {object}
         */
        function pieChartPositions ( options ) {
        	var chart = {
                type: 'pieChart',
                height: 200,
                x: function (d) { return d.key; },
                y: function (d) { return d.value; },
                showLabels: true,
                labelSunbeamLayout: false,
                labelThreshold: 0.01,
                labelsOutside: true,
                donut: false,
                transitionDuration: 500,
                showLegend: false,
                growOnHover: false,
                margin: {top: 0, right: 0, bottom: 0, left: 0},
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

            // set options
            if ( options instanceof Object && !(options instanceof Array) ) {
            	var key;

            	for ( key in options ) {
            		// if exist and data type is the same update old value
            		if ( options[key] && chart[key] && typeof options[key] === typeof chart[key] )
						chart[key] = options[key];
            	}
            }

            return {chart: chart};
        }

        /**
         * Setting line chart with positions
         *
         * @param options {object}
         * @returns {object}
         */
        function lineChartPositions ( options ) {
            var chart = {};

            return {chart: chart};
        }

        /**
         * Setting line chart which comper portfolio with indexes like S&P 500, Dow Jones, Nasdaq... 
         *
         * @param options {object}
         * @returns {object}
         */
        function lineChartPortfolio ( options ) {
            var chart = {
                    "type": "lineWithFocusChart",
                    "height": 450,
                    "margin": {
                        "top": 20,
                        "right": 20,
                        "bottom": 60,
                        "left": 40
                    },
                    "duration": 500,
                    "useInteractiveGuideline": true,
                    "xAxis": {},
                    "x2Axis": {},
                    "yAxis": {},
                    "y2Axis": {}
                };

            return {chart: chart};
        }
	}

}());