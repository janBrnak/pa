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
            searchById: searchById
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
    }
}());