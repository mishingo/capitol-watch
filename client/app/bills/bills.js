'use strict';

angular.module('capitolwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bills', {
        templateUrl: 'app/bills/bills.html',
        controller: 'BillsCtrl'
      });
  });
