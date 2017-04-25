(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('paAPI', {
            base: 'http://80.241.212.28:3333',
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
                create: '/positions',
                update: '/positions/:id',
                remove: '/positions/:id'
            },
            timeseries: {
                list: '/timeseries',
                search: '',
            }
        });
}());