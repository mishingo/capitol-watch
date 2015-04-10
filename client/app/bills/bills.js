'use strict';

angular.module('capitolwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bills', {
        templateUrl: 'app/bills/bills.html',
        controller: 'BillsCtrl'
      })
      .when('/bills/:id', {
      	templateUrl: 'app/bills/bill.html',
        controller: 'BillCtrl'
      });
  });
