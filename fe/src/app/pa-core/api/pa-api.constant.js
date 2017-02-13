(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('paAPI', {
            base: 'http://localhost:3333',
            portfolios: {
                list: '/portfolios',
                search: '',
                searchById: '/portfolios/:id',
                create: '/portfolios',
                update: '/portfolios/:id',
                remove: '/portfolios/:id'
            },
            positions: {
                list: '/positions',
                search: '',
            },
            timeseries: {
                list: '/timeseries',
                search: '',
            }
        });
}());