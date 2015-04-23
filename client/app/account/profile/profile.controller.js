'use strict';

angular.module('capitolwatchApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

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


  $scope.uservotes = [];
    $http.get('/api/user_votes/ui/' + Auth.getCurrentUser()._id, {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
    .success(function(data, status, headers, config) {
      for (var i = 0; i < data.length; i++) {
          var uservote = data[i];
          $scope.uservotes.push(uservote);
          console.log($scope.uservotes);
      }
    })
});
