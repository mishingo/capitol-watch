'use strict';

angular.module('capitolwatchApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.items = [];
    $scope.getItems = function() {

        $http({method : 'GET',url : 'https://www.govtrack.us/api/v2/role?current=true', headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.items = data;
                console.log(data);
            })
            .error(function(data, status) {
                alert("Error");
            });
    };
  });
