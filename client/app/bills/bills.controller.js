'use strict';

angular.module('capitolwatchApp')
  .controller('BillsCtrl', function ($scope) {
    $scope.message = 'Hello';
  })


  .controller('BillCtrl', function ($scope, $http, $routeParams) {
    $scope.message = 'Hello Bitch';
    $scope.id = $routeParams.id;
    var billid = $routeParams.id;
    console.log($scope.id);

    
    $http.jsonp('https://www.govtrack.us/api/v2/bill/' + billid, {
      params: {
        callback: 'JSON_CALLBACK'
      }
    });

  });

  	