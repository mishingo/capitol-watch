'use strict';

angular.module('capitolwatchApp')
  .controller('BillsCtrl', function ($scope) {
    $scope.message = 'Hello';
  })


  .controller('BillCtrl', function ($scope, $http, $routeParams) {
    $scope.message = 'Hello Bitch';
    $scope.id = $routeParams.id;
    var billid = $routeParams.id;
    //console.log($scope.id);

    
    $scope.abill = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill/' + billid + "?&format=jsonp", {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function(data){
        $scope.abill.push(data);
        console.log(data);
        console.log($scope.abill[0]);
      })
      .error(function(data, status, headers, config){
        console.log("sorry data wasn't retrieved from govtrack bills");
      });

  });

  	