(function() {
	'use strict';

	angular
		.module('app.pa-core')
		.provider('paLocalStorage', paLocalStorageProvider);

	/** @ngInject **/
	function paLocalStorageProvider() {
		/* ----------------- */
        /* Provider          */
        /* ----------------- */

		// Data
		var provider = this;

		// Methods
		provider.init = init;
		provider.clear = clear;

		/**
         * Initialization local storage
         *
         * @param key
         * @param resource
         */

        function init() {
        	return true;
        }

        /**
         * Clear local storage
         *
         * @return boolean
         */

        function clear() {
        	return true;
        }

		/* ----------------- */
        /* Service           */
        /* ----------------- */
		provider.$get = function () {

		}
	}

})();