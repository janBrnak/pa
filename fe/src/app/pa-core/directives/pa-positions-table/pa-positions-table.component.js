(function () {
    'use strict';

    angular
        .module('app.pa-core')
        .component('paPositionsTable', {
            controller: paPositionsTableController,
            templateUrl: 'app/pa-core/directives/pa-positions-table/pa-positions-table.html',
            bindings: {
                data: '=',
                orderBy: '@',
            },
        });

    /** @ngInject */
    function paPositionsTableController($element) {
        var $ctrl = this;

        // Data
        $ctrl.keys = getKeys($ctrl.data.head);
        $ctrl.data.head = processHeadData($ctrl.orderBy, $ctrl.data.head, false);
        $ctrl.data.body = processBodyData($ctrl.orderBy, $ctrl.data.body);

        // Methods
        $ctrl.orderByKey = orderByKey;

        //////////

        /**
         * Get keys from objects
         *
         * @param data [Object]
         * @return [Object]
         */
        function getKeys(data) {
            var result = [];

            if (!(data instanceof Array) && data instanceof Object) {
                var key = null;
                var subKey = null;

                for (key in data) {
                    if (!data[key].sub) {
                        result.push(key);
                    }
                    else if (data[key].sub) {
                        for (subKey in data[key].sub) {
                            result.push(subKey);
                        }
                    }
                }
            }

            return result;
        }

        /**
         * Process head data
         *
         * @param orderBy [String]
         * @param data [Object]
         * @param reset [Boolean]
         * @return [Object]
         */
        function processHeadData(orderBy, data, reset) {

            if (!(data instanceof Array) && data instanceof Object) {
                var key = null;
                var subKey = null;
                var replace = '';

                for (key in data) {
                    if (!data[key].sub) {
                        data[key].order = true;

                        if (reset && orderBy !== key) {
                            replace = data[key].layout.class.replace(/ ascdesc| asc| desc/, '');
                            replace += ' ascdesc';
                            data[key].layout.class = replace;
                        }
                        else if (!reset)
                            data[key].layout.class += (orderBy === key ? ' asc' : ' ascdesc');
                    }
                    else if (data[key].sub) {
                        for (subKey in data[key].sub) {
                            data[key].order = false;
                            data[key].sub[subKey].order = true;

                            if (reset && orderBy !== subKey) {
                                replace = data[key].sub[subKey].layout.class.replace(/ ascdesc| asc| desc/, '');
                                replace += ' ascdesc';
                                data[key].sub[subKey].layout.class = replace;
                            }
                            else if (!reset)
                                data[key].sub[subKey].layout.class += (orderBy === subKey ? ' asc' : ' ascdesc');
                        }
                    }
                }
            }

            return data;
        }

        /**
         * Process body data
         *
         * @param orderBy [String]
         * @param data [Object]
         * @param sort [String|undefine] asc|desc|undefined
         * @return [Object]
         */
        function processBodyData(orderBy, data, sort) {
            var asc = {};
            var desc = {};
            var i = 0;
            
            asc = _.sortBy(data, orderBy);

            if (sort === "desc") {
                desc = asc.reverse();
                return desc;
            }
            else {
                return asc;
            }
        }

        /**
         * Order by key
         *
         * @param key [String]
         * @return [Object]
         */
        function orderByKey (key) {
            var object = {};
            var head = {};

            if (key.split(/_/).length < 2 && (head = this.data.head[key]) && head.order) {
                object = orderByKeyParseClass(head.layout.class);
                head.layout.class = object.class;
            }
            else {
                var split = key.split(/_/);

                if ((head = this.data.head[split[0]].sub[key]) && head.order) {
                    object = orderByKeyParseClass(head.layout.class);
                    head.layout.class = object.class;
                }
                    
            }

            this.data.head = processHeadData(key, this.data.head, true);
            this.data.body = processBodyData(key, this.data.body, object.sort);
        }

        /**
         * Order by key parse class
         *
         * @param c [Object]
         * @return [Object]
         */
        function orderByKeyParseClass (c) {
            var result = {class: '', sort: ''};

            result.class = c.replace(/ ascdesc| asc| desc/, function (match, offset, string) {
                if (match === ' asc') {
                    result.sort = 'desc';
                    return ' desc';
                }
                else if (match === ' desc' || match === ' ascdesc') {
                    result.sort = 'asc';
                    return ' asc' 
                }
            });

            return result;
        }
    }
})();