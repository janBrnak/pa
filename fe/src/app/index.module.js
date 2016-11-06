(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // PA - Core
            'app.pa-core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            // 'app.sample',

            // Dashboard
            'app.dashboard',

            // Portfolios
            'app.portfolios',
            'app.portfolio',
        ]);
})();