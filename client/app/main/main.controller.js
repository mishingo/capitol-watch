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
/*
    $scope.members = [];
    $http.jsonp('http://www.govtrack.us/api/v2/role?current=true&limit=600&format=jsonp', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function (data) {
        for (var i = 0; i < data.objects.length; i++) {
          var member = data.objects[i];
          $scope.members.push(member);
        }
     });
*/
    $scope.glocation = [];
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latt = position.coords.latitude;
            var longg = position.coords.longitude;
            $scope.$apply(function() {
                $scope.glocation.push(latt, longg);
            });
        });
      }

  });
