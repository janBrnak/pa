(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(DashboardData, DashboardPortfoliosWidget, paSettingsOfCharts) {
        var vm = this;
        
        // Data
        vm.helloText = DashboardData.data.helloText;
        vm.chartPie = paSettingsOfCharts.pieChartPositions();

        vm.portfolios = [
            {
                id: 1,
                name: 'Portfolio 1',
                date: '2016-01-01',
                data: [
                    { key: 'ABC', value: 5, tooltip: '3,157.29' },
                    { key: 'T', value: 2, tooltip: '3,157.29' },
                    { key: 'NTRS', value: 9, tooltip: '3,157.29' },
                    { key: 'CFN', value: 7, tooltip: '3,157.29' },
                    { key: 'VMC', value: 4, tooltip: '3,157.29' },
                    { key: 'SYMC', value: 3, tooltip: '3,157.29' },
                    { key: 'FSRV', value: 5, tooltip: '3,157.29' }
                ]
            }, {
                id: 2,
                name: 'Portfolio 2',
                date: '2016-01-02',
                data: [
                    { key: 'ABC', value: 5, tooltip: '3,157.29' },
                    { key: 'T', value: 2, tooltip: '3,157.29' },
                    { key: 'NTRS', value: 9, tooltip: '3,157.29' }
                ]
            }, {
                id: 3,
                name: 'Portfolio 1',
                date: '2016-01-01',
                data: [
                    { key: 'ABC', value: 5, tooltip: '3,157.29' },
                    { key: 'T', value: 2, tooltip: '3,157.29' },
                    { key: 'NTRS', value: 9, tooltip: '3,157.29' },
                    { key: 'CFN', value: 7, tooltip: '3,157.29' },
                    { key: 'VMC', value: 4, tooltip: '3,157.29' },
                ]
            }, {
                id: 4,
                name: 'Portfolio 2',
                date: '2016-01-02',
                data: [
                    { key: 'ABC', value: 5, tooltip: '3,157.29' },
                    { key: 'T', value: 2, tooltip: '3,157.29' },
                    { key: 'NTRS', value: 9, tooltip: '3,157.29' },
                    { key: 'CFN', value: 7, tooltip: '3,157.29' },
                    { key: 'VMC', value: 4, tooltip: '3,157.29' },
                    { key: 'SYMC', value: 3, tooltip: '3,157.29' },
                    { key: 'FSRV', value: 5, tooltip: '3,157.29' }
                ]
            },
        ];
        // Methods

        //////////
    }
})();
