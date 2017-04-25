(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('paApiPrtfolios', paApiPrtfolios);

    /** @ngInject */
    function paApiPrtfolios ($q, paApi) {
        var state = {
                list: {
                    timestamp: '',
                    data: null
                }
            };

        var service = {
            list: list,
            search: search,
            searchById: searchById,
            manage: manage,
            remove: remove
        };

        return service;

        //////////

        function list (options) {
            return paApi.search('portfolios', 'list', options);
        }

        function search (options) {
            return paApi.search('portfolios', 'search', options);
        }

        function searchById (id) {
            return paApi.search('portfolios', 'searchById', {id: id});
        }

        function manage (action, portfolio) {
            var defer = $q.defer();
            var data = {
                name: portfolio.name,
                rootName: '',
                positions: portfolio.positions || ''
            };

            if (action === 'update' && portfolio.id) { // update
                paApi.update(portfolio.id, 'portfolios', data).then(function(response) {
                    paApi.search('portfolios', 'list').then(function (data) {
                        defer.resolve(data);
                    });
                });
            } else {  // add, clone
                paApi.create('portfolios', data).then(function(response) {
                    paApi.search('portfolios', 'list').then(function (data) {
                        defer.resolve(data);
                    });
                });
            }

            return defer.promise;
        }

        function remove (id) {
            var defer = $q.defer();

            paApi.remove(id, 'portfolios').then(function(response) {
                paApi.search('portfolios', 'list').then(function (data) {
                    defer.resolve(data);
                });
            });

            return defer.promise;
        }
    }
}());