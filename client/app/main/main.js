'use strict';

angular.module('capitolwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });