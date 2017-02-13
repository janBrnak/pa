(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('paApi', paApi);

    /** @ngInject */
    function paApi ($http, $q, paAPI) {
        var service = {
            search: search,
            create: create,
            update: update,
            remove: remove
        };

        return service;

        //////////

        function search (type, action, options) {
            var path = _getPath(type, action, options);
            return _http('GET', path);
        }

        function create (type, body) {
            var path = _getPath(type, 'create', null);
            return _http('POST', path, body);
        }

        function update (id, type, body) {
            var path = _getPath(type, 'update', {id: id});
            return _http('PUT', path, body);
        }

        function remove (id, type) {
            var path = _getPath(type, 'remove', {id: id});
            return _http('DELETE', path);
        }

        function _getBase () {
            return paAPI.base;
        }

        function _getPath (type, action, options) {
            var path = null;

            if (paAPI[type] && paAPI[type][action]) {
                path = paAPI[type][action];

                if (options) {
                    _.each(options, function (value, key) { path = path.replace(':' + key, value); })
                }
            }

            return path;
        }

        function _http (method, path, body) {
            var defer = $q.defer();

            $http({
                method: method,
                url: _getBase() + path,
                data: body || {},
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(data) {
                defer.resolve(data.data.data);
            }, function() {

            });

            return defer.promise;
        }
    }
}());