'use strict';


angular.module('capitolwatchApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
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

    $scope.members = [];
    $http.jsonp('http://www.govtrack.us/api/v2/role?current=true&limit=600&format=jsonp', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function (data) {
        $http.post('/api/votess', {
          userid: Auth.getCurrentUser()._id,
          vote:[
            {
              bill_id: "39dj09",
              vote_stance: "rock"
            }
          ]
        }).
          success(function(data, status, headers, config) {
            console.log("post to votess worked");
            console.log(Auth.getCurrentUser()._id);
          }).
          error(function(data, status, headers, config) {
            console.log("sorry post to api votess didnt work");
          });
        for (var i = 0; i < data.objects.length; i++) {
          var member = data.objects[i];
          $scope.members.push(member);
          //console.log($scope.members);
        }
     });


    $scope.bills = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-introduced_date&format=jsonp&limit=5', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function (data) {
        for (var i = 0; i < data.objects.length; i++) {
          var bill = data.objects[i];
          $scope.bills.push(bill);
          console.log($scope.bills);
        }
     });

    

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
