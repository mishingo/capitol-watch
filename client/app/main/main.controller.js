'use strict';


angular.module('capitolwatchApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {


    /*$scope.awesomeThings = []; */


    $scope.bills = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-introduced_date&format=jsonp&limit=5', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function (data) {
        $http.get('/api/user_votes/ui/' + Auth.getCurrentUser()._id).success(function(user_votedata) {
          console.log('/api/user_votes/ui/' + Auth.getCurrentUser()._id);
          console.log(user_votedata);
          for (var i = 0; i < data.objects.length; i++) {
            var bill_id = data.objects[i].id;
            console.log(bill_id);
          }
        }).
          error(function(data, status, headers, config) {
            console.log("sorry post to api user_votes didnt work");
          });

        $http.post('/api/user_votes', {
          userid: Auth.getCurrentUser()._id,
          billid: '234',
          stance: 'yea'
        }).
          success(function(data, status, headers, config) {
            console.log("post to user_votes worked");
            console.log(Auth.getCurrentUser()._id);
          }).
          error(function(data, status, headers, config) {
            console.log("sorry post to api user_votes didnt work");
          });

       for (var i = 0; i < data.objects.length; i++) {
          var bill = data.objects[i];
          $scope.bills.push(bill);
          console.log($scope.bills);
        }
      });
     
    

  /******************************************************************/  
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

    var latt = 42.96;
    var longg = -108.09;

    //Sunlight congress call
    var slc = 'https://congress.api.sunlightfoundation.com';
    var slckey = '4e6a01514540472cb4440d9541dc0b15';

    $scope.members = [];
    $http.jsonp('https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + latt + '&longitude=' + longg + '&apikey=4e6a01514540472cb4440d9541dc0b15&format=jsonp', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
    .success(function (data) {
      for (var i = 0; i < data.results.length; i++) {
          var member = data.results[i];
          $scope.members.push(member);
          //console.log($scope.members);
      }
    });

/******************************************************************/

 


    
/******************************************************************/
    /*$scope.glocation = [];
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latt = position.coords.latitude;
            var longg = position.coords.longitude;
            $scope.$apply(function() {
                $scope.glocation.push(latt, longg);
            });
        });
      }*/

  });
