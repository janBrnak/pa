    (function () {
    'use strict';

    angular
        .module('app.core')
        .factory('paApiPositions', paApiPositions);

    /** @ngInject */
    function paApiPositions ($q, paApi) {
        var state = {};

        var service = {
            list: list,
            search: search,
            searchById: searchById,
            manage: manage
        };

        return service;

        //////////

        function list (options) {
            return paApi.search('positions', 'list', options);
        }

        function search (options) {
            return paApi.search('positions', 'search', options);
        }

        function searchById (id) {
            return paApi.search('positions', 'searchById', {id: id});
        }

        function manage (action, positions) {
            var defer = $q.defer();
            var promises = [];

            if (positions && positions.length) {
                promises = positions.map(function(position) {
                    if (position.id) { // update
                        return paApi.update(position.id, 'positions', {
                            scheme: 'Ticker',
                            value: position.symbol,
                            quantity: position.shares,
                            trades: position.price
                        });
                    } else {
                        return paApi.create('positions', {
                            scheme: 'Ticker',
                            value: position.symbol,
                            quantity: position.shares,
                            trades: position.price
                        });
                    }
                });
            }

            if (promises.length) {
                $q.all(promises).then(function(positions) {
                    defer.resolve(positions.map(function(position) {
                        return {
                            id: position.id,
                            name: position.name,
                            symbol: position.value,
                            shares: position.quantity,
                            price: position.trades
                        };
                    }));
                })
            } else {
                defer.reject([]);
            }

            return defer.promise;
        }
    }
}());