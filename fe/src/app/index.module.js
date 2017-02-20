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

            // PA - Core custom created
            'app.pa-core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            // 'app.sample',

            // Auth
            'app.auth',

            // Dashboard
            'app.dashboard',

            // Portfolios
            'app.portfolios',
            'app.portfolio-create',
            'app.portfolio',
        ]);
})();