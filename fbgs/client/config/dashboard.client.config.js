/**
 * Created by Adhitya on 18-05-2017.
 */
(function () {
    'use strict';

    // Setting up route
    angular
        .module('fbgs.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        // Users state routing
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/fbgs/client/views/dashboard.client.view.html',
                controller: 'DashboardController',
                controllerAs: 'dc',
                data: {
                    roles: ['user', 'admin']
                }
            });
    }
}());
