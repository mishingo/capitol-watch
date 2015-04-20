'use strict';

angular.module('capitolwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bills', {
        templateUrl: 'app/bills/bills.html',
        controller: 'billsCtrl'
      })
      .when('/bills/:id', {
      	templateUrl: 'app/bills/bill.html',
        controller: 'billCtrl'
      });
  });
