'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$rootScope',
  function ($scope, $state, Authentication, Menus, $rootScope) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
    $scope.searchItem = {};

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Get the account menu
    $scope.accountMenu = Menus.getMenu('account').items[0];

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.broadcastSearch = function(){
      $rootScope.$broadcast('searchFb', {item: $scope.searchItem});
    };

    $scope.clearSearch = function() {
        $scope.searchItem = {};
      $rootScope.$broadcast('clearResult');
    }
  }
]);
