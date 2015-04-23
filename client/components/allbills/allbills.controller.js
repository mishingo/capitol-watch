'use strict';

angular.module('capitolwatchApp')
.controller('allbillsCtrl', function ($scope, $http, $location, Auth, $routeParams) {
    $scope.allbills = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-introduced_date&format=jsonp&limit=5', {
        params: {
            callback: 'JSON_CALLBACK'
        }
    })
    .success(function (data) {
        for (var i = 0; i < data.objects.length; i++) {
            var bill = data.objects[i];
            $scope.allbills.push(bill);
            console.log($scope.allbills);
        }
    })
    .error(function(data, status, headers, config) {
        console.log("sorry post to api user_votes didnt work");
    });


    $scope.search = function(){
        if($scope.keywords == ''){
            $scope.allbills.length = 0;
            $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-introduced_date&format=jsonp&limit=5', {
                params: {
                    callback: 'JSON_CALLBACK'
                }
            })
            .success(function (data) {
                $scope.searching = false;
                for (var i = 0; i < data.objects.length; i++) {
                    var bill = data.objects[i];
                    $scope.allbills.push(bill);
                    console.log($scope.allbills);
                }
            })
            .error(function(data, status, headers, config) {
                console.log("sorry post to api user_votes didnt work");
            });
        } else {
            $http.jsonp('https://www.govtrack.us/api/v2/bill?q=' + $scope.keywords + '&format=jsonp&order_by=-introduced_date&limit=20',{
                params: {
                    callback: 'JSON_CALLBACK'
                }
            })
            .success(function(data, status, headers, config){
                $scope.searching = true;
                $scope.allbills.length = 0;
                for (var i = 0; i < data.objects.length; i++) {
                    var bill = data.objects[i];
                    $scope.allbills.push(bill);
                    console.log($scope.keywords);
                }
            })
            .error(function(data, status, headers, config){
              console.log("search didnt happen");
            });
        }
    }
    
});