'use strict';

angular.module('capitolwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/Home/Home.html',
        controller: 'HomeCtrl'
      });
  });